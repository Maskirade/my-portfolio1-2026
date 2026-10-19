"""Prepare certificate previews using local Pillow operations, without AI.

Use --input with --box for simple cases, or --recipe with --entry/--all for
shaped masks and verified name restoration. Coordinates follow EXIF rotation.
Requires: python -m pip install Pillow
"""

import argparse
import json
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PRIVATE = ROOT / ".private"
PREVIEWS = ROOT / "public" / "images" / "certificates"


def read_image(path):
    with Image.open(path) as opened:
        return ImageOps.exif_transpose(opened).convert("RGB")


def private_source(path):
    resolved = Path(path).resolve()
    if not resolved.is_relative_to(PRIVATE) or not resolved.is_file():
        raise ValueError("Keep originals and clean references inside .private/.")
    return resolved


def check_box(box, size):
    if len(box) != 4 or not all(isinstance(value, int) for value in box):
        raise ValueError("A box needs four integer coordinates.")
    left, top, right, bottom = box
    if not (0 <= left < right <= size[0] and 0 <= top < bottom <= size[1]):
        raise ValueError(f"Box {box} is outside the {size} image.")
    return tuple(box)


def fitted_text(text, font_name, size):
    """Rasterize verified wording, fitting its ink to the original line's bounds."""
    font = ImageFont.truetype(font_name, max(40, size[1] * 4))
    bounds = font.getbbox(text)
    mask = Image.new("L", (bounds[2] - bounds[0], bounds[3] - bounds[1]))
    ImageDraw.Draw(mask).text((-bounds[0], -bounds[1]), text, font=font, fill=255)
    return mask.resize(size, Image.Resampling.LANCZOS)


def process(job, args):
    source = private_source(job["input"])
    original = read_image(source)
    boxes = [check_box(box, original.size) for box in job.get("boxes", [])]
    polygons = job.get("polygons", [])
    protected = [check_box(box, original.size) for box in job.get("protect_boxes", [])]
    text_regions = job.get("restore_text", [])
    patches = job.get("restore_patches", [])
    output = Path(job["output"]).resolve() if job.get("output") else None
    guide = Path(args.guide).resolve() if args.guide else None

    if output and not (boxes or polygons):
        raise ValueError("An output preview requires at least one --box or recipe polygon.")
    for polygon in polygons:
        if len(polygon) < 3 or any(
            len(point) != 2 or not all(isinstance(value, int) for value in point)
            or not (0 <= point[0] < original.width and 0 <= point[1] < original.height)
            for point in polygon
        ):
            raise ValueError("Polygons need at least three points inside the image.")

    # Validate all restoration instructions before writing anything.
    text_masks = []
    for item in text_regions:
        box = check_box(item["box"], original.size)
        check_box(item["background_box"], original.size)
        ink = check_box(item["ink_box"], original.size)
        if not (box[0] <= ink[0] < ink[2] <= box[2] and box[1] <= ink[1] < ink[3] <= box[3]):
            raise ValueError("Restored lettering must fit inside its restoration box.")
        text_masks.append(fitted_text(item["text"], item["font"], (ink[2] - ink[0], ink[3] - ink[1])))
    references = []
    for item in patches:
        check_box(item["box"], original.size)
        reference = read_image(private_source(item["reference"]))
        if reference.size != original.size:
            raise ValueError("A clean-text reference must match the original image dimensions.")
        references.append(reference)

    for destination, folder, suffix in [(guide, PRIVATE, ".png"), (output, PREVIEWS, ".webp")]:
        if destination is None:
            continue
        if not destination.is_relative_to(folder) or destination.suffix.lower() != suffix:
            raise ValueError(f"Save {suffix} files inside {folder}.")
        if destination == source or any(
            destination == Path(item["reference"]).resolve() for item in patches
        ):
            raise ValueError("Never overwrite an original or clean reference.")
        if destination.exists() and not args.overwrite:
            raise ValueError(f"{destination.name} already exists; choose a new filename or use --overwrite.")

    masks = []
    for box in boxes:
        mask = Image.new("L", original.size)
        mask.paste(255, box)
        masks.append(mask)
    for polygon in polygons:
        mask = Image.new("L", original.size)
        ImageDraw.Draw(mask).polygon([tuple(point) for point in polygon], fill=255)
        masks.append(mask)
    # Protect actual original pixels only where handwriting does not cross text.
    for mask in masks:
        for box in protected:
            mask.paste(0, box)

    if guide:
        guide.parent.mkdir(parents=True, exist_ok=True)
        annotated = original.copy()
        draw = ImageDraw.Draw(annotated)
        for x in range(0, original.width, 100):
            draw.line((x, 0, x, original.height), fill="#e24c4c")
        for y in range(0, original.height, 100):
            draw.line((0, y, original.width, y), fill="#e24c4c")
            for x in range(0, original.width, 100):
                draw.rectangle((x + 2, y + 2, x + 86, y + 16), fill="white")
                draw.text((x + 4, y + 3), f"{x}, {y}", fill="black")
        for polygon in polygons:
            draw.polygon([tuple(point) for point in polygon], outline="#ffbf00", width=2)
        for box in boxes:
            draw.rectangle(box, outline="#ffbf00", width=2)
        for box in protected:
            draw.rectangle(box, outline="#00a060", width=2)
        for item in text_regions + patches:
            draw.rectangle(item["box"], outline="#0080ff", width=2)
        annotated.save(guide, format="PNG")
        print(f"Private coordinate guide: {guide}")

    if not output:
        return

    processed = original.copy()
    allowed = Image.new("L", original.size)
    for mask in masks:
        bounds = mask.getbbox()
        if bounds is None:
            continue
        signature = original.crop(bounds)
        blurred = signature.resize((4, 2), Image.Resampling.BOX)
        blurred = blurred.resize(signature.size, Image.Resampling.BILINEAR)
        blurred = blurred.filter(ImageFilter.GaussianBlur(max(8, signature.height / 5)))
        processed.paste(blurred, bounds, mask.crop(bounds))
        allowed = ImageChops.lighter(allowed, mask)

    for item, mask in zip(text_regions, text_masks):
        box = tuple(item["box"])
        background = original.crop(tuple(item["background_box"]))
        background = background.resize((box[2] - box[0], box[3] - box[1]), Image.Resampling.BILINEAR)
        processed.paste(background, box)
        ink = item["ink_box"]
        processed.paste(item.get("color", "black"), (ink[0], ink[1], ink[2], ink[3]), mask)
        allowed.paste(255, box)

    # Separate PDF text layers can preserve exact lettering via private references.
    for item, reference in zip(patches, references):
        box = tuple(item["box"])
        processed.paste(reference.crop(box), box)
        allowed.paste(255, box)

    # No change is permitted outside reviewed masks and restoration areas.
    difference = ImageChops.difference(original, processed)
    difference.paste((0, 0, 0), (0, 0, original.width, original.height), allowed)
    if difference.getbbox() is not None:
        raise RuntimeError("Pixels outside the approved regions changed.")

    processed.thumbnail((args.max_size, args.max_size), Image.Resampling.LANCZOS)
    clean = Image.new("RGB", processed.size)
    clean.paste(processed)  # Do not carry EXIF thumbnails or source metadata.
    output.parent.mkdir(parents=True, exist_ok=True)
    clean.save(output, format="WEBP", quality=95, method=6)
    print(f"Public blurred preview: {output.name} ({clean.width} x {clean.height})")
    return clean


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, help="Original image inside .private/")
    parser.add_argument("--output", type=Path, help="Public .webp preview destination")
    parser.add_argument("--guide", type=Path, help="Optional private PNG with coordinates and mask outlines")
    parser.add_argument("--box", action="append", nargs=4, type=int, metavar=("LEFT", "TOP", "RIGHT", "BOTTOM"))
    parser.add_argument("--recipe", type=Path, help="JSON containing reviewed per-certificate instructions")
    selection = parser.add_mutually_exclusive_group()
    selection.add_argument("--entry", help="Certificate ID in the recipe")
    selection.add_argument("--all", action="store_true", help="Process all recipe entries")
    parser.add_argument("--max-size", type=int, default=1263)
    parser.add_argument("--overwrite", action="store_true", help="Replace an existing preview or guide")
    args = parser.parse_args()
    if args.max_size < 1:
        parser.error("--max-size must be positive.")

    try:
        if args.recipe:
            entries = json.loads(args.recipe.read_text(encoding="utf-8"))["certificates"]
            if args.input or args.box:
                raise ValueError("Use recipe instructions or --input/--box, not both.")
            if args.all:
                if args.guide or args.output:
                    raise ValueError("Use --entry when overriding an output or guide.")
                jobs = list(entries.values())
            elif args.entry:
                jobs = [dict(entries[args.entry])]
                if args.output:
                    jobs[0]["output"] = str(args.output)
            else:
                raise ValueError("Choose --entry or --all with --recipe.")
        else:
            if args.entry or args.all or not args.input or not (args.output or args.guide):
                raise ValueError("Choose --input and --output/--guide, or use --recipe.")
            jobs = [{"input": str(args.input), "output": str(args.output) if args.output else None, "boxes": args.box or []}]
        for job in jobs:
            process(job, args)
    except (ValueError, KeyError, TypeError, OSError) as error:
        parser.error(str(error))


if __name__ == "__main__":
    main()

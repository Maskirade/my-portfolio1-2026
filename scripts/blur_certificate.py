"""Create flattened certificate previews with selected signature areas blurred.

Requires Pillow: python -m pip install Pillow
Coordinates are measured AFTER applying the image's EXIF orientation.
"""

import argparse
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PRIVATE = ROOT / ".private"
PREVIEWS = ROOT / "public" / "images" / "certificates"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path, help="Original image inside .private/")
    parser.add_argument("--output", type=Path, help="Public .webp preview destination")
    parser.add_argument("--guide", type=Path, help="Optional private PNG showing a coordinate grid")
    parser.add_argument(
        "--box", action="append", nargs=4, type=int,
        metavar=("LEFT", "TOP", "RIGHT", "BOTTOM"),
        help="Signature rectangle in pixels; repeat for each signature",
    )
    parser.add_argument("--max-size", type=int, default=1263, help="Maximum output edge in pixels")
    parser.add_argument("--overwrite", action="store_true", help="Replace an existing preview or guide")
    args = parser.parse_args()

    source = args.input.resolve()
    if not source.is_relative_to(PRIVATE) or not source.is_file():
        parser.error("Keep the original image inside .private/ before running this script.")
    if args.max_size < 1:
        parser.error("--max-size must be positive.")
    if not args.guide and not args.output:
        parser.error("Choose --guide, --output, or both.")
    if args.output and not args.box:
        parser.error("An output preview requires at least one --box.")

    # Phones often store sideways pixels with an EXIF rotation instruction.
    # Normalize this first so the coordinates match what an image viewer shows.
    with Image.open(source) as opened:
        original = ImageOps.exif_transpose(opened).convert("RGB")

    boxes = [tuple(box) for box in args.box or []]
    for left, top, right, bottom in boxes:
        if not (0 <= left < right <= original.width and 0 <= top < bottom <= original.height):
            parser.error(f"Box {(left, top, right, bottom)} is outside the {original.size} image.")

    destinations = []
    for path, folder, suffix in [(args.guide, PRIVATE, ".png"), (args.output, PREVIEWS, ".webp")]:
        if path is None:
            continue
        resolved = path.resolve()
        if not resolved.is_relative_to(folder) or resolved.suffix.lower() != suffix:
            parser.error(f"Save {suffix} files inside {folder}.")
        if resolved == source:
            parser.error("Never overwrite an original certificate.")
        if resolved.exists() and not args.overwrite:
            parser.error(f"{resolved.name} already exists; choose a new filename or use --overwrite.")
        destinations.append(resolved)
    for path in destinations:
        path.parent.mkdir(parents=True, exist_ok=True)

    if args.guide:
        guide = original.copy()
        draw = ImageDraw.Draw(guide)
        for x in range(0, guide.width, 100):
            draw.line((x, 0, x, guide.height), fill="#e24c4c")
        for y in range(0, guide.height, 100):
            draw.line((0, y, guide.width, y), fill="#e24c4c")
            for x in range(0, guide.width, 100):
                draw.rectangle((x + 2, y + 2, x + 86, y + 16), fill="white")
                draw.text((x + 4, y + 3), f"{x}, {y}", fill="black")
        guide.save(args.guide.resolve(), format="PNG")
        print(f"Private coordinate guide: {args.guide}")

    if args.output:
        processed = original.copy()
        for box in boxes:
            signature = original.crop(box)
            # Remove fine pen strokes first, then smooth the remaining coarse colors.
            blurred = signature.resize((4, 2), Image.Resampling.BOX)
            blurred = blurred.resize(signature.size, Image.Resampling.BILINEAR)
            blurred = blurred.filter(ImageFilter.GaussianBlur(max(8, signature.height / 5)))
            # Paste changed pixels into a copy, rather than applying a CSS overlay.
            processed.paste(blurred, box)

        # Verify that all changes are confined to the chosen rectangles before resizing.
        difference = ImageChops.difference(original, processed)
        for box in boxes:
            difference.paste((0, 0, 0), box)
        if difference.getbbox() is not None:
            raise RuntimeError("Pixels outside the signature rectangles changed.")

        processed.thumbnail((args.max_size, args.max_size), Image.Resampling.LANCZOS)
        # Start with fresh pixels so EXIF, thumbnails, and other source metadata stay private.
        clean = Image.new("RGB", processed.size)
        clean.paste(processed)
        clean.save(args.output.resolve(), format="WEBP", quality=90, method=6)
        print(f"Public blurred preview: {args.output} ({clean.width} x {clean.height})")


if __name__ == "__main__":
    main()

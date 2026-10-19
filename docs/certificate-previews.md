# Prepare certificate previews without hiding printed names

This workflow runs locally with Python and Pillow. It does not send certificates
to an AI service. Original files stay in `.private/certificates/`; the website
uses separate flattened WebP previews.

## Why the first rectangular blurs hid names

A rectangle can contain both handwriting and printed letters. Blurring every
pixel in that rectangle hides both. Simply copying the original name area back
can expose the signature again when the two overlap.

The revised workflow uses three tools:

- **Shaped masks:** polygons cover the handwriting, with a small safety margin.
- **Protected boxes:** keep original printed text only where no handwriting crosses it.
- **Verified restoration:** where ink crosses a name, recover clean text from a
  separate PDF layer when available, or recreate the exact verified wording
  in a matching font. Never guess a name or invent letters.

The public files are processed previews. Original certificates are not modified.

## Run the saved Laravel recipe

Install Pillow once if needed:

```powershell
python -m pip install Pillow
```

Run commands from the project folder. The reviewed instructions are stored in
`scripts/certificate-recipes.json`, and the website uses the `v2` previews.

For practice, generate a separate `v3` without replacing the current preview:

```powershell
python scripts/blur_certificate.py `
  --recipe scripts/certificate-recipes.json `
  --entry laravel-workshop `
  --output public/images/certificates/laravel-workshop-v3.webp
```

To regenerate all five configured previews after reviewing every recipe:

```powershell
python scripts/blur_certificate.py --recipe scripts/certificate-recipes.json --all --overwrite
```

The script normally refuses to overwrite outputs. Use a new versioned filename
while experimenting. `--overwrite` deliberately replaces processed files,
never an original.

## Read and edit a recipe

Each certificate entry specifies its private input, public output, and these
optional operations:

| Field | Purpose |
| --- | --- |
| `polygons` | Ordered `[x, y]` points tracing a blur area. |
| `boxes` | Simple `[left, top, right, bottom]` blur rectangles. |
| `protect_boxes` | Preserve original pixels in text areas that contain no signature ink. |
| `restore_text` | Recreate verified text where handwriting crosses a scanned name. |
| `restore_patches` | Copy exact lettering and background from a private clean-layer reference. |

The top-left corner is `(0, 0)`. X increases rightward and Y increases downward.
The script applies EXIF rotation first, so coordinates match the displayed
orientation. Coordinates refer to the full-size original, before export resizing.

For each `restore_text` item:

- `text` is the exact wording checked against the original.
- `font` is an installed font filename or path. The current Windows recipes
  use `ariblk.ttf` and `timesbd.ttf`; other computers may need equivalent fonts.
- `box` is the affected name band whose old overlapping ink must be cleared.
- `background_box` samples a clean nearby part of the same background.
  Check that it contains no letters or handwriting, or those marks will be copied.
- `ink_box` positions the recreated lettering inside `box`.
- `color` matches the original printed text.

Only recreate text after verifying it. Keep titles and surrounding content
unchanged unless they also overlap handwriting. For PDFs with separate layers,
prefer `restore_patches` so the exact original lettering can be preserved.

## Use a private coordinate guide

This command shows the Laravel masks and also regenerates its configured preview:

```powershell
python scripts/blur_certificate.py `
  --recipe scripts/certificate-recipes.json `
  --entry laravel-workshop `
  --guide .private/certificate-guides/laravel-name-preservation.png `
  --overwrite
```

Guide colors are red for the coordinate grid, yellow for blur shapes, green for
protected text, and blue for restoration areas. Open the guide in Paint or an
image viewer; Paint's cursor coordinates help refine the points.

For a new original with no recipe yet, generate only a coordinate grid:

```powershell
python scripts/blur_certificate.py --input ".private/certificates/new-certificate.jpg" --guide ".private/certificate-guides/new-grid.png"
```

Inspect all handwriting, including tails and digital-signature marks. A small
unblurred stroke can remain outside a mask. Do not extend a blur across a printed
name without adding a verified restoration instruction.

## How the conference certificate keeps its exact text

Its PDF has separate signature images and printed text. A clean reference was
rendered in memory with just the three signature images omitted. The source PDF
was not saved or changed. The resulting private reference is:

`.private/certificate-renders/conference-without-signature-images.png`

The recipe copies only the affected name/title bands from that reference after
blurring the handwriting above them. Back up this reference with your private
originals; it is not committed or uploaded.

If you need to regenerate that reference, install PyMuPDF locally:

```powershell
python -m pip install PyMuPDF
```

For this exact PDF only, its verified signature-image IDs are 47, 48, and 49:

```powershell
@'
import pymupdf

document = pymupdf.open(".private/certificates/John-Raymart-Montinola-Tenio.pdf")
page = document[0]
for image_id in [47, 48, 49]:
    page.delete_image(image_id)
page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5), alpha=False).save(
    ".private/certificate-renders/conference-without-signature-images.png"
)
'@ | python -
```

Image IDs are specific to that PDF: do not reuse them for another certificate.
Other PDF entries use private page renders in `.private/certificate-renders/`.

## Verify before publishing

1. Open the new WebP and zoom in. Confirm every name, title, accent, and
   qualification remains readable and matches the original.
2. Check every signature for uncovered strokes, including where it crossed text.
3. Confirm the title, recipient, dates, and certificate body are unchanged.
4. Update `image`, `width`, and `height` in `src/data/certifications.js`.
   The script prints the actual dimensions; it never stretches the document.
5. Run the checks below, then inspect the certificate in the portfolio.

```powershell
python -m unittest discover -s tests -p "test_blur_certificate.py"
npm.cmd run build
```

The script checks that changes are confined to approved masks and restoration
areas before resizing and export, then saves fresh pixels without EXIF thumbnails.
The tests cover preserved name pixels, exact clean-layer patches, recreated text,
orientation, metadata removal, private guides, and overwrite protection.

Keep originals and guides outside `public/`. CSS blur alone leaves the unblurred
file accessible. Removing a previously committed original from the latest site
does not erase old Git commits or past deployments.

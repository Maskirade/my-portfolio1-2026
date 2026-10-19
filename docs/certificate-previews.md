# Prepare a certificate preview yourself

This process runs locally with Python and Pillow. It does not use an AI service.
Run the commands from the project folder in PowerShell.

## 1. Keep the original private

Put the original JPG or PNG in `.private/certificates/`. That folder is excluded
from Git and Vercel, and the Vite development server blocks access to it.
Only a processed preview should go in `public/images/certificates/`.

Install the image-processing library once:

```powershell
python -m pip install Pillow
```

## 2. Find the signature coordinates

Generate a private grid to help locate the signatures:

```powershell
python scripts/blur_certificate.py --input ".private/certificates/Laravel-certificate.jpg" --guide ".private/certificate-guides/laravel-grid.png" --overwrite
```

Open the guide in an image viewer or Paint. Each grid cell is 100 pixels wide
and high. In Paint, the cursor's pixel coordinates help refine the rectangle.
The top-left corner of the image is `(0, 0)`: X increases to the right and Y
increases downward. Use the guide's orientation when measuring; the script
applies the original image's EXIF rotation before processing.

Each `--box` takes **left, top, right, bottom**, measured in pixels. These are
two opposite corners, not a width and height. Include every pen stroke and
a small margin. If handwriting overlaps a printed name, that overlapping
area must also be blurred to cover the signature completely.

The Laravel certificate uses these two boxes:

| Signature | Left | Top | Right | Bottom |
| --- | ---: | ---: | ---: | ---: |
| Left | 366 | 730 | 438 | 820 |
| Right | 812 | 744 | 878 | 822 |

## 3. Export a separate blurred image

The portfolio already uses `laravel-workshop-v1.webp`. This example creates
a separate `v2` so you can practice without replacing the existing preview.

```powershell
python scripts/blur_certificate.py `
  --input ".private/certificates/Laravel-certificate.jpg" `
  --output "public/images/certificates/laravel-workshop-v2.webp" `
  --box 366 730 438 820 `
  --box 812 744 878 822
```

The script refuses to overwrite an existing preview. When adjusting a result,
use a new name such as `laravel-workshop-v2.webp`, or deliberately add
`--overwrite` to replace the processed preview. The original is never overwritten.

For every rectangle, the script crops that area, reduces it to a 4-by-2-pixel
color grid to remove fine pen strokes, enlarges it again, and smooths it with
Gaussian blur. It pastes the blurred area back into a copy of the certificate.
It checks that pixels outside the rectangles are unchanged before resizing.
Finally, it exports a flattened WebP with no original EXIF metadata.

The default maximum edge is 1263 pixels, without stretching or cropping the
certificate. The command prints the actual output width and height.

## 4. Check it and update the website

Open the exported WebP and zoom in on **every** signature. If any stroke is
visible, expand its box and regenerate the preview. Check that the title,
recipient, and workshop details remain readable.

In `src/data/certifications.js`, set the certificate's image path to the new
WebP and use the dimensions printed by the script. For the `v2` example above:

```javascript
image: '/images/certificates/laravel-workshop-v2.webp',
width: 1263,
height: 976,
```

Run `npm.cmd run build`, then check the certificate in the portfolio. Commit
the processed WebP and data change, keeping the original outside `public/`.
CSS blur alone does not protect a signature: the browser would still receive
the unblurred file. Removing a previously committed original from the latest
website does not erase old Git commits or previous deployments.

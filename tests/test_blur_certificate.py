"""Privacy and name-preservation checks using synthetic images, not real signatures."""

import contextlib
import hashlib
import importlib.util
import io
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("blur_certificate", ROOT / "scripts/blur_certificate.py")
blur = importlib.util.module_from_spec(spec)
spec.loader.exec_module(blur)


class CertificatePrivacyTests(unittest.TestCase):
    def setUp(self):
        blur.PRIVATE.mkdir(parents=True, exist_ok=True)
        blur.PREVIEWS.mkdir(parents=True, exist_ok=True)
        self.private = tempfile.TemporaryDirectory(prefix="blur-test-", dir=blur.PRIVATE)
        self.public = tempfile.TemporaryDirectory(prefix="blur-test-", dir=blur.PREVIEWS)
        # Verify both cleanup targets are inside their intended workspace folders.
        self.assertTrue(Path(self.private.name).resolve().is_relative_to(blur.PRIVATE))
        self.assertTrue(Path(self.public.name).resolve().is_relative_to(blur.PREVIEWS))
        self.source = Path(self.private.name) / "synthetic.png"
        self.output = Path(self.public.name) / "preview.webp"
        image = Image.new("RGB", (64, 48), "white")
        draw = ImageDraw.Draw(image)
        draw.line([(12, 10), (35, 16), (20, 23)], fill="black", width=2)
        draw.text((6, 29), "ALICE", fill="black")
        image.save(self.source)
        self.args = SimpleNamespace(guide=None, max_size=1263, overwrite=False)

    def tearDown(self):
        self.assertTrue(Path(self.public.name).resolve().is_relative_to(blur.PREVIEWS))
        self.assertTrue(Path(self.private.name).resolve().is_relative_to(blur.PRIVATE))
        self.public.cleanup()
        self.private.cleanup()

    def job(self):
        return {"input": str(self.source), "output": str(self.output), "polygons": [[[8, 5], [55, 5], [55, 43], [8, 43]]]}

    def run_job(self, job):
        with contextlib.redirect_stdout(io.StringIO()):
            return blur.process(job, self.args)

    def test_polygon_preserves_protected_name_pixels_and_original(self):
        original = blur.read_image(self.source)
        checksum = hashlib.sha256(self.source.read_bytes()).digest()
        job = self.job()
        job["protect_boxes"] = [[5, 27, 58, 43]]
        processed = self.run_job(job)
        self.assertEqual(processed.crop((5, 27, 58, 43)).tobytes(), original.crop((5, 27, 58, 43)).tobytes())
        self.assertNotEqual(processed.crop((10, 7, 40, 25)).tobytes(), original.crop((10, 7, 40, 25)).tobytes())
        self.assertEqual(processed.crop((0, 0, 7, 48)).tobytes(), original.crop((0, 0, 7, 48)).tobytes())
        self.assertEqual(hashlib.sha256(self.source.read_bytes()).digest(), checksum)

    def test_clean_reference_restores_exact_text_over_crossing_ink(self):
        reference = blur.read_image(self.source)
        path = Path(self.private.name) / "clean.png"
        reference.save(path)
        original = reference.copy()
        ImageDraw.Draw(original).line((14, 20, 30, 41), fill="black", width=3)
        original.save(self.source)
        job = self.job()
        job["restore_patches"] = [{"box": [5, 27, 58, 43], "reference": str(path)}]
        processed = self.run_job(job)
        self.assertEqual(processed.crop((5, 27, 58, 43)).tobytes(), reference.crop((5, 27, 58, 43)).tobytes())

    def test_verified_text_is_drawn_only_in_the_restoration_area(self):
        try:
            ImageFont.truetype("arialbd.ttf", 40)
        except OSError:
            self.skipTest("Arial Bold is required for this Windows font check")
        job = self.job()
        job["restore_text"] = [{"text": "ALICE", "font": "arialbd.ttf", "box": [5, 27, 58, 43], "background_box": [5, 1, 58, 4], "ink_box": [10, 29, 50, 39]}]
        processed = self.run_job(job)
        self.assertLess(min(processed.crop((10, 29, 50, 39)).convert("L").getdata()), 50)
        self.assertEqual(processed.getpixel((4, 28)), (255, 255, 255))

    def test_rejects_text_outside_its_declared_restoration_box(self):
        job = self.job()
        job["restore_text"] = [{"text": "ALICE", "font": "arialbd.ttf", "box": [5, 27, 58, 43], "background_box": [5, 1, 58, 4], "ink_box": [0, 0, 60, 45]}]
        with self.assertRaisesRegex(ValueError, "must fit"):
            self.run_job(job)
        self.assertFalse(self.output.exists())

    def test_never_exports_an_unblurred_guide_to_public(self):
        self.args.guide = str(Path(self.public.name) / "unsafe.png")
        with self.assertRaisesRegex(ValueError, "inside"):
            self.run_job(self.job())
        self.assertFalse(Path(self.args.guide).exists())
        self.assertFalse(self.output.exists())

    def test_refuses_accidental_overwrites(self):
        self.output.write_bytes(b"existing-preview")
        with self.assertRaisesRegex(ValueError, "already exists"):
            self.run_job(self.job())
        self.assertEqual(self.output.read_bytes(), b"existing-preview")

    def test_exif_orientation_is_normalized_and_metadata_is_removed(self):
        source = blur.read_image(self.source)
        exif = Image.Exif()
        exif[274] = 8
        exif[270] = "private source metadata"
        self.source = Path(self.private.name) / "rotated.jpg"
        source.save(self.source, exif=exif)
        job = {"input": str(self.source), "output": str(self.output), "boxes": [[5, 5, 15, 15]]}
        self.run_job(job)
        with Image.open(self.output) as result:
            self.assertEqual(result.size, (48, 64))
            self.assertFalse(result.getexif())
            self.assertFalse(result.info.get("xmp"))

    def test_rejects_public_source_files(self):
        with self.assertRaisesRegex(ValueError, "inside .private"):
            blur.private_source(self.output)


if __name__ == "__main__":
    unittest.main()

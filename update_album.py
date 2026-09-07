"""
update_album.py
----------------
Run this after dropping new photo(s) straight into the "images" folder
(any filename, original size is fine), or to remove photos you no
longer want. It will:

  ADDING (default, always runs):
  1. Find any image files in images/ that aren't in the album yet
  2. Work out roughly what year each one is from (EXIF, then filename)
  3. Resize/compress them to match the rest of the album
  4. Rename them to fit the existing 0xx.jpg numbering
  5. Slot them into script.js in chronological order
     (the very first photo in the album stays pinned in place)
  6. Warn you if a new photo looks like a near-duplicate of one
     already in the album, so you can double check before uploading

  REMOVING (--remove):
  Deletes photos from the album (and from disk) by page number
  (their current position, 1-based) or by filename.

  LISTING (--list):
  Prints every photo's current page number, filename, and year,
  so you know what to pass to --remove.

Requirements:
    pip install Pillow

Run from inside the "album" folder (same folder as index.html):
    python update_album.py                  # just add new photos
    python update_album.py --list           # show page numbers
    python update_album.py --remove 45 087.jpg   # remove by page # or filename
    python update_album.py --remove 12 --remove 87.jpg   # (repeatable too)
"""

import os
import re
import json
import argparse
from PIL import Image, ImageOps
from PIL.ExifTags import TAGS

SCRIPT_JS = "script.js"
IMAGES_DIR = "images"
MAX_DIM = 1400
JPEG_QUALITY = 80
DUPLICATE_HAMMING_THRESHOLD = 10  # lower = stricter match

MONTHS = {'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
          'jul': 7, 'aug': 8, 'sep': 9, 'sept': 9, 'oct': 10, 'nov': 11, 'dec': 12}


# ---------- date guessing (same logic used to build the original album) ----------

def parse_exif_year(date_str):
    if not date_str:
        return None
    try:
        y, m, d = date_str.split(' ')[0].split(':')
        if 1990 <= int(y) <= 2026:
            return int(y)
    except Exception:
        return None
    return None


def looks_like_hash(fname):
    return bool(re.search(r'[0-9a-f]{16,}', fname.lower())) or fname.lower().startswith('image-')


def guess_year_from_filename(fname):
    low = fname.lower()
    m = re.search(r'(19[9]\d|20[0-2]\d)[-_](\d{2})[-_](\d{2})', fname)
    if m:
        return int(m.group(1))
    m = re.search(r'(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\s*(\d{2,4})', low)
    if m:
        yr = m.group(2)
        yr = int(yr) if len(yr) == 4 else 2000 + int(yr)
        if 1995 <= yr <= 2026:
            return yr
    if not looks_like_hash(fname) and not low.startswith('img_') and not low.startswith('dsc'):
        m = re.search(r'(19[9]\d|20[0-2]\d)', fname)
        if m:
            return int(m.group(1))
    return None


def get_year(path, fname):
    year = None
    try:
        img = Image.open(path)
        exif = img._getexif()
        if exif:
            for tag_id, val in exif.items():
                tag = TAGS.get(tag_id, tag_id)
                if tag in ('DateTimeOriginal', 'DateTime', 'DateTimeDigitized'):
                    year = parse_exif_year(val)
                    if year:
                        break
    except Exception:
        pass
    if not year:
        year = guess_year_from_filename(fname)
    return year


# ---------- perceptual hash for duplicate warnings ----------

def dhash(path, hash_size=8):
    try:
        img = Image.open(path).convert('L').resize((hash_size + 1, hash_size), Image.LANCZOS)
    except Exception:
        return None
    pixels = list(img.getdata())
    bits = []
    for row in range(hash_size):
        row_pixels = pixels[row * (hash_size + 1):(row + 1) * (hash_size + 1)]
        for col in range(hash_size):
            bits.append(row_pixels[col] < row_pixels[col + 1])
    val = 0
    for b in bits:
        val = (val << 1) | (1 if b else 0)
    return val


def hamming(a, b):
    return bin(a ^ b).count('1')


# ---------- script.js read/write ----------

def load_photos():
    with open(SCRIPT_JS, 'r', encoding='utf-8') as f:
        content = f.read()
    match = re.search(r'const PHOTOS = (\[.*?\]);', content, re.S)
    if not match:
        raise RuntimeError("Couldn't find the PHOTOS list in script.js")
    photos = json.loads(match.group(1))
    return content, photos


def save_photos(content, photos):
    new_array = json.dumps(photos)
    new_content = re.sub(r'const PHOTOS = \[.*?\];', 'const PHOTOS = ' + new_array + ';', content, flags=re.S)
    with open(SCRIPT_JS, 'w', encoding='utf-8') as f:
        f.write(new_content)


# ---------- main ----------

def resolve_targets(args_remove, photos):
    """Turn --remove values (page numbers or filenames) into a set of filenames."""
    targets = set()
    for val in args_remove:
        if val.isdigit():
            page = int(val)
            if 1 <= page <= len(photos):
                targets.add(photos[page - 1]['file'])
            else:
                print(f"  (skipping --remove {val}: no page {val} — album has {len(photos)} photos)")
        else:
            fname = val if val.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp')) else val + '.jpg'
            if any(p['file'] == fname for p in photos):
                targets.add(fname)
            else:
                print(f"  (skipping --remove {val}: no photo with that filename)")
    return targets


def main():
    parser = argparse.ArgumentParser(description="Add/remove/list photos in the album.")
    parser.add_argument('--list', action='store_true', help="Show page number, filename, year for every photo, then exit.")
    parser.add_argument('--remove', action='append', default=[], metavar='PAGE_OR_FILENAME',
                         help="Remove a photo by its current page number or filename. Repeatable.")
    args = parser.parse_args()

    if not os.path.isfile(SCRIPT_JS):
        print(f"Can't find {SCRIPT_JS} — run this from inside the 'album' folder.")
        return

    content, photos = load_photos()

    if args.list:
        print(f"{len(photos)} photos in the album:\n")
        for i, p in enumerate(photos, start=1):
            tag = "  (pinned first)" if i == 1 else ""
            print(f"  {i:>4}   {p['file']:<12} year: {p['year'] or 'unknown'}{tag}")
        return

    original_pinned_file = photos[0]['file'] if photos else None

    # ---- explicit removals ----
    explicit_targets = resolve_targets(args.remove, photos)
    removed = [p for p in photos if p['file'] in explicit_targets]
    photos = [p for p in photos if p['file'] not in explicit_targets]
    for p in removed:
        path = os.path.join(IMAGES_DIR, p['file'])
        if os.path.isfile(path):
            os.remove(path)
    if removed:
        print(f"Removed {len(removed)} photo(s) by request: {', '.join(p['file'] for p in removed)}")

    # ---- auto-detect photos deleted straight from the images/ folder ----
    files_on_disk = set(os.listdir(IMAGES_DIR))
    auto_missing = [p for p in photos if p['file'] not in files_on_disk]
    if auto_missing:
        photos = [p for p in photos if p['file'] in files_on_disk]
        print(f"Detected {len(auto_missing)} photo(s) deleted from images/: "
              f"{', '.join(p['file'] for p in auto_missing)}")

    tracked_files = {p['file'] for p in photos}
    print(f"Album now has {len(photos)} photos before checking for new ones.")

    # ---- detect new photos ----
    all_files = sorted(os.listdir(IMAGES_DIR))
    new_files = [f for f in all_files
                 if f.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp'))
                 and f not in tracked_files]

    new_entries = []
    warnings = []

    if new_files:
        print(f"Found {len(new_files)} new photo(s): {', '.join(new_files)}")

        existing_numbers = [int(p['file'].split('.')[0]) for p in photos
                             if p['file'].split('.')[0].isdigit()]
        next_num = (max(existing_numbers) + 1) if existing_numbers else 1

        existing_hashes = {}
        for p in photos:
            h = dhash(os.path.join(IMAGES_DIR, p['file']))
            if h is not None:
                existing_hashes[p['file']] = h

        for fname in new_files:
            src_path = os.path.join(IMAGES_DIR, fname)
            year = get_year(src_path, fname)
            new_hash = dhash(src_path)

            if new_hash is not None:
                for existing_file, existing_hash in existing_hashes.items():
                    d = hamming(new_hash, existing_hash)
                    if d <= DUPLICATE_HAMMING_THRESHOLD:
                        warnings.append(f"  '{fname}' looks similar to existing '{existing_file}' (distance {d})")

            img = Image.open(src_path)
            img = ImageOps.exif_transpose(img)
            img = img.convert('RGB')
            w, h = img.size
            if max(w, h) > MAX_DIM:
                scale = MAX_DIM / max(w, h)
                img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)

            out_name = f'{next_num:03d}.jpg'
            out_path = os.path.join(IMAGES_DIR, out_name)
            img.save(out_path, quality=JPEG_QUALITY, optimize=True)
            os.remove(src_path)

            new_entries.append({'file': out_name, 'year': year})
            if new_hash is not None:
                existing_hashes[out_name] = new_hash
            next_num += 1
    else:
        print("No new photos found in images/.")

    if not removed and not auto_missing and not new_entries:
        print("Nothing changed.")
        return

    # ---- merge: keep the original pinned photo first, if it still exists ----
    pinned = None
    rest = photos
    if original_pinned_file and any(p['file'] == original_pinned_file for p in photos):
        pinned = next(p for p in photos if p['file'] == original_pinned_file)
        rest = [p for p in photos if p['file'] != original_pinned_file]

    combined = rest + new_entries
    combined.sort(key=lambda p: (p['year'] is None, p['year'] or 9999))
    final = ([pinned] if pinned else []) + combined

    save_photos(content, final)

    print(f"\nAlbum now has {len(final)} photos total.")
    if new_entries:
        for e in new_entries:
            print(f"  + {e['file']}  (year: {e['year'] or 'unknown'})")

    if warnings:
        print("\nPossible duplicates to double-check:")
        for w in warnings:
            print(w)
        print("(These were still added — remove them with --remove if they're really duplicates.)")

    print("\nDone. Review the site locally, then git add / commit / push as usual.")


if __name__ == "__main__":
    main()
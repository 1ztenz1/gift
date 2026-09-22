# Product photography

Every card and product page falls back to an illustrated tile until a real
photo exists. To switch a product over to photography:

1. Drop the file in `public/images/products/` — for example
   `signature-chocolate-hamper-1.jpg`.
2. Open `src/data/products.ts`, find that product, and list the path:

   ```ts
   images: ["/images/products/signature-chocolate-hamper-1.jpg"],
   ```

That is the only change needed. An empty `images: []` keeps the illustration.

## What works best

- **Shape:** 4:5 portrait (e.g. 1200 × 1500). Cards and the product page are
  both built around that ratio.
- **Format:** JPEG or WebP. Next.js re-encodes to AVIF/WebP and resizes per
  device, so upload the largest clean version you have rather than a
  pre-shrunk one.
- **Weight:** keep the source under ~2 MB; anything larger just slows the build.
- **Background:** the site is warm cream (`#FDFAF6`). Photos shot on cream,
  kraft or pale wood sit in it most naturally.

Gallery images go in `public/images/gallery/` and are wired up in
`src/data/content.ts`.

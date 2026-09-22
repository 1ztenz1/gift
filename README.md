# Art by Afni — storefront

Front-end for a handmade gifting studio. Customers build a gift from real
options, watch the price update live, and send the finished order to WhatsApp.
There is no backend yet by design: the catalogue is typed data, the bag lives in
the browser, and every form hands off to WhatsApp or email.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4

---

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

Every route prerenders to static HTML, so this deploys anywhere — Vercel,
Netlify, Cloudflare Pages, or a plain static host (see *Static export* below).

---

## Before launch — three things to change

Everything a non-developer needs to edit lives in `src/data/`.

### 1. Contact details

`src/data/site.ts`, at the top:

```ts
whatsapp: {
  number: "919000000000",   // digits only, with country code, no + or spaces
  display: "+91 90000 00000",
},
email: "hello@artbyafni.com",
location: "Kerala, India",
```

`number` is what builds every `wa.me` link — get it wrong and every order button
goes nowhere. Also set `url` to the real domain so OG tags and the sitemap are
correct.

### 2. Photography

Products ship with illustrated tiles instead of photos. See
[`public/images/README.md`](public/images/README.md) for how to swap in real
pictures — it is a one-line change per product.

> **Note:** the illustrations were used deliberately. Instagram's image URLs
> expire within hours and re-hosting them breaks Meta's terms, so the studio's
> own photos need to be exported and dropped in directly.

### 3. Policies

`src/data/policies.ts` contains working drafts of the shipping, returns,
privacy and terms pages. They describe how the studio actually operates, but
they are the terms customers will hold the business to — read them through and
adjust before going live.

---

## How the catalogue works

`src/data/products.ts` holds every product. A product carries a base price plus
`optionGroups`, and each group changes the price:

| Type | Renders as | Pricing |
|---|---|---|
| `radio` | Stacked cards, one selected | Adds the chosen option's `priceDelta` |
| `swatch` | Colour pills | Adds the chosen option's `priceDelta` |
| `addon` | Checkbox grid, any number | Adds every ticked `priceDelta` |
| `text` | Input or textarea | Adds `priceDelta` once, only when filled |

All deltas are per unit, so the total is `(base + deltas) × quantity`. Deltas can
be negative — "I'll send my own dupatta" takes ₹1,500 off.

The maths lives in `src/lib/pricing.ts` and is shared by the product page, the
home-page teaser, the bag and the checkout summary. There is one implementation,
so those four places can never disagree.

**To add a product:** append an object to the `products` array. TypeScript will
tell you what is missing. It appears in the shop, sitemap, filters and related
rails automatically.

---

## Adding a backend later

The seams are already cut:

- **Catalogue** — `src/data/products.ts` exports plain functions (`getProduct`,
  `featuredProducts`, `relatedProducts`). Point those at an API or CMS and no
  component changes.
- **Bag** — `src/lib/cart.tsx` is a context over `localStorage`. Swap the
  storage effects for API calls; the interface (`add`, `remove`,
  `updateQuantity`) stays.
- **Checkout** — `src/lib/whatsapp.ts` turns a bag into a message. Replace
  `buildOrderMessage` with a `POST`, keep the WhatsApp link as a fallback.
- **Payments** — `CheckoutForm` already collects everything a payment intent
  needs. The existing flow was chosen because orders genuinely need a
  conversation first, not as a stopgap.

---

## Layout of the source

```
src/
├── app/                 routes (App Router)
│   ├── shop/[slug]/     product page + customiser
│   ├── policies/[slug]/ shipping, returns, privacy, terms
│   ├── sitemap.ts       generated from the catalogue
│   └── robots.ts
├── components/
│   ├── Customiser.tsx   the option → price engine, UI side
│   ├── Motif.tsx        illustrated product tiles (inline SVG)
│   ├── ShopBrowser.tsx  filtering, sorting, URL sync
│   └── icons.tsx        hand-rolled icon set, no icon package
├── data/                everything the owner edits
└── lib/                 pricing, bag, formatting, WhatsApp
```

---

## Performance notes

- No UI, animation or icon libraries. Runtime dependencies are React and Next.
- Product tiles are inline SVG, so the grid paints with zero image requests and
  no layout shift. Real photos go through `next/image` (AVIF/WebP, responsive
  `sizes`) when added.
- Fonts are self-hosted by `next/font` — no request to Google, no FOIT.
- Scroll animations use one `IntersectionObserver` per element and are disabled
  under `prefers-reduced-motion`. The hidden state is applied from JS, so
  content stays visible if scripts fail.

## Accessibility

Skip link, focus-visible rings throughout, labelled form fields with
`aria-invalid` and described errors, `aria-pressed`/`aria-checked` on custom
controls, `aria-live` on shop result counts, and Escape-to-close on the bag and
menu.

---

## Static export

For a host without a Node runtime (GitHub Pages, S3), add to `next.config.ts`:

```ts
output: "export",
images: { unoptimized: true },
```

Then `npm run build` writes a deployable `out/`. Nothing in the site needs a
server — this works today. The trade-off is losing `next/image` optimisation,
which only matters once real photographs are in.

/**
 * Single source of truth for everything the owner needs to edit.
 * Change a value here and it updates across every page.
 */

export const site = {
  name: "Art by Afni",
  shortName: "Afni",
  tagline: "Handcrafted gifting, made personal",
  description:
    "Handmade hampers, bouquets, shadow boxes and wedding stationery — designed and crafted to order by Afni, an IBR, ABR and IB record holder.",
  url: "https://artbyafni.com",
  locale: "en_IN",

  // ── Replace these three with the real details before launch ──────────────
  whatsapp: {
    // Digits only, with country code. Used to build wa.me links.
    number: "919000000000",
    display: "+91 90000 00000",
  },
  email: "hello@artbyafni.com",
  location: "Kerala, India",
  // ─────────────────────────────────────────────────────────────────────────

  hours: "Mon – Sat, 10am – 8pm IST",
  shipsTo: "All across India",

  socials: {
    instagram: "https://www.instagram.com/amyah_lavv/",
    instagramHandle: "@amyah_lavv",
  },

  credentials: [
    { short: "IBR", full: "India Book of Records" },
    { short: "ABR", full: "Asia Book of Records" },
    { short: "IB", full: "International Book of Records" },
  ],
} as const;

export const currency = {
  code: "INR",
  symbol: "₹",
  locale: "en-IN",
} as const;

export type NavLink = { href: string; label: string };

export const primaryNav: NavLink[] = [
  { href: "/shop", label: "Shop" },
  { href: "/custom-order", label: "Custom Order" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All gifts" },
      { href: "/shop?category=hampers", label: "Gift hampers" },
      { href: "/shop?category=bouquets", label: "Bouquets" },
      { href: "/shop?category=frames", label: "Frames & shadow boxes" },
      { href: "/shop?category=wedding", label: "Wedding stationery" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/gallery", label: "Gallery" },
      { href: "/custom-order", label: "Request a custom order" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/policies/shipping", label: "Shipping & delivery" },
      { href: "/policies/returns", label: "Returns & cancellations" },
      { href: "/policies/privacy", label: "Privacy policy" },
      { href: "/policies/terms", label: "Terms of service" },
    ],
  },
];

/** Trust strip shown under the hero. */
export const promises = [
  {
    title: "Handmade to order",
    body: "Every piece is assembled by hand after you order — nothing is mass produced.",
    icon: "hand",
  },
  {
    title: "Yours to customise",
    body: "Pick the colours, contents and the message. Price updates as you build.",
    icon: "sliders",
  },
  {
    title: "Award-winning craft",
    body: "Recognised by the India, Asia and International Book of Records.",
    icon: "award",
  },
  {
    title: "Shipped across India",
    body: "Padded, protected and tracked. Local hand delivery in Kerala.",
    icon: "truck",
  },
] as const;

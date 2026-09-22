import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileTabBar } from "@/components/MobileTabBar";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site } from "@/data/site";
import "./globals.css";

/* Variable fonts, self-hosted by next/font — no render-blocking request to Google. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "handmade gifts India",
    "gift hampers Kerala",
    "chocolate bouquet",
    "shadow box frame",
    "nikkah nama",
    "bridal dupatta",
    "custom wedding invitations",
    "personalised gifts",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#FDFAF6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: `+${site.whatsapp.number}`,
  address: { "@type": "PostalAddress", addressRegion: "Kerala", addressCountry: "IN" },
  sameAs: [site.socials.instagram],
  priceRange: "₹₹",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="min-h-screen pb-safe-nav antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-cream"
        >
          Skip to content
        </a>

        <CartProvider>
          <Header />
          <main id="main">
            {children}
          </main>
          <Footer />
          <MobileTabBar />
          <WhatsAppFab />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

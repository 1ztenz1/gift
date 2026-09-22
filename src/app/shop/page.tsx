import type { Metadata } from "next";
import { ShopBrowser } from "@/components/ShopBrowser";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Shop handmade gifts",
  description:
    "Browse hampers, bouquets, shadow boxes, bridal dupattas and wedding stationery. Customise every piece and see the price update as you choose.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div className="container-x py-8 lg:py-12">
      <Breadcrumbs trail={[{ href: "/", label: "Home" }, { label: "Shop" }]} />

      <header className="mt-5 max-w-2xl">
        <h1 className="text-[34px] leading-tight sm:text-5xl">
          Every gift, yours to change
        </h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          Nothing here is made until you order it, which is why almost
          everything can be adjusted. Pick a piece and build it your way — the
          price follows along.
        </p>
      </header>

      <ShopBrowser />
    </div>
  );
}

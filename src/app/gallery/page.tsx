import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Breadcrumbs, ButtonLink } from "@/components/ui";
import { Instagram } from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Recent hampers, bouquets, frames and wedding stationery that have left the studio.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <div className="container-x py-8 lg:py-12">
      <Breadcrumbs
        trail={[{ href: "/", label: "Home" }, { label: "Gallery" }]}
      />

      <header className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-[34px] leading-tight sm:text-5xl">
            What has been leaving the bench
          </h1>
          <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
            A working record rather than a catalogue — most of these were
            one-offs, made to somebody&apos;s brief. New work goes up on
            Instagram first.
          </p>
        </div>

        <ButtonLink
          href={site.socials.instagram}
          external
          variant="secondary"
          className="shrink-0"
        >
          <Instagram size={17} />
          {site.socials.instagramHandle}
        </ButtonLink>
      </header>

      <GalleryGrid />

      <section className="mt-16 rounded-3xl border border-line bg-shell/60 px-6 py-12 text-center">
        <h2 className="text-[26px] sm:text-3xl">Seen something you want?</h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
          Nearly everything here can be remade in your colours, at your size,
          with your names on it.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/custom-order">Request a custom order</ButtonLink>
          <ButtonLink href="/shop" variant="secondary">
            Browse the shop
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}

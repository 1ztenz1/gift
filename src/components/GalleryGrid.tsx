"use client";

import { useState } from "react";
import { galleryItems } from "@/data/content";
import { cx } from "@/lib/format";
import { Motif } from "./Motif";

const spans = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
} as const;

export function GalleryGrid() {
  const filters = ["All", ...new Set(galleryItems.map((item) => item.category))];
  const [active, setActive] = useState("All");

  const shown =
    active === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === active);

  return (
    <>
      <div className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={cx(
              "shrink-0 rounded-full border px-4 py-2 text-[14px] transition",
              active === filter
                ? "border-ink bg-ink text-cream"
                : "border-line bg-white hover:border-gold hover:text-gold-deep",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-6 grid auto-rows-[152px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-3 lg:auto-rows-[230px] lg:grid-cols-4">
        {shown.map((item, i) => (
          <figure
            key={item.id}
            className={cx(
              "group relative animate-fade-up overflow-hidden rounded-2xl ring-1 ring-line",
              spans[item.span],
            )}
            style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
          >
            <div className="h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
              <Motif motif={item.motif} seed={i + 23} />
            </div>

            <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-ink/80 to-transparent p-3.5 pt-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-[13px] leading-snug font-medium text-white">
                {item.caption}
              </p>
              <p className="text-[11.5px] text-white/70">{item.category}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

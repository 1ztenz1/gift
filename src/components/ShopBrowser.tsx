"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { categories, occasions, products } from "@/data/products";
import type { CategoryId, OccasionId } from "@/data/types";
import { cx } from "@/lib/format";
import { fromPrice } from "@/lib/pricing";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui";
import { ChevronDown, Search, Sliders, X } from "./icons";

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
  { id: "new", label: "Newest first" },
] as const;

type SortId = (typeof sorts)[number]["id"];

export function ShopBrowser() {
  const router = useRouter();

  // Deliberately not useSearchParams(): reading it during render opts this
  // whole subtree out of prerendering, and the product grid would ship as an
  // empty skeleton. Starting unfiltered lets the full grid render as static
  // HTML, then the URL is applied on mount.
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [occasion, setOccasion] = useState<OccasionId | "all">("all");
  const [sort, setSort] = useState<SortId>("featured");
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect --
     The URL is an external system, and it can only be read after mount here:
     useSearchParams() during render would opt this subtree out of
     prerendering and ship the product grid as an empty skeleton. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("category");
    const occasionParam = params.get("occasion");
    const sortParam = params.get("sort");

    if (fromUrl) setCategory(fromUrl as CategoryId);
    if (occasionParam) setOccasion(occasionParam as OccasionId);
    if (sortParam && sorts.some((option) => option.id === sortParam)) {
      setSort(sortParam as SortId);
    }
    setQuery(params.get("q") ?? "");
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Keep the URL shareable without pushing a history entry per keystroke.
  // Gated on `hydrated` so this never overwrites the incoming query string.
  useEffect(() => {
    if (!hydrated) return;

    const next = new URLSearchParams();
    if (category !== "all") next.set("category", category);
    if (occasion !== "all") next.set("occasion", occasion);
    if (sort !== "featured") next.set("sort", sort);
    if (query.trim()) next.set("q", query.trim());

    const search = next.toString();
    const url = search ? `/shop?${search}` : "/shop";
    const current = `${window.location.pathname}${window.location.search}`;
    if (url !== current) router.replace(url, { scroll: false });
  }, [category, occasion, sort, query, hydrated, router]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (occasion !== "all" && !product.occasions.includes(occasion))
        return false;
      if (!needle) return true;

      return (
        product.name.toLowerCase().includes(needle) ||
        product.tagline.toLowerCase().includes(needle) ||
        product.description.toLowerCase().includes(needle)
      );
    });

    const byFeatured = (a: (typeof products)[number], b: typeof a) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      b.rating - a.rating;

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return fromPrice(a) - fromPrice(b);
        case "price-desc":
          return fromPrice(b) - fromPrice(a);
        case "rating":
          return b.rating - a.rating || b.reviewCount - a.reviewCount;
        case "new":
          return Number(Boolean(b.newArrival)) - Number(Boolean(a.newArrival));
        default:
          return byFeatured(a, b);
      }
    });
  }, [category, occasion, sort, query]);

  const activeCount =
    (category !== "all" ? 1 : 0) +
    (occasion !== "all" ? 1 : 0) +
    (query.trim() ? 1 : 0);

  const reset = () => {
    setCategory("all");
    setOccasion("all");
    setQuery("");
    setSort("featured");
  };

  return (
    <>
      {/* Search + sort bar */}
      <div className="sticky top-16 z-30 mt-8 -mx-5 border-y border-line bg-cream/92 px-5 py-3 backdrop-blur-md md:-mx-8 md:px-8 lg:top-[72px]">
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hampers, bouquets, frames…"
              aria-label="Search gifts"
              className="h-11 w-full rounded-full border border-line bg-white pr-4 pl-10 text-[14.5px] placeholder:text-muted/70 focus:border-gold focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            className={cx(
              "flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[14px] transition lg:hidden",
              activeCount
                ? "border-gold bg-gold-soft text-gold-deep"
                : "border-line bg-white",
            )}
          >
            <Sliders size={16} />
            Filters
            {activeCount ? (
              <span className="flex size-5 items-center justify-center rounded-full bg-gold text-[11px] font-bold text-white">
                {activeCount}
              </span>
            ) : null}
          </button>

          <div className="relative hidden shrink-0 lg:block">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              aria-label="Sort products"
              className="h-11 appearance-none rounded-full border border-line bg-white pr-10 pl-4 text-[14px] focus:border-gold focus:outline-none"
            >
              {sorts.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-muted"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[224px_1fr] lg:gap-10">
        <aside
          className={cx(
            "lg:block lg:sticky lg:top-40 lg:self-start",
            filtersOpen ? "block" : "hidden",
          )}
        >
          <FilterGroup
            title="Collection"
            options={[
              { id: "all", label: "Everything" },
              ...categories.map((c) => ({ id: c.id, label: c.label })),
            ]}
            value={category}
            onChange={(value) => setCategory(value as CategoryId | "all")}
          />

          <div className="hairline my-6" />

          <FilterGroup
            title="Occasion"
            options={[
              { id: "all", label: "Any occasion" },
              ...occasions.map((o) => ({ id: o.id, label: o.label })),
            ]}
            value={occasion}
            onChange={(value) => setOccasion(value as OccasionId | "all")}
          />

          <div className="hairline my-6 lg:hidden" />

          <div className="lg:hidden">
            <p className="mb-3 font-sans text-[11px] font-semibold tracking-[0.16em] text-gold-deep uppercase">
              Sort
            </p>
            <div className="flex flex-wrap gap-2">
              {sorts.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSort(option.id)}
                  className={cx(
                    "rounded-full border px-3.5 py-2 text-[13px] transition",
                    sort === option.id
                      ? "border-ink bg-ink text-cream"
                      : "border-line bg-white",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {activeCount > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
              className="mt-6 -ml-4 text-muted"
            >
              <X size={14} />
              Clear filters
            </Button>
          ) : null}
        </aside>

        <div>
          <p className="mb-5 text-[13.5px] text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? "gift" : "gifts"}
            {category !== "all"
              ? ` in ${categories.find((c) => c.id === category)?.label}`
              : ""}
          </p>

          {results.length === 0 ? (
            <EmptyResults onReset={reset} />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 lg:grid-cols-3">
              {results.map((product, i) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  index={i}
                  priority={i < 3}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function FilterGroup({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 font-sans text-[11px] font-semibold tracking-[0.16em] text-gold-deep uppercase">
        {title}
      </legend>
      <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
        {options.map((option) => {
          const active = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={active}
              className={cx(
                "rounded-full px-3.5 py-2 text-left text-[14px] transition lg:-ml-3.5 lg:w-full",
                active
                  ? "bg-ink text-cream lg:bg-shell lg:font-medium lg:text-ink"
                  : "border border-line bg-white text-muted hover:text-ink lg:border-0 lg:bg-transparent lg:hover:bg-shell",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function EmptyResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-line py-16 text-center">
      <p className="font-display text-2xl">Nothing matches that</p>
      <p className="mx-auto mt-2 max-w-sm text-[14.5px] text-muted">
        Try a wider search, or ask for it directly — most of what leaves this
        studio was a custom request first.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button variant="secondary" onClick={onReset}>
          Clear filters
        </Button>
      </div>
    </div>
  );
}

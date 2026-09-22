"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getProduct } from "@/data/products";
import { cx, formatDelta, formatPrice } from "@/lib/format";
import { defaultSelections, priceProduct, type Selections } from "@/lib/pricing";
import { Motif } from "./Motif";
import { ArrowRight, Check } from "./icons";

/**
 * A working slice of the real customiser on the home page. It uses the same
 * pricing function as the product page, so the number here is never a mock-up.
 */
export function CustomiseTeaser({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const [selections, setSelections] = useState<Selections>(() =>
    product ? defaultSelections(product) : {},
  );

  const price = useMemo(
    () => (product ? priceProduct(product, selections, 1) : null),
    [product, selections],
  );

  if (!product || !price) return null;

  // Only the chip-style groups make sense at this size.
  const groups = product.optionGroups
    .filter((g) => g.type === "radio" || g.type === "swatch")
    .slice(0, 2);

  const addonGroup = product.optionGroups.find((g) => g.type === "addon");

  const toggleAddon = (choiceId: string) => {
    setSelections((current) => {
      if (!addonGroup) return current;
      const chosen = Array.isArray(current[addonGroup.id])
        ? (current[addonGroup.id] as string[])
        : [];
      return {
        ...current,
        [addonGroup.id]: chosen.includes(choiceId)
          ? chosen.filter((id) => id !== choiceId)
          : [...chosen, choiceId],
      };
    });
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-soft">
      <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="relative aspect-square md:aspect-auto">
          <Motif motif={product.motif} seed={3} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent p-5">
            <p className="font-display text-xl text-white">{product.name}</p>
            <p className="text-[13px] text-white/80">{product.leadTime}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="eyebrow">Try it here</p>
          <h3 className="mt-2.5 text-2xl">Watch the price follow your choices</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            This is the real customiser, not a picture of one. Every option
            below changes the total the moment you tap it.
          </p>

          <div className="mt-6 space-y-5">
            {groups.map((group) => {
              if (group.type !== "radio" && group.type !== "swatch") return null;
              const current = selections[group.id];

              return (
                <div key={group.id}>
                  <p className="mb-2.5 text-[12.5px] font-medium text-muted">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.choices.map((choice) => {
                      const active = current === choice.id;
                      return (
                        <button
                          key={choice.id}
                          type="button"
                          onClick={() =>
                            setSelections((s) => ({ ...s, [group.id]: choice.id }))
                          }
                          aria-pressed={active}
                          className={cx(
                            "flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] transition",
                            active
                              ? "border-ink bg-ink text-cream"
                              : "border-line bg-white hover:border-gold",
                          )}
                        >
                          {choice.swatch ? (
                            <span
                              className="size-3.5 rounded-full ring-1 ring-black/10"
                              style={{ background: choice.swatch }}
                            />
                          ) : null}
                          {choice.label}
                          {choice.priceDelta !== 0 ? (
                            <span
                              className={cx(
                                "text-[11px] tabular-nums",
                                active ? "text-cream/70" : "text-muted",
                              )}
                            >
                              {formatDelta(choice.priceDelta)}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {addonGroup && addonGroup.type === "addon" ? (
              <div>
                <p className="mb-2.5 text-[12.5px] font-medium text-muted">
                  {addonGroup.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {addonGroup.choices.slice(0, 4).map((choice) => {
                    const chosen = Array.isArray(selections[addonGroup.id])
                      ? (selections[addonGroup.id] as string[])
                      : [];
                    const active = chosen.includes(choice.id);

                    return (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => toggleAddon(choice.id)}
                        aria-pressed={active}
                        className={cx(
                          "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] transition",
                          active
                            ? "border-gold bg-gold-soft text-gold-deep"
                            : "border-line bg-white hover:border-gold",
                        )}
                      >
                        {active ? <Check size={13} /> : null}
                        {choice.label}
                        <span className="text-[11px] text-muted tabular-nums">
                          {formatDelta(choice.priceDelta)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
            <div>
              <p className="text-[12px] tracking-wide text-muted uppercase">
                Your total
              </p>
              <p className="font-display text-4xl tabular-nums">
                {formatPrice(price.unitPrice)}
              </p>
            </div>

            <Link
              href={`/shop/${product.slug}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-cream transition hover:bg-[#3a3029]"
            >
              Open full customiser
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

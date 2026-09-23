"use client";

import { useMemo, useState } from "react";
import type { OptionGroup, Product } from "@/data/types";
import { useCart } from "@/lib/cart";
import { cx, formatDelta, formatPrice } from "@/lib/format";
import {
  defaultSelections,
  missingRequired,
  priceProduct,
  type Selections,
} from "@/lib/pricing";
import { buildEnquiryMessage, whatsappLink } from "@/lib/whatsapp";
import { Button, ButtonLink } from "./ui";
import { Check, Minus, Plus, Sparkle, WhatsApp } from "./icons";

export function Customiser({ product }: { product: Product }) {
  const { add } = useCart();
  const min = product.minQuantity ?? 1;

  const [selections, setSelections] = useState<Selections>(() =>
    defaultSelections(product),
  );
  const [quantity, setQuantity] = useState(min);
  const [showErrors, setShowErrors] = useState(false);

  const price = useMemo(
    () => priceProduct(product, selections, quantity),
    [product, selections, quantity],
  );

  const missing = useMemo(
    () => missingRequired(product, selections),
    [product, selections],
  );

  const setChoice = (groupId: string, choiceId: string) =>
    setSelections((current) => ({ ...current, [groupId]: choiceId }));

  const toggleAddon = (groupId: string, choiceId: string) =>
    setSelections((current) => {
      const chosen = Array.isArray(current[groupId])
        ? (current[groupId] as string[])
        : [];
      return {
        ...current,
        [groupId]: chosen.includes(choiceId)
          ? chosen.filter((id) => id !== choiceId)
          : [...chosen, choiceId],
      };
    });

  const setText = (groupId: string, value: string) =>
    setSelections((current) => ({ ...current, [groupId]: value }));

  const handleAdd = () => {
    if (missing.length > 0) {
      setShowErrors(true);
      // Send focus to the first thing the shopper still has to fill in.
      document
        .getElementById(`group-${missing[0].id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setShowErrors(false);
    add(product.slug, selections, quantity);
  };

  const enquiry = whatsappLink(
    buildEnquiryMessage(
      product.name,
      price.lines.map((line) => ({
        label: line.groupLabel,
        value: line.value,
      })),
      formatPrice(price.total),
    ),
  );

  return (
    <div className="space-y-7">
      {product.optionGroups.map((group) => (
        <GroupBlock
          key={group.id}
          group={group}
          selections={selections}
          showError={
            showErrors && missing.some((missed) => missed.id === group.id)
          }
          onChoice={setChoice}
          onToggle={toggleAddon}
          onText={setText}
        />
      ))}

      {/* Quantity */}
      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="font-sans text-[13px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
            Quantity
          </h3>
          {min > 1 ? (
            <span className="text-[12.5px] text-muted">
              Minimum {min} pieces
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center rounded-full border border-line bg-white">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(min, q - (min > 1 ? min : 1)))}
              disabled={quantity <= min}
              className="flex size-11 items-center justify-center rounded-full text-muted transition hover:text-ink disabled:opacity-35"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="min-w-12 text-center text-[16px] font-medium tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + (min > 1 ? min : 1))}
              className="flex size-11 items-center justify-center rounded-full text-muted transition hover:text-ink"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          {min > 1 ? (
            <p className="text-[13px] text-muted">
              {formatPrice(price.unitPrice)} per card
            </p>
          ) : null}
        </div>
      </div>

      {/* Running total */}
      <div className="rounded-2xl border border-line bg-shell/60 p-5">
        <h3 className="font-sans text-[13px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
          Your build
        </h3>

        <dl className="mt-3.5 space-y-2 text-[13.5px]">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted">
              {product.name}
              {min > 1 ? " (base, per card)" : " (base)"}
            </dt>
            <dd className="tabular-nums">{formatPrice(product.basePrice)}</dd>
          </div>

          {price.lines.map((line) => (
            <div
              key={line.groupId}
              className="flex items-baseline justify-between gap-4"
            >
              <dt className="min-w-0 text-muted">
                <span className="text-muted/70">{line.groupLabel}:</span>{" "}
                <span className="break-words">{line.value}</span>
              </dt>
              <dd
                className={cx(
                  "shrink-0 tabular-nums",
                  line.amount === 0 && "text-muted",
                )}
              >
                {line.amount === 0 ? "—" : formatDelta(line.amount)}
              </dd>
            </div>
          ))}

          {price.quantity > 1 ? (
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-2">
              <dt className="text-muted">
                {formatPrice(price.unitPrice)} × {price.quantity}
              </dt>
              <dd className="tabular-nums">{formatPrice(price.total)}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="text-[12px] tracking-wide text-muted uppercase">
              Total
            </p>
            <p className="font-display text-[34px] leading-none tabular-nums">
              {formatPrice(price.total)}
            </p>
          </div>
          {price.compareAtTotal && price.compareAtTotal > price.total ? (
            <p className="pb-1 text-[14px] text-muted line-through tabular-nums">
              {formatPrice(price.compareAtTotal)}
            </p>
          ) : null}
        </div>

        <p className="mt-3 text-[12px] leading-relaxed text-muted">
          Delivery quoted separately once we have the address. Nothing is
          charged until you confirm on WhatsApp.
        </p>
      </div>

      {showErrors && missing.length > 0 ? (
        <p role="alert" className="text-[13.5px] text-[#9B2226]">
          Still needed: {missing.map((group) => group.label).join(", ")}.
        </p>
      ) : null}

      <div className="hidden gap-3 lg:flex">
        <Button size="lg" onClick={handleAdd} className="flex-1">
          Add to bag · {formatPrice(price.total)}
        </Button>
        <ButtonLink
          href={enquiry}
          external
          variant="whatsapp"
          size="lg"
          aria-label="Ask about this on WhatsApp"
        >
          <WhatsApp size={19} />
        </ButtonLink>
      </div>

      <p className="hidden items-center justify-center gap-2 text-[13px] text-muted lg:flex">
        <Sparkle size={14} className="text-gold" />
        {product.leadTime} · made after you order
      </p>

      {/* Phone bar — sits above the tab bar so both stay reachable. */}
      <div
        className="fixed bottom-16 left-0 z-40 w-screen border-t border-line bg-cream/95 px-4 py-3 backdrop-blur-lg lg:hidden"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0">
            <p className="text-[11px] tracking-wide text-muted uppercase">
              Total
            </p>
            <p className="font-display text-[22px] leading-none tabular-nums">
              {formatPrice(price.total)}
            </p>
            <p className="mt-0.5 text-[11px] text-muted">{product.leadTime}</p>
          </div>
          <Button onClick={handleAdd} size="lg" className="flex-1">
            Add to bag
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── One option group ───────────────────────────────────────────────────── */

function GroupBlock({
  group,
  selections,
  showError,
  onChoice,
  onToggle,
  onText,
}: {
  group: OptionGroup;
  selections: Selections;
  showError: boolean;
  onChoice: (groupId: string, choiceId: string) => void;
  onToggle: (groupId: string, choiceId: string) => void;
  onText: (groupId: string, value: string) => void;
}) {
  const heading = (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
      <h3 className="font-sans text-[13px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
        {group.label}
        {group.type === "text" && group.required ? (
          <span className="ml-1 text-rose" aria-hidden>
            *
          </span>
        ) : null}
      </h3>
      {group.type !== "text" ? (
        <span className="text-[12.5px] text-muted">
          {group.type === "addon" ? "Optional" : "Choose one"}
        </span>
      ) : null}
    </div>
  );

  return (
    <div id={`group-${group.id}`} className="scroll-mt-28">
      {heading}
      {group.helper ? (
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
          {group.helper}
        </p>
      ) : null}

      <div className="mt-3.5">
        {group.type === "text" ? (
          <TextOption
            group={group}
            value={
              typeof selections[group.id] === "string"
                ? (selections[group.id] as string)
                : ""
            }
            showError={showError}
            onChange={(value) => onText(group.id, value)}
          />
        ) : group.type === "addon" ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {group.choices.map((choice) => {
              const chosen = Array.isArray(selections[group.id])
                ? (selections[group.id] as string[])
                : [];
              const active = chosen.includes(choice.id);

              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => onToggle(group.id, choice.id)}
                  aria-pressed={active}
                  className={cx(
                    "flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition",
                    active
                      ? "border-gold bg-gold-soft/60"
                      : "border-line bg-white hover:border-gold/60",
                  )}
                >
                  <span
                    className={cx(
                      "flex size-5 shrink-0 items-center justify-center rounded-md border transition",
                      active
                        ? "border-gold bg-gold text-white"
                        : "border-line bg-white",
                    )}
                  >
                    {active ? <Check size={13} /> : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] leading-snug">
                      {choice.label}
                    </span>
                    {choice.hint ? (
                      <span className="block text-[12px] text-muted">
                        {choice.hint}
                      </span>
                    ) : null}
                  </span>
                  <span className="shrink-0 text-[13px] font-medium tabular-nums">
                    {formatDelta(choice.priceDelta)}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div
            role="radiogroup"
            aria-label={group.label}
            className={cx(
              "gap-2",
              group.type === "swatch"
                ? "flex flex-wrap"
                : "grid sm:grid-cols-2",
            )}
          >
            {group.choices.map((choice) => {
              const active = selections[group.id] === choice.id;

              if (group.type === "swatch" && choice.swatch) {
                return (
                  <button
                    key={choice.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => onChoice(group.id, choice.id)}
                    className={cx(
                      "flex items-center gap-2.5 rounded-full border py-2 pr-3.5 pl-2 transition",
                      active
                        ? "border-ink bg-white shadow-soft"
                        : "border-line bg-white hover:border-gold/60",
                    )}
                  >
                    <span
                      className={cx(
                        "flex size-7 items-center justify-center rounded-full ring-1 ring-black/10 transition",
                        active && "ring-2 ring-ink ring-offset-2",
                      )}
                      style={{ background: choice.swatch }}
                    />
                    <span className="text-[13.5px]">{choice.label}</span>
                    {choice.priceDelta !== 0 ? (
                      <span className="text-[12px] text-muted tabular-nums">
                        {formatDelta(choice.priceDelta)}
                      </span>
                    ) : null}
                  </button>
                );
              }

              return (
                <button
                  key={choice.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onChoice(group.id, choice.id)}
                  className={cx(
                    "flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left transition",
                    active
                      ? "border-ink bg-white shadow-soft"
                      : "border-line bg-white hover:border-gold/60",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block text-[14px] leading-snug">
                      {choice.label}
                    </span>
                    {choice.hint ? (
                      <span className="block text-[12px] text-muted">
                        {choice.hint}
                      </span>
                    ) : null}
                  </span>
                  <span className="shrink-0 text-[13px] font-medium tabular-nums">
                    {formatDelta(choice.priceDelta)}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function TextOption({
  group,
  value,
  showError,
  onChange,
}: {
  group: Extract<OptionGroup, { type: "text" }>;
  value: string;
  showError: boolean;
  onChange: (value: string) => void;
}) {
  const long = group.maxLength > 60;

  const shared = {
    id: `input-${group.id}`,
    value,
    maxLength: group.maxLength,
    placeholder: group.placeholder,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => onChange(e.target.value),
    "aria-invalid": showError || undefined,
    "aria-label": group.label,
    className: cx(
      "w-full rounded-xl border bg-white px-3.5 py-3 text-[14.5px] placeholder:text-muted/60 focus:outline-none",
      showError ? "border-rose focus:border-rose" : "border-line focus:border-gold",
    ),
  };

  return (
    <div>
      {long ? (
        <textarea {...shared} rows={3} className={cx(shared.className, "resize-none")} />
      ) : (
        <input {...shared} type="text" />
      )}

      <div className="mt-1.5 flex items-center justify-between text-[12px] text-muted">
        <span>
          {group.priceDelta > 0
            ? `${formatDelta(group.priceDelta)} when filled in`
            : "No extra charge"}
        </span>
        <span className="tabular-nums">
          {value.length}/{group.maxLength}
        </span>
      </div>
    </div>
  );
}

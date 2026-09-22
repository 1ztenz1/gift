import type { OptionGroup, Product } from "@/data/types";

/**
 * What the shopper has chosen, keyed by option group id.
 * radio/swatch → the chosen choice id. addon → chosen choice ids. text → the typed string.
 */
export type Selections = Record<string, string | string[]>;

export type PriceLine = {
  groupId: string;
  groupLabel: string;
  /** Human-readable value, e.g. "Classic" or "Wax seal, Vellum wrap". */
  value: string;
  amount: number;
};

export type PriceBreakdown = {
  base: number;
  lines: PriceLine[];
  /** Price for one unit, options included. */
  unitPrice: number;
  quantity: number;
  /** unitPrice × quantity. */
  total: number;
  compareAtTotal?: number;
};

export const defaultSelections = (product: Product): Selections => {
  const out: Selections = {};

  for (const group of product.optionGroups) {
    if (group.type === "addon") {
      out[group.id] = [...(group.defaultChoices ?? [])];
    } else if (group.type === "text") {
      out[group.id] = "";
    } else {
      out[group.id] = group.defaultChoice;
    }
  }

  return out;
};

const asArray = (value: string | string[] | undefined): string[] => {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
};

/** One group's contribution to the unit price, plus the label to show for it. */
const priceGroup = (
  group: OptionGroup,
  selections: Selections,
): PriceLine | null => {
  const raw = selections[group.id];

  if (group.type === "text") {
    const text = typeof raw === "string" ? raw.trim() : "";
    if (!text) return null;

    return {
      groupId: group.id,
      groupLabel: group.label,
      value: text,
      amount: group.priceDelta,
    };
  }

  if (group.type === "addon") {
    const chosen = group.choices.filter((c) => asArray(raw).includes(c.id));
    if (chosen.length === 0) return null;

    return {
      groupId: group.id,
      groupLabel: group.label,
      value: chosen.map((c) => c.label).join(", "),
      amount: chosen.reduce((sum, c) => sum + c.priceDelta, 0),
    };
  }

  const chosen = group.choices.find((c) => c.id === raw);
  if (!chosen) return null;

  return {
    groupId: group.id,
    groupLabel: group.label,
    value: chosen.label,
    amount: chosen.priceDelta,
  };
};

export const priceProduct = (
  product: Product,
  selections: Selections,
  quantity = 1,
): PriceBreakdown => {
  const lines = product.optionGroups
    .map((group) => priceGroup(group, selections))
    .filter((line): line is PriceLine => line !== null);

  // Every option is priced per unit, so the whole unit price scales with quantity.
  const optionsTotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const unitPrice = Math.max(0, product.basePrice + optionsTotal);
  const qty = Math.max(product.minQuantity ?? 1, quantity);

  return {
    base: product.basePrice,
    lines,
    unitPrice,
    quantity: qty,
    total: unitPrice * qty,
    compareAtTotal: product.compareAtPrice
      ? (product.compareAtPrice + optionsTotal) * qty
      : undefined,
  };
};

/** Required text fields the shopper has not filled in yet. */
export const missingRequired = (
  product: Product,
  selections: Selections,
): OptionGroup[] =>
  product.optionGroups.filter((group) => {
    if (group.type !== "text" || !group.required) return false;
    const value = selections[group.id];
    return typeof value !== "string" || value.trim() === "";
  });

/** Cheapest possible configuration — what the "from" price on a card shows. */
export const fromPrice = (product: Product): number => {
  const cheapest = product.optionGroups.reduce((sum, group) => {
    if (group.type === "text") return sum + (group.required ? group.priceDelta : 0);
    if (group.type === "addon") return sum;
    return sum + Math.min(...group.choices.map((c) => c.priceDelta));
  }, 0);

  return Math.max(0, product.basePrice + cheapest);
};

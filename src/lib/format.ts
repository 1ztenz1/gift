import { currency } from "@/data/site";

const formatter = new Intl.NumberFormat(currency.locale, {
  style: "currency",
  currency: currency.code,
  maximumFractionDigits: 0,
});

/** ₹1,899 — no paise, because nothing here is priced in them. */
export const formatPrice = (amount: number) => formatter.format(amount);

/** "+₹600" / "−₹400" / "Included" — for option chips. */
export const formatDelta = (amount: number) => {
  if (amount === 0) return "Included";
  const sign = amount > 0 ? "+" : "−";
  return `${sign}${formatter.format(Math.abs(amount))}`;
};

export const cx = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(" ");

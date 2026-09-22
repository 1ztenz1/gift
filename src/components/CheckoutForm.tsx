"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/data/site";
import { useCart } from "@/lib/cart";
import { cx, formatPrice } from "@/lib/format";
import {
  buildOrderMessage,
  mailtoLink,
  whatsappLink,
  type CheckoutDetails,
} from "@/lib/whatsapp";
import { ProductImage } from "./ProductImage";
import { ButtonLink } from "./ui";
import { Bag, Check, Mail, WhatsApp } from "./icons";

type Errors = Partial<Record<"name" | "phone" | "city", string>>;

const emptyDetails: CheckoutDetails = {
  name: "",
  phone: "",
  city: "",
  deliveryDate: "",
  notes: "",
  giftWrapNote: "",
  deliverToRecipient: false,
  recipientName: "",
  recipientAddress: "",
};

export function CheckoutForm() {
  const { resolved, subtotal, ready, clear } = useCart();
  const [details, setDetails] = useState<CheckoutDetails>(emptyDetails);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof CheckoutDetails>(
    key: K,
    value: CheckoutDetails[K],
  ) => {
    setDetails((current) => ({ ...current, [key]: value }));
    if (key in errors) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!details.name.trim()) next.name = "We need a name for the order.";

    const digits = details.phone.replace(/\D/g, "");
    if (!digits) next.phone = "A number to reach you on.";
    else if (digits.length < 10) next.phone = "That looks a digit or two short.";

    if (!details.city.trim()) next.city = "Helps us quote delivery.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const message = buildOrderMessage(resolved, subtotal, details);

  const handleSend = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) {
      event.preventDefault();
      document
        .getElementById("checkout-details")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setSent(true);
  };

  if (!ready) {
    return (
      <div className="mt-10 space-y-3">
        <div className="skeleton h-24 rounded-2xl" />
        <div className="skeleton h-24 rounded-2xl" />
      </div>
    );
  }

  if (resolved.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-line py-20 text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-shell text-gold-deep">
          <Bag size={28} />
        </span>
        <p className="mt-5 font-display text-2xl">Your bag is empty</p>
        <p className="mx-auto mt-2 max-w-sm text-[14.5px] text-muted">
          Add a gift and it will show up here, ready to send across.
        </p>
        <div className="mt-6">
          <ButtonLink href="/shop">Browse the shop</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
      <div id="checkout-details">
        <Section title="Your details" step={1}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Your name"
              required
              value={details.name}
              error={errors.name}
              onChange={(value) => set("name", value)}
              placeholder="Afni Rahman"
              autoComplete="name"
            />
            <Field
              label="Phone / WhatsApp"
              required
              type="tel"
              value={details.phone}
              error={errors.phone}
              onChange={(value) => set("phone", value)}
              placeholder="+91 90000 00000"
              autoComplete="tel"
            />
            <Field
              label="Your city"
              required
              value={details.city}
              error={errors.city}
              onChange={(value) => set("city", value)}
              placeholder="Kozhikode"
              autoComplete="address-level2"
            />
            <Field
              label="Needed by"
              type="date"
              value={details.deliveryDate ?? ""}
              onChange={(value) => set("deliveryDate", value)}
              hint="Leave blank if there is no deadline."
            />
          </div>
        </Section>

        <Section title="Where it is going" step={2}>
          <label
            className={cx(
              "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition",
              details.deliverToRecipient
                ? "border-gold bg-gold-soft/50"
                : "border-line bg-white hover:border-gold/60",
            )}
          >
            <input
              type="checkbox"
              checked={details.deliverToRecipient}
              onChange={(e) => set("deliverToRecipient", e.target.checked)}
              className="sr-only"
            />
            <span
              className={cx(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition",
                details.deliverToRecipient
                  ? "border-gold bg-gold text-white"
                  : "border-line bg-white",
              )}
            >
              {details.deliverToRecipient ? <Check size={13} /> : null}
            </span>
            <span>
              <span className="block text-[14.5px] font-medium">
                Send it straight to the person receiving it
              </span>
              <span className="mt-0.5 block text-[13px] leading-relaxed text-muted">
                We leave the invoice out of the parcel, so the gift arrives
                without a price on it.
              </span>
            </span>
          </label>

          {details.deliverToRecipient ? (
            <div className="mt-4 grid animate-fade-up gap-4">
              <Field
                label="Their name"
                value={details.recipientName ?? ""}
                onChange={(value) => set("recipientName", value)}
                placeholder="Amina"
              />
              <Field
                label="Their address"
                multiline
                value={details.recipientAddress ?? ""}
                onChange={(value) => set("recipientAddress", value)}
                placeholder="House name, street, town, district, PIN"
                hint="Send it on WhatsApp instead if you would rather not type it here."
              />
            </div>
          ) : null}
        </Section>

        <Section title="Anything else" step={3}>
          <div className="grid gap-4">
            <Field
              label="Gift wrap note"
              value={details.giftWrapNote ?? ""}
              onChange={(value) => set("giftWrapNote", value)}
              placeholder="Wrap the two hampers separately, please"
            />
            <Field
              label="Notes for Afni"
              multiline
              value={details.notes ?? ""}
              onChange={(value) => set("notes", value)}
              placeholder="Colour references, a photo you will send over, anything else."
            />
          </div>
        </Section>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-6">
          <h2 className="font-display text-xl">Order summary</h2>

          <ul className="mt-4 divide-y divide-line">
            {resolved.map((item) => (
              <li key={item.id} className="flex gap-3 py-3.5">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-shell ring-1 ring-line">
                  <ProductImage
                    images={item.product.images}
                    motif={item.product.motif}
                    alt={item.product.name}
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] leading-snug font-medium">
                    {item.product.name}
                  </p>
                  <p className="text-[12px] text-muted">
                    Qty {item.price.quantity} ·{" "}
                    {formatPrice(item.price.unitPrice)} each
                  </p>
                  {item.price.lines.length > 0 ? (
                    <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-muted/80">
                      {item.price.lines
                        .map((line) => `${line.groupLabel}: ${line.value}`)
                        .join(" · ")}
                    </p>
                  ) : null}
                </div>
                <p className="shrink-0 text-[14px] font-medium tabular-nums">
                  {formatPrice(item.price.total)}
                </p>
              </li>
            ))}
          </ul>

          <div className="space-y-2 border-t border-line pt-4 text-[14px]">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Delivery</span>
              <span className="text-muted">Quoted on confirmation</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <span className="font-medium">Total so far</span>
              <span className="font-display text-2xl tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSend}
              className="flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-[#1FA855] text-[15px] font-medium text-white shadow-soft transition hover:bg-[#188C46] active:scale-[0.98]"
            >
              <WhatsApp size={19} />
              Send order on WhatsApp
            </a>

            <a
              href={mailtoLink(`Order from ${details.name || "the website"}`, message)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-line text-[14px] font-medium transition hover:border-gold hover:bg-shell"
            >
              <Mail size={16} />
              Email the order instead
            </a>
          </div>

          <p className="mt-4 text-[12px] leading-relaxed text-muted">
            Sending opens WhatsApp with your whole order already written out.
            Afni confirms the total and the delivery date before anything is
            paid or made.
          </p>

          {sent ? (
            <div className="mt-4 animate-fade-up rounded-xl bg-shell p-4">
              <p className="text-[13.5px] leading-relaxed">
                Sent across. Once Afni has confirmed, you can{" "}
                <button
                  type="button"
                  onClick={clear}
                  className="text-ink underline decoration-gold underline-offset-4"
                >
                  empty your bag
                </button>
                .
              </p>
            </div>
          ) : null}
        </div>

        <p className="mt-4 text-center text-[13px] text-muted">
          Prefer to talk it through?{" "}
          <Link
            href="/contact"
            className="text-ink underline decoration-gold underline-offset-4"
          >
            Other ways to reach {site.shortName}
          </Link>
        </p>
      </aside>
    </div>
  );
}

/* ── Form pieces ────────────────────────────────────────────────────────── */

function Section({
  title,
  step,
  children,
}: {
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-9">
      <h2 className="mb-4 flex items-center gap-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-ink text-[12px] font-semibold text-cream">
          {step}
        </span>
        <span className="font-display text-xl">{title}</span>
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  hint,
  required,
  type = "text",
  multiline,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
}) {
  const id = `field-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;

  const className = cx(
    "w-full rounded-xl border bg-white px-3.5 py-3 text-[14.5px] placeholder:text-muted/60 focus:outline-none transition-colors",
    error ? "border-rose focus:border-rose" : "border-line focus:border-gold",
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-muted"
      >
        {label}
        {required ? (
          <span className="ml-1 text-rose" aria-hidden>
            *
          </span>
        ) : null}
      </label>

      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          aria-invalid={Boolean(error)}
          aria-describedby={error || hint ? `${id}-note` : undefined}
          className={cx(className, "resize-none")}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error || hint ? `${id}-note` : undefined}
          className={className}
        />
      )}

      {error || hint ? (
        <p
          id={`${id}-note`}
          className={cx(
            "mt-1.5 text-[12.5px]",
            error ? "text-[#9B2226]" : "text-muted",
          )}
        >
          {error ?? hint}
        </p>
      ) : null}
    </div>
  );
}

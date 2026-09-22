"use client";

import { useState } from "react";
import { categories, occasions } from "@/data/products";
import { cx } from "@/lib/format";
import {
  buildCustomOrderMessage,
  mailtoLink,
  whatsappLink,
  type CustomOrderDetails,
} from "@/lib/whatsapp";
import { Mail, WhatsApp } from "./icons";

const budgets = [
  "Under ₹1,000",
  "₹1,000 – ₹2,500",
  "₹2,500 – ₹5,000",
  "₹5,000 – ₹10,000",
  "Over ₹10,000",
  "Not sure yet",
];

const giftTypes = [
  ...categories.map((category) => category.label),
  "Corporate / bulk order",
  "Something else entirely",
];

const empty: CustomOrderDetails = {
  name: "",
  phone: "",
  giftType: giftTypes[0],
  occasion: occasions[0].label,
  budget: budgets[2],
  deadline: "",
  quantity: "1",
  brief: "",
};

type Errors = Partial<Record<"name" | "phone" | "brief", string>>;

export function CustomOrderForm() {
  const [details, setDetails] = useState<CustomOrderDetails>(empty);
  const [errors, setErrors] = useState<Errors>({});

  const set = <K extends keyof CustomOrderDetails>(
    key: K,
    value: CustomOrderDetails[K],
  ) => {
    setDetails((current) => ({ ...current, [key]: value }));
    if (key in errors) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    if (!details.name.trim()) next.name = "So we know who we are talking to.";
    if (details.phone.replace(/\D/g, "").length < 10)
      next.phone = "A number we can reach you on.";
    if (details.brief.trim().length < 15)
      next.brief = "A sentence or two about what you have in mind.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const message = buildCustomOrderMessage(details);

  const handleSubmit = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) {
      event.preventDefault();
      document
        .getElementById("custom-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const labelClass = "mb-1.5 block text-[13px] font-medium text-muted";
  const controlClass =
    "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-[14.5px] placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none";

  return (
    <form
      id="custom-form"
      onSubmit={(e) => e.preventDefault()}
      className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="co-name" className={labelClass}>
            Your name <span className="text-rose">*</span>
          </label>
          <input
            id="co-name"
            value={details.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Afni Rahman"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={cx(controlClass, errors.name && "border-rose")}
          />
          {errors.name ? (
            <p className="mt-1.5 text-[12.5px] text-[#9B2226]">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="co-phone" className={labelClass}>
            Phone / WhatsApp <span className="text-rose">*</span>
          </label>
          <input
            id="co-phone"
            type="tel"
            value={details.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 90000 00000"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className={cx(controlClass, errors.phone && "border-rose")}
          />
          {errors.phone ? (
            <p className="mt-1.5 text-[12.5px] text-[#9B2226]">{errors.phone}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="co-type" className={labelClass}>
            What kind of gift
          </label>
          <select
            id="co-type"
            value={details.giftType}
            onChange={(e) => set("giftType", e.target.value)}
            className={controlClass}
          >
            {giftTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="co-occasion" className={labelClass}>
            Occasion
          </label>
          <select
            id="co-occasion"
            value={details.occasion}
            onChange={(e) => set("occasion", e.target.value)}
            className={controlClass}
          >
            {occasions.map((occasion) => (
              <option key={occasion.id}>{occasion.label}</option>
            ))}
            <option>Something else</option>
          </select>
        </div>

        <div>
          <label htmlFor="co-quantity" className={labelClass}>
            How many
          </label>
          <input
            id="co-quantity"
            value={details.quantity}
            onChange={(e) => set("quantity", e.target.value)}
            placeholder="1"
            inputMode="numeric"
            className={controlClass}
          />
        </div>

        <div>
          <label htmlFor="co-deadline" className={labelClass}>
            Needed by
          </label>
          <input
            id="co-deadline"
            type="date"
            value={details.deadline}
            onChange={(e) => set("deadline", e.target.value)}
            className={controlClass}
          />
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className={labelClass}>Rough budget</legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((budget) => (
            <button
              key={budget}
              type="button"
              onClick={() => set("budget", budget)}
              aria-pressed={details.budget === budget}
              className={cx(
                "rounded-full border px-3.5 py-2 text-[13.5px] transition",
                details.budget === budget
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-white hover:border-gold",
              )}
            >
              {budget}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[12.5px] text-muted">
          An honest number saves time on both sides. It is never used to push
          the price up.
        </p>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="co-brief" className={labelClass}>
          What do you have in mind? <span className="text-rose">*</span>
        </label>
        <textarea
          id="co-brief"
          value={details.brief}
          onChange={(e) => set("brief", e.target.value)}
          rows={5}
          placeholder="Colours, the person it is for, anything you have seen and liked, and where it needs to reach."
          aria-invalid={Boolean(errors.brief)}
          className={cx(controlClass, "resize-none", errors.brief && "border-rose")}
        />
        {errors.brief ? (
          <p className="mt-1.5 text-[12.5px] text-[#9B2226]">{errors.brief}</p>
        ) : (
          <p className="mt-1.5 text-[12.5px] text-muted">
            Have a reference picture? Send it in the WhatsApp chat that opens
            next — it helps more than any description.
          </p>
        )}
      </div>

      <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleSubmit}
          className="flex h-13 flex-1 items-center justify-center gap-2.5 rounded-full bg-[#1FA855] text-[15px] font-medium text-white shadow-soft transition hover:bg-[#188C46] active:scale-[0.98]"
        >
          <WhatsApp size={19} />
          Send on WhatsApp
        </a>

        <a
          href={mailtoLink(
            `Custom order request — ${details.name || "website"}`,
            message,
          )}
          onClick={handleSubmit}
          className="flex h-13 items-center justify-center gap-2 rounded-full border border-line px-6 text-[14.5px] font-medium transition hover:border-gold hover:bg-shell"
        >
          <Mail size={17} />
          Email instead
        </a>
      </div>
    </form>
  );
}

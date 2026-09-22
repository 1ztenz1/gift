import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Confirm your handmade gift order and send it straight to Afni on WhatsApp.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="container-x py-8 lg:py-12">
      <Breadcrumbs
        trail={[{ href: "/", label: "Home" }, { label: "Checkout" }]}
      />

      <header className="mt-5 max-w-2xl">
        <h1 className="text-[34px] leading-tight sm:text-5xl">
          Almost there
        </h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          Fill in a few details and your whole order is written out into a
          WhatsApp message. Nothing is charged here — Afni confirms the total
          and the date with you first.
        </p>
      </header>

      <CheckoutForm />
    </div>
  );
}

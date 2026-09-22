import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Breadcrumbs } from "@/components/ui";
import { ChevronDown, WhatsApp } from "@/components/icons";
import { faqs } from "@/data/content";
import { site } from "@/data/site";
import { whatsappHello } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Ordering, customising, delivery times, returns and care — the questions that come up most often.",
  alternates: { canonical: "/faq" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FaqPage() {
  const groups = [...new Set(faqs.map((faq) => faq.group))];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container-x py-8 lg:py-12">
        <Breadcrumbs trail={[{ href: "/", label: "Home" }, { label: "FAQ" }]} />

        <header className="mt-5 max-w-2xl">
          <h1 className="text-[34px] leading-tight sm:text-5xl">
            Questions, answered
          </h1>
          <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
            If yours is not here, message on WhatsApp — you will usually get a
            reply within a few hours during {site.hours.toLowerCase()}.
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
          <div className="space-y-12">
            {groups.map((group) => (
              <section key={group}>
                <h2 className="font-sans text-[11px] font-semibold tracking-[0.16em] text-gold-deep uppercase">
                  {group}
                </h2>

                <div className="mt-4 divide-y divide-line border-y border-line">
                  {faqs
                    .filter((faq) => faq.group === group)
                    .map((faq) => (
                      <details key={faq.q} className="group py-4">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-medium [&::-webkit-details-marker]:hidden">
                          {faq.q}
                          <ChevronDown
                            size={18}
                            className="mt-0.5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180"
                          />
                        </summary>
                        <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                          {faq.a}
                        </p>
                      </details>
                    ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-line bg-shell/60 p-6">
              <h2 className="font-display text-xl">Still stuck?</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                Send a message with what you are trying to work out. A real
                answer beats guessing from a list.
              </p>
              <div className="mt-5 space-y-2.5">
                <ButtonLink
                  href={whatsappHello()}
                  external
                  variant="whatsapp"
                  className="w-full"
                >
                  <WhatsApp size={17} />
                  Ask on WhatsApp
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" className="w-full">
                  Other ways to reach us
                </ButtonLink>
              </div>
              <p className="mt-5 text-[13px] text-muted">
                Looking for the details?{" "}
                <Link
                  href="/policies/shipping"
                  className="text-ink underline decoration-gold underline-offset-4"
                >
                  Shipping
                </Link>{" "}
                and{" "}
                <Link
                  href="/policies/returns"
                  className="text-ink underline decoration-gold underline-offset-4"
                >
                  returns
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

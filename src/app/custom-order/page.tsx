import type { Metadata } from "next";
import { CustomOrderForm } from "@/components/CustomOrderForm";
import { Motif } from "@/components/Motif";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/ui";
import { Clock, Hand, Sparkle } from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Request a custom order",
  description:
    "Describe the gift you have in mind — colours, occasion, budget and date — and get a quote the same day.",
  alternates: { canonical: "/custom-order" },
};

const examples = [
  {
    motif: "shadowbox" as const,
    title: "A shadow box of a house",
    body: "Someone sent a photograph of the family home and asked for it in cut paper, with the year they moved in.",
  },
  {
    motif: "hamper" as const,
    title: "Forty corporate hampers",
    body: "A firm in Kochi wanted branded Diwali boxes, each with a different employee's name on the lid.",
  },
  {
    motif: "bouquet" as const,
    title: "A bouquet of exam papers",
    body: "Folded past papers and paper roses, made for a student who had just finished her finals.",
  },
];

export default function CustomOrderPage() {
  return (
    <div className="container-x py-8 lg:py-12">
      <Breadcrumbs
        trail={[{ href: "/", label: "Home" }, { label: "Custom order" }]}
      />

      <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-gold-soft/50 px-3.5 py-1.5 text-[12px] font-medium text-gold-deep">
            <Sparkle size={14} />
            Usually quoted the same day
          </span>

          <h1 className="mt-5 text-[34px] leading-tight sm:text-5xl">
            Describe it, and it probably can be made
          </h1>

          <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
            Most of what leaves this studio started as a message from someone
            who could not find what they wanted anywhere else. Tell us the
            occasion, the budget and the date — you will get an honest answer
            about whether it is possible and what it will cost.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-shell text-gold-deep">
                <Clock size={19} />
              </span>
              <div>
                <p className="text-[14.5px] font-medium">
                  A reply, not an auto-response
                </p>
                <p className="mt-0.5 text-[13.5px] leading-relaxed text-muted">
                  Afni reads every request herself, {site.hours.toLowerCase()}.
                </p>
              </div>
            </li>
            <li className="flex gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-shell text-gold-deep">
                <Hand size={19} />
              </span>
              <div>
                <p className="text-[14.5px] font-medium">
                  Nothing starts until you approve it
                </p>
                <p className="mt-0.5 text-[13.5px] leading-relaxed text-muted">
                  You see a sketch or a proof and a firm price before any work
                  begins.
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-10 hidden lg:block">
            <p className="font-sans text-[11px] font-semibold tracking-[0.16em] text-gold-deep uppercase">
              Things people have asked for
            </p>
            <ul className="mt-4 space-y-3">
              {examples.map((example) => (
                <li
                  key={example.title}
                  className="flex gap-3.5 rounded-2xl border border-line bg-white p-3.5"
                >
                  <div className="size-16 shrink-0 overflow-hidden rounded-xl">
                    <Motif motif={example.motif} seed={19} />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium">{example.title}</p>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">
                      {example.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal>
          <CustomOrderForm />
        </Reveal>
      </div>

      <div className="mt-12 lg:hidden">
        <p className="font-sans text-[11px] font-semibold tracking-[0.16em] text-gold-deep uppercase">
          Things people have asked for
        </p>
        <div className="snap-rail mt-4 -mx-5 px-5">
          {examples.map((example) => (
            <div
              key={example.title}
              className="w-[74vw] max-w-xs rounded-2xl border border-line bg-white p-4"
            >
              <div className="h-24 overflow-hidden rounded-xl">
                <Motif motif={example.motif} seed={19} />
              </div>
              <p className="mt-3 text-[14px] font-medium">{example.title}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                {example.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Motif } from "@/components/Motif";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs, ButtonLink, SectionHeading } from "@/components/ui";
import { Award, Instagram, WhatsApp } from "@/components/icons";
import { processSteps } from "@/data/content";
import { site } from "@/data/site";
import { whatsappHello } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About Afni",
  description:
    "The story behind Art by Afni — a record-holding craft studio in Kerala making hampers, bouquets, frames and wedding stationery entirely by hand.",
  alternates: { canonical: "/about" },
};

const milestones = [
  {
    year: "2016",
    title: "A quilled frame for a friend",
    body: "It took two weeks and about four hundred paper coils. Three people at the wedding asked who had made it.",
  },
  {
    year: "2019",
    title: "The records",
    body: "Recognition from the India, Asia and International Book of Records for large-scale handcraft work.",
  },
  {
    year: "2021",
    title: "Hampers, and then everything else",
    body: "A single chocolate hamper posted on Instagram turned into a waiting list, and the studio stopped being a hobby.",
  },
  {
    year: "Today",
    title: "Over 1,400 pieces later",
    body: "Still one pair of hands, still nothing made before it is ordered — now shipping across the country.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-x py-8 lg:py-12">
      <Breadcrumbs trail={[{ href: "/", label: "Home" }, { label: "About" }]} />

      {/* Intro */}
      <div className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[12px] font-medium text-gold-deep">
            <Award size={14} />
            IBR · ABR · IB record holder
          </span>

          <h1 className="mt-5 text-[34px] leading-tight sm:text-5xl">
            One person, one bench, and a lot of paper.
          </h1>

          <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-muted">
            <p>
              Art by Afni is a craft studio in {site.location}. Everything sold
              here is cut, rolled, lettered, embroidered or packed by hand —
              usually the same pair of hands, which is why the lead times are
              honest and the batch sizes are small.
            </p>
            <p>
              It started with quilling: thin strips of coloured paper rolled
              into coils and set into shapes. That turned into frames, frames
              turned into shadow boxes, and somewhere along the way people
              began asking for hampers and bouquets and wedding stationery too.
            </p>
            <p>
              The work has been recognised by the India, Asia and International
              Book of Records, which was a good week. But the part that
              actually matters is a message on a Tuesday evening saying the box
              arrived and somebody cried.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={whatsappHello()} external variant="whatsapp">
              <WhatsApp size={17} />
              Say hello
            </ButtonLink>
            <ButtonLink
              href={site.socials.instagram}
              external
              variant="secondary"
            >
              <Instagram size={17} />
              {site.socials.instagramHandle}
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="overflow-hidden rounded-3xl ring-1 ring-line">
            <div className="aspect-3/4">
              <Motif motif="frame" seed={31} />
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-3xl ring-1 ring-line">
            <div className="aspect-3/4">
              <Motif motif="bouquet" seed={32} />
            </div>
          </div>
          <div className="-mt-4 overflow-hidden rounded-3xl ring-1 ring-line">
            <div className="aspect-square">
              <Motif motif="scroll" seed={33} />
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-3xl ring-1 ring-line">
            <div className="aspect-square">
              <Motif motif="hamper" seed={34} />
            </div>
          </div>
        </div>
      </div>

      {/* Numbers */}
      <section className="mt-20 rounded-3xl border border-line bg-shell/60 px-6 py-10 sm:px-10">
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Pieces made", value: "1,400+" },
            { label: "Years at the bench", value: "9" },
            { label: "Average rating", value: "4.9 / 5" },
            { label: "Records held", value: "3" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="text-[12px] tracking-wide text-muted uppercase">
                {stat.label}
              </dt>
              <dd className="mt-1 font-display text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Timeline */}
      <section className="mt-20">
        <SectionHeading eyebrow="How it got here" title="Nine years, roughly" />

        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((milestone, i) => (
            <Reveal as="li" key={milestone.year} delay={i * 80}>
              <div className="h-px w-full bg-line">
                <div className="h-px w-10 bg-gold" />
              </div>
              <p className="mt-4 font-display text-3xl text-gold-deep">
                {milestone.year}
              </p>
              <h3 className="mt-2 font-sans text-[15px] font-semibold">
                {milestone.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
                {milestone.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Process */}
      <section className="mt-20">
        <SectionHeading
          eyebrow="How an order runs"
          title="You are only involved in two of these"
          body="The rest happens at the bench, with photos sent through as it goes."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 70}
              className="rounded-2xl border border-line bg-white p-6"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-cream">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 overflow-hidden rounded-[32px] bg-ink px-6 py-14 text-center text-cream sm:px-12">
        <h2 className="text-[30px] leading-tight sm:text-4xl">
          Start with a message.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[15.5px] leading-relaxed text-cream/75">
          Tell me the occasion and the date. If it can be made by hand in the
          time you have, we will work out the rest together.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink href={whatsappHello()} external variant="whatsapp" size="lg">
            <WhatsApp size={18} />
            {site.whatsapp.display}
          </ButtonLink>
          <ButtonLink href="/shop" size="lg" variant="onDark">
            Browse the shop
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}

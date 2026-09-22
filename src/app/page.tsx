import Link from "next/link";
import { CustomiseTeaser } from "@/components/CustomiseTeaser";
import { Motif } from "@/components/Motif";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import {
  Award,
  Hand,
  Instagram,
  Sliders,
  Sparkle,
  Star,
  Truck,
  WhatsApp,
} from "@/components/icons";
import { ButtonLink, Rating, SectionHeading } from "@/components/ui";
import { galleryItems, processSteps, testimonials } from "@/data/content";
import {
  bestsellers,
  categories,
  featuredProducts,
  occasions,
  products,
} from "@/data/products";
import { promises, site } from "@/data/site";
import { cx } from "@/lib/format";
import { whatsappHello } from "@/lib/whatsapp";

const promiseIcons = { hand: Hand, sliders: Sliders, award: Award, truck: Truck };

export default function HomePage() {
  const featured = featuredProducts();
  const best = bestsellers();

  return (
    <>
      <Hero />
      <Promises />
      <Categories />
      <Featured products={featured} />
      <Customisation />
      <Occasions />
      <Process />
      <Bestsellers products={best} />
      <Testimonials />
      <GalleryPreview />
      <ClosingCta />
    </>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────── */

function Hero() {
  // Picked by hand so the three tiles never repeat a motif.
  const stack = ["hamper", "bouquet", "shadowbox"] as const;

  return (
    <section className="relative overflow-hidden">
      {/* warm wash behind the fold */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_18%_0%,#F7EADB_0%,transparent_58%),radial-gradient(70%_60%_at_100%_18%,#F6E4DF_0%,transparent_60%)]"
      />

      <div className="container-x grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-[12px] font-medium text-gold-deep">
            <Award size={14} />
            IBR · ABR · IB record holder
          </span>

          <h1 className="mt-6 text-[40px] leading-[1.04] sm:text-[54px] lg:text-[62px]">
            Gifts made by hand,
            <br />
            <span className="text-gold-deep italic">exactly</span> how you want
            them.
          </h1>

          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-muted sm:text-[17px]">
            Hampers, bouquets, shadow boxes and wedding stationery — built to
            order in {site.location}. Choose every colour, every extra and every
            word, and watch the price update as you go.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/shop" size="lg">
              Start customising
            </ButtonLink>
            <ButtonLink
              href={whatsappHello()}
              external
              variant="whatsapp"
              size="lg"
            >
              <WhatsApp size={18} />
              Chat on WhatsApp
            </ButtonLink>
          </div>

          <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <dt className="text-[12px] tracking-wide text-muted uppercase">
                Pieces made
              </dt>
              <dd className="font-display text-2xl">1,400+</dd>
            </div>
            <div className="hidden h-9 w-px bg-line sm:block" />
            <div>
              <dt className="text-[12px] tracking-wide text-muted uppercase">
                Average rating
              </dt>
              <dd className="flex items-center gap-1.5 font-display text-2xl">
                4.9
                <Star size={16} filled className="text-gold" />
              </dd>
            </div>
            <div className="hidden h-9 w-px bg-line sm:block" />
            <div>
              <dt className="text-[12px] tracking-wide text-muted uppercase">
                Delivered to
              </dt>
              <dd className="font-display text-2xl">All India</dd>
            </div>
          </dl>
        </div>

        {/* Overlapping tiles — a flat grid on phones so nothing gets cropped. */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:block lg:h-[520px]">
            <div className="col-span-2 overflow-hidden rounded-[24px] shadow-lift ring-1 ring-line lg:absolute lg:top-0 lg:right-0 lg:h-[330px] lg:w-[74%]">
              <div className="aspect-4/3 lg:h-full">
                <Motif motif={stack[0]} seed={1} />
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] shadow-lift ring-1 ring-line lg:absolute lg:bottom-0 lg:left-0 lg:h-[300px] lg:w-[52%]">
              <div className="aspect-square lg:h-full">
                <Motif motif={stack[1]} seed={2} />
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] shadow-lift ring-1 ring-line lg:absolute lg:right-6 lg:bottom-10 lg:h-[220px] lg:w-[40%]">
              <div className="aspect-square lg:h-full">
                <Motif motif={stack[2]} seed={5} />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-line bg-white/90 p-3.5 shadow-soft backdrop-blur-sm lg:absolute lg:top-[300px] lg:-left-4 lg:mt-0 lg:w-64 lg:animate-float-soft">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-deep">
              <Sparkle size={19} />
            </span>
            <p className="text-[13px] leading-snug">
              <span className="font-medium">Nothing sits on a shelf.</span>{" "}
              <span className="text-muted">
                Your piece is started after you order.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Promises ───────────────────────────────────────────────────────────── */

function Promises() {
  return (
    <section className="border-y border-line bg-white">
      <div className="container-x grid gap-x-8 gap-y-7 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:py-12">
        {promises.map((promise, i) => {
          const Icon = promiseIcons[promise.icon];
          return (
            <Reveal key={promise.title} delay={i * 70} className="flex gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-shell text-gold-deep">
                <Icon size={19} />
              </span>
              <div>
                <h3 className="font-sans text-[14.5px] font-semibold">
                  {promise.title}
                </h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                  {promise.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ── Categories ─────────────────────────────────────────────────────────── */

function Categories() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading
        eyebrow="What we make"
        title="Nine years of craft, in five collections"
        body="Every collection started as a one-off request from somebody who could not find what they wanted anywhere else."
        action={
          <ButtonLink href="/shop" variant="secondary">
            See everything
          </ButtonLink>
        }
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => (
          <Reveal
            key={category.id}
            delay={i * 60}
            className={cx(i === 0 && "sm:col-span-2 lg:col-span-1")}
          >
            <Link
              href={`/shop?category=${category.id}`}
              className="group relative block overflow-hidden rounded-3xl ring-1 ring-line transition-shadow hover:shadow-lift"
            >
              <div
                className={cx(
                  "relative",
                  i === 0 ? "aspect-3/2 lg:aspect-4/5" : "aspect-4/5",
                )}
              >
                <div className="h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                  <Motif motif={category.motif} seed={i + 7} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-display text-[22px]">{category.label}</h3>
                <p className="mt-1 max-w-xs text-[13.5px] leading-snug text-white/80">
                  {category.blurb}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-gold-soft">
                  Browse
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}

        <Reveal delay={320}>
          <Link
            href="/custom-order"
            className="group flex aspect-4/5 flex-col justify-between rounded-3xl border border-dashed border-gold/50 bg-gold-soft/35 p-6 transition hover:bg-gold-soft/60"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-white text-gold-deep shadow-soft">
              <Sparkle size={21} />
            </span>
            <div>
              <h3 className="font-display text-[22px]">
                Something else entirely
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                Most orders here start as a photo sent on WhatsApp. Describe
                what you have in mind and you will get a quote the same day.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-gold-deep">
                Request a custom order
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Featured ───────────────────────────────────────────────────────────── */

function Featured({ products: list }: { products: typeof products }) {
  return (
    <section className="bg-shell/50 py-16 lg:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Picked for you"
          title="The pieces people come back for"
          action={
            <ButtonLink href="/shop" variant="secondary">
              Shop all gifts
            </ButtonLink>
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4">
          {list.slice(0, 4).map((product, i) => (
            <Reveal key={product.slug} delay={i * 70}>
              <ProductCard product={product} index={i} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Customisation ──────────────────────────────────────────────────────── */

function Customisation() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading
        eyebrow="How customising works"
        title="No hidden extras, no quote by email"
        body="Pick your options and the total updates immediately. What you see is what the gift costs — delivery is added once we know where it is going."
      />
      <Reveal className="mt-10">
        <CustomiseTeaser slug="signature-chocolate-hamper" />
      </Reveal>
    </section>
  );
}

/* ── Occasions ──────────────────────────────────────────────────────────── */

function Occasions() {
  return (
    <section className="border-y border-line bg-white py-14">
      <div className="container-x">
        <SectionHeading eyebrow="Shop by occasion" title="What is it for?" />
        <div className="mt-7 flex flex-wrap gap-2.5">
          {occasions.map((occasion) => (
            <Link
              key={occasion.id}
              href={`/shop?occasion=${occasion.id}`}
              className="rounded-full border border-line bg-cream px-4 py-2.5 text-[14px] transition hover:border-gold hover:bg-gold-soft/50 hover:text-gold-deep"
            >
              {occasion.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Process ────────────────────────────────────────────────────────────── */

function Process() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading
        eyebrow="From tap to doorstep"
        title="Four steps, and you are only involved in two"
      />

      <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 80} className="relative">
            <span className="font-display text-5xl text-gold/30">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-display text-xl">{step.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ── Bestsellers ────────────────────────────────────────────────────────── */

function Bestsellers({ products: list }: { products: typeof products }) {
  return (
    <section className="bg-shell/50 py-16 lg:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Bestsellers"
          title="Ordered again and again"
          action={
            <ButtonLink href="/shop" variant="secondary">
              Shop all gifts
            </ButtonLink>
          }
        />
      </div>

      {/* Swipeable on phones, a plain grid once there is room. */}
      <div className="container-x mt-10 hidden gap-x-4 gap-y-9 lg:grid lg:grid-cols-4">
        {list.slice(0, 4).map((product, i) => (
          <Reveal key={product.slug} delay={i * 70}>
            <ProductCard product={product} index={i + 4} />
          </Reveal>
        ))}
      </div>

      <div className="snap-rail mt-10 px-5 lg:hidden">
        {list.map((product, i) => (
          <ProductCard
            key={product.slug}
            product={product}
            index={i + 4}
            className="w-[62vw] max-w-[260px]"
          />
        ))}
      </div>
    </section>
  );
}

/* ── Testimonials ───────────────────────────────────────────────────────── */

function Testimonials() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading
        eyebrow="In their words"
        title="What arrives, and how it lands"
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Reveal
            key={testimonial.name}
            delay={(i % 3) * 80}
            className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft"
          >
            <Rating value={testimonial.rating} size={15} />
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed">
              “{testimonial.body}”
            </blockquote>
            <footer className="mt-5 border-t border-line pt-4">
              <p className="text-[14px] font-medium">{testimonial.name}</p>
              <p className="text-[12.5px] text-muted">
                {testimonial.location} · {testimonial.product}
              </p>
            </footer>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Gallery preview ────────────────────────────────────────────────────── */

function GalleryPreview() {
  return (
    <section className="border-y border-line bg-white py-16 lg:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="From the studio"
          title="Recent work"
          body={`Everything here left the bench in the last few months. More of it, day by day, on ${site.socials.instagramHandle}.`}
          action={
            <ButtonLink
              href={site.socials.instagram}
              external
              variant="secondary"
            >
              <Instagram size={17} />
              Follow on Instagram
            </ButtonLink>
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {galleryItems.slice(0, 6).map((item, i) => (
            <Reveal key={item.id} delay={i * 50}>
              <Link
                href="/gallery"
                className="group block overflow-hidden rounded-2xl ring-1 ring-line"
              >
                <div className="aspect-square transition-transform duration-500 group-hover:scale-105">
                  <Motif motif={item.motif} seed={i + 11} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <ButtonLink href="/gallery" variant="secondary">
            See the full gallery
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ── Closing CTA ────────────────────────────────────────────────────────── */

function ClosingCta() {
  return (
    <section className="container-x py-16 lg:py-24">
      <div className="relative overflow-hidden rounded-[32px] bg-ink px-6 py-14 text-center text-cream sm:px-12 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(192,144,74,0.34),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-2xl">
          <p className="eyebrow text-gold">Have something in mind?</p>
          <h2 className="mt-4 text-[32px] leading-tight sm:text-5xl">
            Tell me what you are imagining.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15.5px] leading-relaxed text-cream/75">
            Send a reference photo, a budget and the date you need it by. You
            will get an honest answer about whether it can be made, and what it
            will cost, usually the same day.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href={whatsappHello()}
              external
              variant="whatsapp"
              size="lg"
            >
              <WhatsApp size={18} />
              {site.whatsapp.display}
            </ButtonLink>
            <ButtonLink
              href="/custom-order"
              size="lg"
              variant="onDark"
            >
              Fill in the custom order form
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

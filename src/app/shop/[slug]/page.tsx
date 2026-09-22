import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Customiser } from "@/components/Customiser";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";
import { Badge, Breadcrumbs, Rating, SectionHeading } from "@/components/ui";
import { Check, Clock, Hand, Truck } from "@/components/icons";
import {
  categories,
  getProduct,
  products,
  relatedProducts,
} from "@/data/products";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { fromPrice } from "@/lib/pricing";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return { title: "Gift not found" };

  return {
    title: product.name,
    description: `${product.tagline}. ${product.description.slice(0, 120)}…`,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: `${product.name} · ${site.name}`,
      description: product.tagline,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const category = categories.find((c) => c.id === product.category);
  const related = relatedProducts(product);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: site.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: fromPrice(product),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Extra room on phones for the sticky total bar. */}
      <div className="container-x py-6 pb-32 lg:py-10 lg:pb-0">
        <Breadcrumbs
          trail={[
            { href: "/", label: "Home" },
            { href: "/shop", label: "Shop" },
            ...(category
              ? [{ href: `/shop?category=${category.id}`, label: category.label }]
              : []),
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Visual column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[28px] ring-1 ring-line">
              <div className="aspect-4/5 sm:aspect-square lg:aspect-4/5">
                <ProductImage
                  images={product.images}
                  motif={product.motif}
                  alt={product.name}
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            </div>

            <ul className="mt-4 grid grid-cols-3 gap-2.5">
              {[
                { icon: Hand, label: "Handmade to order" },
                { icon: Clock, label: product.leadTime.replace("Ready in ", "") },
                { icon: Truck, label: "Ships across India" },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-white px-2 py-3 text-center"
                >
                  <item.icon size={17} className="text-gold-deep" />
                  <span className="text-[11.5px] leading-tight text-muted">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detail + customiser column */}
          <div>
            <div className="flex flex-wrap gap-1.5">
              {product.bestseller ? <Badge tone="ink">Bestseller</Badge> : null}
              {product.newArrival ? <Badge tone="sage">New</Badge> : null}
              {category ? <Badge tone="outline">{category.label}</Badge> : null}
            </div>

            <h1 className="mt-3.5 text-[32px] leading-tight sm:text-[40px]">
              {product.name}
            </h1>
            <p className="mt-1.5 text-[16px] text-muted italic">
              {product.tagline}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Rating value={product.rating} count={product.reviewCount} size={16} />
              <span className="text-[13.5px] text-muted">{product.leadTime}</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl tabular-nums">
                {formatPrice(fromPrice(product))}
              </span>
              {product.compareAtPrice ? (
                <span className="text-[16px] text-muted line-through tabular-nums">
                  {formatPrice(product.compareAtPrice)}
                </span>
              ) : null}
              <span className="text-[13px] text-muted">
                {product.minQuantity ? "per card, before options" : "before options"}
              </span>
            </div>

            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
              {product.description}
            </p>

            <div className="hairline my-8" />

            <Customiser product={product} />

            <div className="hairline my-8" />

            <section>
              <h2 className="font-sans text-[13px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
                Good to know
              </h2>
              <ul className="mt-4 space-y-2.5">
                {product.details.map((detail) => (
                  <li key={detail} className="flex gap-2.5 text-[14.5px] leading-relaxed">
                    <Check size={16} className="mt-1 shrink-0 text-gold" />
                    <span className="text-muted">{detail}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
                Something you want that is not listed?{" "}
                <Link
                  href="/custom-order"
                  className="text-ink underline decoration-gold underline-offset-4"
                >
                  Ask for it
                </Link>{" "}
                — most pieces here began as a request.
              </p>
            </section>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="container-x mt-16 pb-4 lg:mt-24">
          <SectionHeading eyebrow="You may also like" title="Pairs well with this" />
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 60}>
                <ProductCard product={item} index={i + 13} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ButtonLink } from "@/components/ui";
import { WhatsApp } from "@/components/icons";
import { getPolicy, policies } from "@/data/policies";
import { cx } from "@/lib/format";
import { whatsappHello } from "@/lib/whatsapp";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return { title: "Policy not found" };

  return {
    title: policy.title,
    description: policy.summary,
    alternates: { canonical: `/policies/${policy.slug}` },
  };
}

export default async function PolicyPage({ params }: Params) {
  const { slug } = await params;
  const policy = getPolicy(slug);

  if (!policy) notFound();

  return (
    <div className="container-x py-8 lg:py-12">
      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/policies/shipping", label: "Policies" },
          { label: policy.title },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-sans text-[11px] font-semibold tracking-[0.16em] text-gold-deep uppercase">
            Policies
          </p>
          <nav className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-0.5 lg:px-0">
            {policies.map((item) => (
              <Link
                key={item.slug}
                href={`/policies/${item.slug}`}
                aria-current={item.slug === policy.slug ? "page" : undefined}
                className={cx(
                  "shrink-0 rounded-full px-3.5 py-2 text-[14px] transition lg:-ml-3.5 lg:w-full",
                  item.slug === policy.slug
                    ? "bg-ink text-cream lg:bg-shell lg:font-medium lg:text-ink"
                    : "border border-line bg-white text-muted hover:text-ink lg:border-0 lg:bg-transparent lg:hover:bg-shell",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>

        <article className="max-w-2xl">
          <h1 className="text-[32px] leading-tight sm:text-[42px]">
            {policy.title}
          </h1>
          <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
            {policy.summary}
          </p>
          <p className="mt-3 text-[13px] text-muted">
            Last updated {policy.updated}
          </p>

          <div className="hairline my-8" />

          <div className="space-y-9">
            {policy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-[22px]">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-[15px] leading-relaxed text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-line bg-shell/60 p-6">
            <h2 className="font-display text-xl">Not covered here?</h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
              Ask directly. Every message is read by Afni, and a straight answer
              beats reading policy text.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href={whatsappHello()} external variant="whatsapp">
                <WhatsApp size={17} />
                Ask on WhatsApp
              </ButtonLink>
              <ButtonLink href="/faq" variant="secondary">
                Read the FAQ
              </ButtonLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

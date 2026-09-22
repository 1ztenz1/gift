import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumbs } from "@/components/ui";
import { Clock, Instagram, Mail, MapPin, WhatsApp } from "@/components/icons";
import { site } from "@/data/site";
import { whatsappHello } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach Art by Afni on WhatsApp at ${site.whatsapp.display}, by email, or on Instagram.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    {
      icon: WhatsApp,
      title: "WhatsApp",
      value: site.whatsapp.display,
      body: "The fastest way, and how every order is confirmed. Usually a reply within a few hours.",
      href: whatsappHello(),
      external: true,
      accent: "text-[#1FA855]",
    },
    {
      icon: Mail,
      title: "Email",
      value: site.email,
      body: "Better for bulk enquiries, invoices and anything with attachments.",
      href: `mailto:${site.email}`,
      external: false,
      accent: "text-gold-deep",
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: site.socials.instagramHandle,
      body: "New work goes up here first. DMs are open, though WhatsApp is quicker.",
      href: site.socials.instagram,
      external: true,
      accent: "text-rose",
    },
  ];

  return (
    <div className="container-x py-8 lg:py-12">
      <Breadcrumbs
        trail={[{ href: "/", label: "Home" }, { label: "Contact" }]}
      />

      <header className="mt-5 max-w-2xl">
        <h1 className="text-[34px] leading-tight sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          Questions about an order, a custom piece, a bulk enquiry, or just
          whether something is possible — all of it comes to the same place.
        </p>
      </header>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {channels.map((channel) => (
          <a
            key={channel.title}
            href={channel.href}
            {...(channel.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group rounded-2xl border border-line bg-white p-5 transition hover:border-gold hover:shadow-soft"
          >
            <span
              className={`flex size-11 items-center justify-center rounded-full bg-shell ${channel.accent}`}
            >
              <channel.icon size={20} />
            </span>
            <h2 className="mt-4 font-sans text-[13px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
              {channel.title}
            </h2>
            <p className="mt-1.5 text-[16px] font-medium transition group-hover:text-gold-deep">
              {channel.value}
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
              {channel.body}
            </p>
          </a>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <ContactForm />

        <aside className="space-y-4">
          <div className="rounded-2xl border border-line bg-shell/60 p-6">
            <h2 className="font-display text-xl">Studio details</h2>
            <ul className="mt-4 space-y-3.5 text-[14.5px]">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold-deep" />
                <span>
                  <span className="block font-medium">Based in</span>
                  <span className="text-muted">{site.location}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-gold-deep" />
                <span>
                  <span className="block font-medium">Replying</span>
                  <span className="text-muted">{site.hours}</span>
                </span>
              </li>
            </ul>
            <p className="mt-5 text-[13px] leading-relaxed text-muted">
              There is no walk-in shop. Everything is made to order and sent out
              by courier, {site.shipsTo.toLowerCase()}.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="font-display text-xl">Before you write</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              Lead times, delivery, cancellations and care are all covered in
              the FAQ — it might be faster than waiting for a reply.
            </p>
            <Link
              href="/faq"
              className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink underline decoration-gold underline-offset-4"
            >
              Read the FAQ
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="rounded-2xl border border-dashed border-gold/50 bg-gold-soft/35 p-6">
            <h2 className="font-display text-xl">Bulk & corporate</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              From ten pieces the pricing changes. Send your quantity, budget
              and the date, and you will get a quote the same day.
            </p>
            <a
              href={whatsappHello("bulk orders")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-gold-deep underline decoration-gold underline-offset-4"
            >
              Ask about bulk pricing
              <span aria-hidden>→</span>
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

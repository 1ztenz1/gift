import Link from "next/link";
import { footerNav, site } from "@/data/site";
import { whatsappHello } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { Clock, Instagram, Mail, MapPin, WhatsApp } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-shell/50">
      <div className="container-x py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Logo className="size-11" />
              <div>
                <p className="font-display text-xl">{site.name}</p>
                <p className="text-[12px] tracking-[0.18em] text-muted uppercase">
                  Handcrafted gifting
                </p>
              </div>
            </div>

            <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
              {site.description}
            </p>

            <ul className="mt-6 space-y-2.5 text-[14px]">
              <li>
                <a
                  href={whatsappHello()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition hover:text-gold-deep"
                >
                  <WhatsApp size={16} className="text-[#1FA855]" />
                  {site.whatsapp.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 transition hover:text-gold-deep"
                >
                  <Mail size={16} className="text-muted" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition hover:text-gold-deep"
                >
                  <Instagram size={16} className="text-muted" />
                  {site.socials.instagramHandle}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-muted">
                <MapPin size={16} />
                {site.location}
              </li>
              <li className="inline-flex items-center gap-2.5 text-muted">
                <Clock size={16} />
                {site.hours}
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((column) => (
              <div key={column.title}>
                <h3 className="font-sans text-[11px] font-semibold tracking-[0.16em] text-gold-deep uppercase">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-muted transition hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <p className="text-[13px] text-muted">
            © {year} {site.name}. Every piece made by hand in {site.location}.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {site.credentials.map((credential) => (
              <li
                key={credential.short}
                className="rounded-full border border-line bg-white/70 px-3 py-1 text-[11px] tracking-wide text-muted"
                title={credential.full}
              >
                {credential.full}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

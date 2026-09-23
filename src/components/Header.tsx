"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav, site } from "@/data/site";
import { useCart } from "@/lib/cart";
import { cx, formatPrice } from "@/lib/format";
import { whatsappHello } from "@/lib/whatsapp";
import { Bag, Instagram, Menu, WhatsApp, X } from "./icons";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const { count, ready, openBag } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // A tapped link should never leave the panel hanging open behind the new
  // page. Adjusting during render beats an effect: the menu is gone in the
  // same commit as the new route, with no flash of the old panel.
  if (menuOpen && menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div className="bg-ink text-cream">
        <div className="container-x flex h-9 items-center justify-center gap-2 text-[11.5px] tracking-wide">
          <span className="hidden sm:inline">
            Handmade to order in {site.location}
          </span>
          <span aria-hidden className="hidden text-gold sm:inline">
            ·
          </span>
          <span>
            Free delivery on orders over {formatPrice(site.freeDeliveryOver)}
          </span>
        </div>
      </div>

      <header
        className={cx(
          "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
          scrolled
            ? "border-b border-line bg-cream/88 shadow-soft backdrop-blur-md"
            : "border-b border-transparent bg-cream",
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-ml-2 flex size-10 items-center justify-center rounded-full text-ink transition hover:bg-shell lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={22} />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2.5 lg:gap-3"
            aria-label={`${site.name} — home`}
          >
            <Logo className="size-9 lg:size-10" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[19px] tracking-tight lg:text-[21px]">
                {site.name}
              </span>
              <span className="mt-1 hidden text-[10px] tracking-[0.2em] text-muted uppercase sm:block">
                Handcrafted gifting
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "relative rounded-full px-3.5 py-2 text-[14px] transition-colors",
                  isActive(link.href)
                    ? "text-ink"
                    : "text-muted hover:text-ink",
                )}
              >
                {link.label}
                {isActive(link.href) ? (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gold" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-10 items-center justify-center rounded-full text-muted transition hover:bg-shell hover:text-ink sm:flex"
              aria-label={`Instagram — ${site.socials.instagramHandle}`}
            >
              <Instagram size={19} />
            </a>

            <a
              href={whatsappHello()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-2 rounded-full bg-[#1FA855] px-4 text-[13.5px] font-medium text-white transition hover:bg-[#188C46] lg:inline-flex"
            >
              <WhatsApp size={17} />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={openBag}
              className="relative -mr-2 flex size-10 items-center justify-center rounded-full text-ink transition hover:bg-shell"
              aria-label={`Open bag${ready && count ? `, ${count} items` : ""}`}
            >
              <Bag size={21} />
              {ready && count > 0 ? (
                <span className="absolute top-1 right-1 flex min-w-[17px] items-center justify-center rounded-full bg-gold px-1 text-[10px] leading-[17px] font-bold text-white tabular-nums">
                  {count > 99 ? "99+" : count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <MobileMenu onClose={() => setMenuOpen(false)} isActive={isActive} />
      ) : null}
    </>
  );
}

function MobileMenu({
  onClose,
  isActive,
}: {
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const links = [{ href: "/", label: "Home" }, ...primaryNav];

  return (
    <div className="fixed inset-0 z-60 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 animate-fade-in bg-ink/35 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close menu"
        tabIndex={-1}
      />

      <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm animate-slide-in-left flex-col bg-cream shadow-lift">
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <span className="font-display text-xl">{site.name}</span>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 flex size-10 items-center justify-center rounded-full transition hover:bg-shell"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cx(
                "flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-[22px] transition",
                isActive(link.href)
                  ? "bg-shell text-ink"
                  : "text-ink/80 hover:bg-shell",
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="hairline my-4" />

          <Link
            href="/faq"
            className="block rounded-xl px-4 py-2.5 text-[15px] text-muted transition hover:bg-shell"
          >
            FAQ
          </Link>
          <Link
            href="/policies/shipping"
            className="block rounded-xl px-4 py-2.5 text-[15px] text-muted transition hover:bg-shell"
          >
            Shipping & delivery
          </Link>
        </nav>

        <div className="space-y-2 border-t border-line p-4">
          <a
            href={whatsappHello()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#1FA855] font-medium text-white"
          >
            <WhatsApp size={18} />
            Chat on WhatsApp
          </a>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-line font-medium"
          >
            <Instagram size={18} />
            {site.socials.instagramHandle}
          </a>
        </div>
      </div>
    </div>
  );
}

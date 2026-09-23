"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { primaryNav } from "@/data/site";
import { cx } from "@/lib/format";

/**
 * Section links as a swipeable row under the header, on phones only.
 *
 * The desktop nav is display:none below lg, which left the hamburger as the
 * only way to reach Shop, Custom Order, Gallery, About and Contact. This puts
 * them back on screen without costing a tap.
 *
 * Deliberately not sticky: the shop page already pins a search/filter bar
 * directly under the header, and two stacked sticky rows eat most of a phone
 * screen. The bottom tab bar covers persistent navigation instead.
 */

const links = [{ href: "/", label: "Home" }, ...primaryNav, { href: "/faq", label: "FAQ" }];

export function MobileNavStrip() {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Bring the current section into view, so landing on Contact does not look
  // like nothing is selected.
  useEffect(() => {
    activeRef.current?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "auto",
    });
  }, [pathname]);

  return (
    <div className="relative border-b border-line bg-cream lg:hidden">
      <nav aria-label="Sections" className="no-scrollbar overflow-x-auto">
        <ul className="flex w-max items-center gap-2 px-5 py-2.5">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  ref={active ? activeRef : undefined}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "block rounded-full border px-3.5 py-1.5 text-[13.5px] whitespace-nowrap transition-colors",
                    active
                      ? "border-ink bg-ink text-cream"
                      : "border-line bg-white text-muted",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Fade hints that the row keeps going. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cream to-transparent"
      />
    </div>
  );
}

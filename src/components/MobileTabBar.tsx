"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { cx } from "@/lib/format";
import { whatsappHello } from "@/lib/whatsapp";
import { Bag, Grid, Home, Sparkle, WhatsApp } from "./icons";

/**
 * Thumb-reach navigation for phones. WhatsApp sits in the middle because it
 * is how orders actually get placed.
 *
 * The chat button stays inside the bar rather than floating above it: the
 * product page pins its own total/add-to-bag bar directly on top, and a
 * raised button would punch through it.
 */
export function MobileTabBar() {
  const pathname = usePathname();
  const { count, ready, openBag } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const tab = (active: boolean) =>
    cx(
      "flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-1 text-[10.5px] font-medium transition-colors",
      active ? "text-ink" : "text-muted",
    );

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-cream/94 backdrop-blur-lg lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Quick navigation"
    >
      <div className="mx-auto flex h-16 max-w-lg items-stretch px-1">
        <Link href="/" className={tab(isActive("/"))}>
          <Home size={21} />
          Home
        </Link>

        <Link href="/shop" className={tab(isActive("/shop"))}>
          <Grid size={21} />
          Shop
        </Link>

        <a
          href={whatsappHello()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-1 text-[10.5px] font-medium text-[#1FA855]"
          aria-label="Chat on WhatsApp"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-[#1FA855] text-white">
            <WhatsApp size={17} />
          </span>
          Chat
        </a>

        <Link href="/custom-order" className={tab(isActive("/custom-order"))}>
          <Sparkle size={21} />
          Custom
        </Link>

        <button
          type="button"
          onClick={openBag}
          className={cx(tab(false), "relative")}
          aria-label={`Open bag${ready && count ? `, ${count} items` : ""}`}
        >
          <span className="relative">
            <Bag size={21} />
            {ready && count > 0 ? (
              <span className="absolute -top-1.5 -right-2 flex min-w-[16px] items-center justify-center rounded-full bg-gold px-1 text-[9.5px] leading-4 font-bold text-white tabular-nums">
                {count > 9 ? "9+" : count}
              </span>
            ) : null}
          </span>
          Bag
        </button>
      </div>
    </nav>
  );
}

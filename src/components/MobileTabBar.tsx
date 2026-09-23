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
 * Every item is the same box: a fixed 24px icon slot above a label, in a
 * five-column grid. Chat is set apart by colour alone — when it had a larger
 * icon, its label sat several pixels below the other four and the row read as
 * crooked.
 *
 * The chat button also stays inside the bar rather than floating above it:
 * the product page pins its own total/add-to-bag bar directly on top, and a
 * raised button would punch through it.
 */
export function MobileTabBar() {
  const pathname = usePathname();
  const { count, ready, openBag } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-cream/95 backdrop-blur-lg lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Quick navigation"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        <TabItem href="/" label="Home" active={isActive("/")}>
          <Home size={21} />
        </TabItem>

        <TabItem href="/shop" label="Shop" active={isActive("/shop")}>
          <Grid size={21} />
        </TabItem>

        <TabItem
          href={whatsappHello()}
          label="Chat"
          external
          tone="whatsapp"
          ariaLabel="Chat on WhatsApp"
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-[#1FA855] text-white">
            <WhatsApp size={14} />
          </span>
        </TabItem>

        <TabItem
          href="/custom-order"
          label="Custom"
          active={isActive("/custom-order")}
        >
          <Sparkle size={21} />
        </TabItem>

        <TabItem
          label="Bag"
          onClick={openBag}
          badge={ready && count > 0 ? count : undefined}
          ariaLabel={`Open bag${ready && count ? `, ${count} items` : ""}`}
        >
          <Bag size={21} />
        </TabItem>
      </ul>
    </nav>
  );
}

function TabItem({
  href,
  label,
  children,
  active = false,
  external = false,
  onClick,
  badge,
  tone = "default",
  ariaLabel,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
  active?: boolean;
  external?: boolean;
  onClick?: () => void;
  badge?: number;
  tone?: "default" | "whatsapp";
  ariaLabel?: string;
}) {
  // One shared box for every tab, so all five labels land on one baseline.
  const inner = (
    <>
      <span className="relative flex h-6 items-center justify-center">
        {children}
        {badge !== undefined ? (
          <span className="absolute -top-1 -right-2.5 flex min-w-[16px] items-center justify-center rounded-full bg-gold px-1 text-[9.5px] leading-[16px] font-bold text-white tabular-nums">
            {badge > 9 ? "9+" : badge}
          </span>
        ) : null}
      </span>
      <span className="text-[10.5px] leading-none">{label}</span>
    </>
  );

  const className = cx(
    "flex h-16 w-full flex-col items-center justify-center gap-1.5 font-medium transition-colors",
    tone === "whatsapp"
      ? "text-[#1A8B47]"
      : active
        ? "text-ink"
        : "text-muted hover:text-ink",
  );

  return (
    <li className="contents">
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className={className}
          aria-label={ariaLabel}
        >
          {inner}
        </button>
      ) : external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          aria-label={ariaLabel}
        >
          {inner}
        </a>
      ) : (
        <Link
          href={href ?? "/"}
          className={className}
          aria-current={active ? "page" : undefined}
        >
          {inner}
        </Link>
      )}
    </li>
  );
}

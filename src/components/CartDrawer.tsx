"use client";

import Link from "next/link";
import { site } from "@/data/site";
import { useCart, type ResolvedItem } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { Button, ButtonLink } from "./ui";
import { Bag, Minus, Plus, Trash, X } from "./icons";

export function CartDrawer() {
  const { isOpen, closeBag, resolved, subtotal, count } = useCart();

  if (!isOpen) return null;

  const toFreeDelivery = site.freeDeliveryOver - subtotal;
  const progress = Math.min(100, (subtotal / site.freeDeliveryOver) * 100);

  return (
    <div
      className="fixed inset-y-0 left-0 z-70 w-screen"
      role="dialog"
      aria-modal="true"
      aria-label="Your bag"
    >
      <button
        type="button"
        className="absolute inset-0 animate-fade-in bg-ink/40 backdrop-blur-[2px]"
        onClick={closeBag}
        aria-label="Close bag"
        tabIndex={-1}
      />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slide-in-right flex-col bg-cream shadow-lift">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <h2 className="font-display text-xl">
            Your bag
            {count > 0 ? (
              <span className="ml-2 text-[13px] font-sans text-muted">
                {count} {count === 1 ? "item" : "items"}
              </span>
            ) : null}
          </h2>
          <button
            type="button"
            onClick={closeBag}
            className="-mr-2 flex size-10 items-center justify-center rounded-full transition hover:bg-shell"
            aria-label="Close bag"
          >
            <X size={22} />
          </button>
        </div>

        {resolved.length === 0 ? (
          <EmptyBag onClose={closeBag} />
        ) : (
          <>
            <div className="shrink-0 border-b border-line bg-shell/60 px-5 py-3">
              {toFreeDelivery > 0 ? (
                <p className="text-[13px] text-muted">
                  <span className="font-medium text-ink">
                    {formatPrice(toFreeDelivery)}
                  </span>{" "}
                  more for free delivery
                </p>
              ) : (
                <p className="text-[13px] font-medium text-leaf">
                  Free delivery unlocked
                </p>
              )}
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-sand">
                <div
                  className="h-full rounded-full bg-gold transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {resolved.map((item) => (
                <BagLine key={item.id} item={item} />
              ))}
            </ul>

            <div className="shrink-0 space-y-3 border-t border-line bg-white px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <div className="flex items-baseline justify-between">
                <span className="text-[15px]">Subtotal</span>
                <span className="font-display text-2xl tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[12px] leading-relaxed text-muted">
                Delivery is quoted separately once we know the address. You
                confirm everything on WhatsApp before paying.
              </p>
              <ButtonLink
                href="/checkout"
                size="lg"
                className="w-full"
                onClick={closeBag}
              >
                Continue to checkout
              </ButtonLink>
              <Button
                variant="ghost"
                className="w-full text-muted"
                onClick={closeBag}
              >
                Keep browsing
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function EmptyBag({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-shell text-gold-deep">
        <Bag size={28} />
      </span>
      <div>
        <p className="font-display text-xl">Nothing in here yet</p>
        <p className="mt-1.5 text-[14px] text-muted">
          Pick a gift, make it yours, and it will show up here.
        </p>
      </div>
      <ButtonLink href="/shop" onClick={onClose}>
        Browse the shop
      </ButtonLink>
    </div>
  );
}

function BagLine({ item }: { item: ResolvedItem }) {
  const { updateQuantity, remove } = useCart();
  const min = item.product.minQuantity ?? 1;
  const step = min > 1 ? min : 1;

  return (
    <li className="flex gap-3.5 py-4">
      <Link
        href={`/shop/${item.product.slug}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-shell ring-1 ring-line"
      >
        <ProductImage
          images={item.product.images}
          motif={item.product.motif}
          alt={item.product.name}
          sizes="80px"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/shop/${item.product.slug}`}
            className="text-[14.5px] leading-snug font-medium hover:text-gold-deep"
          >
            {item.product.name}
          </Link>
          <button
            type="button"
            onClick={() => remove(item.id)}
            className="-mt-1 -mr-1 flex size-7 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-blush hover:text-[#9B4A50]"
            aria-label={`Remove ${item.product.name}`}
          >
            <Trash size={15} />
          </button>
        </div>

        {item.price.lines.length > 0 ? (
          <ul className="mt-1 space-y-0.5 text-[12px] leading-relaxed text-muted">
            {item.price.lines.map((line) => (
              <li key={line.groupId} className="line-clamp-1">
                <span className="text-muted/70">{line.groupLabel}:</span>{" "}
                {line.value}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center rounded-full border border-line bg-white">
            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  item.id,
                  item.quantity - step < min ? 0 : item.quantity - step,
                )
              }
              className="flex size-8 items-center justify-center rounded-full text-muted transition hover:text-ink"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="min-w-8 text-center text-[13px] font-medium tabular-nums">
              {item.price.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + step)}
              className="flex size-8 items-center justify-center rounded-full text-muted transition hover:text-ink"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <span className="text-[14.5px] font-medium tabular-nums">
            {formatPrice(item.price.total)}
          </span>
        </div>
      </div>
    </li>
  );
}

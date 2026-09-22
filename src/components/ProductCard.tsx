import Link from "next/link";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { fromPrice } from "@/lib/pricing";
import { ProductImage } from "./ProductImage";
import { Badge, Rating } from "./ui";
import { Sliders } from "./icons";

export function ProductCard({
  product,
  index = 0,
  priority = false,
  className,
}: {
  product: Product;
  index?: number;
  priority?: boolean;
  className?: string;
}) {
  const start = fromPrice(product);

  return (
    <article className={className}>
      <Link
        href={`/shop/${product.slug}`}
        className="group block focus-visible:outline-none"
      >
        <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-shell ring-1 ring-line/70 transition-shadow duration-300 group-hover:shadow-lift group-focus-visible:ring-2 group-focus-visible:ring-gold">
          <div className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
            <ProductImage
              images={product.images}
              motif={product.motif}
              alt={product.name}
              seed={index}
              priority={priority}
            />
          </div>

          <div className="pointer-events-none absolute inset-x-3 top-3 flex flex-wrap gap-1.5">
            {product.bestseller ? <Badge tone="ink">Bestseller</Badge> : null}
            {product.newArrival ? <Badge tone="sage">New</Badge> : null}
            {product.compareAtPrice ? <Badge tone="rose">Offer</Badge> : null}
          </div>

          {/* A compact pill on touch, where hover never fires; it grows into a
              full bar on hover for pointer users. */}
          <div className="pointer-events-none absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-white/92 px-2.5 py-1.5 text-[11.5px] font-medium text-ink shadow-soft backdrop-blur-sm transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <Sliders size={13} className="text-gold-deep" />
            {product.optionGroups.length} to customise
          </div>
        </div>

        <div className="mt-3.5">
          {/* The name gets the full width — a price beside it squeezed long
              names onto a third line and broke the row's alignment. */}
          <h3 className="line-clamp-2 min-h-[2.7em] text-[15px] leading-snug font-medium transition-colors group-hover:text-gold-deep sm:text-[16.5px]">
            {product.name}
          </h3>

          <p className="mt-1 line-clamp-1 text-[12.5px] text-muted">
            {product.tagline}
          </p>

          <div className="mt-2 flex items-baseline justify-between gap-2">
            <p className="text-[15px] font-medium tabular-nums">
              {formatPrice(start)}
              {product.minQuantity ? (
                <span className="ml-1 text-[11px] font-normal text-muted">
                  per card
                </span>
              ) : null}
            </p>
            <span className="text-[11.5px] text-muted">{product.leadTime}</span>
          </div>

          <Rating
            value={product.rating}
            count={product.reviewCount}
            className="mt-1.5"
          />
        </div>
      </Link>
    </article>
  );
}

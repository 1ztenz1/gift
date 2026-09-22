import Image from "next/image";
import { Motif } from "./Motif";
import type { Motif as MotifId } from "@/data/types";
import { cx } from "@/lib/format";

/**
 * Renders real photography when a product has any, and the illustrated
 * tile when it does not. Drop files into /public/images/products and list
 * them on the product to switch a card over.
 */
export function ProductImage({
  images,
  motif,
  alt,
  seed = 0,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw",
  className,
}: {
  images: string[];
  motif: MotifId;
  alt: string;
  seed?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const photo = images[0];

  return (
    <div className={cx("relative h-full w-full overflow-hidden", className)}>
      {photo ? (
        <Image
          src={photo}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Motif motif={motif} seed={seed} />
      )}
    </div>
  );
}

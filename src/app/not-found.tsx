import { Motif } from "@/components/Motif";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center py-20 text-center lg:py-32">
      <div className="size-36 overflow-hidden rounded-3xl ring-1 ring-line">
        <Motif motif="envelope" seed={41} />
      </div>

      <p className="eyebrow mt-8">Error 404</p>
      <h1 className="mt-3 text-[34px] leading-tight sm:text-5xl">
        This one never made it to the bench
      </h1>
      <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-muted">
        The page you were after has moved or never existed. The shop is still
        where you left it.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/shop" size="lg">
          Browse the shop
        </ButtonLink>
        <ButtonLink href="/" variant="secondary" size="lg">
          Back home
        </ButtonLink>
      </div>
    </div>
  );
}

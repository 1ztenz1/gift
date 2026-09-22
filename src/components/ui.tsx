import Link from "next/link";
import { cx } from "@/lib/format";
import { Star } from "./icons";

/* ── Button ─────────────────────────────────────────────────────────────── */

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "onDark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-cream hover:bg-[#3a3029] active:bg-[#1b1613] shadow-soft",
  secondary:
    "bg-white text-ink border border-line hover:border-gold hover:bg-shell",
  ghost: "text-ink hover:bg-shell",
  whatsapp: "bg-[#1FA855] text-white hover:bg-[#188C46] shadow-soft",
  onDark:
    "border border-cream/25 bg-transparent text-cream hover:bg-cream/10 hover:border-cream/40",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-[15px] gap-2.5",
};

const buttonBase =
  "inline-flex items-center justify-center rounded-full font-medium tracking-tight transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 whitespace-nowrap";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={cx(buttonBase, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  href: string;
  external?: boolean;
}) {
  const classes = cx(buttonBase, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      />
    );
  }

  return <Link href={href} className={classes} {...props} />;
}

/* ── Badge ──────────────────────────────────────────────────────────────── */

const badgeTones = {
  gold: "bg-gold-soft text-gold-deep",
  rose: "bg-blush text-[#9B4A50]",
  sage: "bg-[#E4EAE2] text-leaf",
  ink: "bg-ink text-cream",
  outline: "border border-line text-muted bg-white/70",
} as const;

export function Badge({
  tone = "gold",
  className,
  children,
}: {
  tone?: keyof typeof badgeTones;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ── Section heading ────────────────────────────────────────────────────── */

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center",
      )}
    >
      <div className={cx("max-w-2xl", align === "center" && "text-center")}>
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h2 className="text-[28px] leading-[1.15] sm:text-4xl">{title}</h2>
        {body ? (
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{body}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* ── Rating ─────────────────────────────────────────────────────────────── */

export function Rating({
  value,
  count,
  size = 14,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cx("inline-flex items-center gap-1.5", className)}>
      <span className="flex text-gold" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={size} filled={i <= Math.round(value)} />
        ))}
      </span>
      <span className="text-[13px] text-muted">
        {value.toFixed(1)}
        {count !== undefined ? ` (${count})` : ""}
      </span>
      <span className="sr-only">
        Rated {value.toFixed(1)} out of 5
        {count !== undefined ? ` from ${count} reviews` : ""}
      </span>
    </span>
  );
}

/* ── Breadcrumbs ────────────────────────────────────────────────────────── */

export function Breadcrumbs({
  trail,
}: {
  trail: { href?: string; label: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-1.5">
            {crumb.href ? (
              <Link href={crumb.href} className="transition hover:text-ink">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-ink">{crumb.label}</span>
            )}
            {i < trail.length - 1 ? (
              <span aria-hidden className="text-line">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

import { cx } from "@/lib/format";

/** Monogram: a petalled bloom with an "A" cut through the centre. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cx("shrink-0", className)}
      role="img"
      aria-label="Art by Afni"
    >
      <circle cx="24" cy="24" r="23" fill="#241E1A" />
      <g
        stroke="#C0904A"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      >
        <circle cx="24" cy="24" r="18.5" />
        <path d="M24 9.5c4 3.4 4 7.6 0 11-4-3.4-4-7.6 0-11Z" />
        <path d="M38.5 24c-3.4 4-7.6 4-11 0 3.4-4 7.6-4 11 0Z" />
        <path d="M24 38.5c-4-3.4-4-7.6 0-11 4 3.4 4 7.6 0 11Z" />
        <path d="M9.5 24c3.4-4 7.6-4 11 0-3.4 4-7.6 4-11 0Z" />
      </g>
      <path
        d="M17.8 31.5 24 15.8l6.2 15.7M20.4 26.4h7.2"
        stroke="#FDFAF6"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

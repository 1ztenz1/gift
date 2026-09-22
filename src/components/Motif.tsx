import type { Motif as MotifId } from "@/data/types";
import { cx } from "@/lib/format";

/**
 * Illustrated stand-in for product photography.
 *
 * Inline SVG costs no network request, so cards paint instantly and the grid
 * has no layout shift. Once real photos exist, fill `images` on the product
 * and <ProductImage> renders those instead.
 *
 * The background is CSS and the drawing is a separate SVG scaled with `meet`,
 * so the subject stays whole in any container — square cards, wide hero tiles
 * and tall gallery cells all crop the wash, never the illustration.
 */

type Palette = { from: string; to: string; ink: string; accent: string };

const palettes: Record<MotifId, Palette> = {
  hamper: { from: "#F7EADB", to: "#EBD2B8", ink: "#8A5E2E", accent: "#C0904A" },
  bouquet: { from: "#FAE6E4", to: "#EFC8C3", ink: "#9B4A50", accent: "#C2807C" },
  chocolate: { from: "#F1E3D4", to: "#DFC4A6", ink: "#7A4B26", accent: "#A9703C" },
  frame: { from: "#EFEDE6", to: "#DAD6C8", ink: "#5C5344", accent: "#8E7C5C" },
  shadowbox: { from: "#E9EDE8", to: "#CFD9CC", ink: "#4F6B4B", accent: "#7E9478" },
  dupatta: { from: "#F5E7F0", to: "#E3CBDB", ink: "#7A3F63", accent: "#A96A8C" },
  scroll: { from: "#F6EEDD", to: "#E6D8BA", ink: "#7A6326", accent: "#BC9A3F" },
  envelope: { from: "#F4EFE7", to: "#E0D5C2", ink: "#6B5B45", accent: "#A98F63" },
  digital: { from: "#E8EBF2", to: "#D0D8E7", ink: "#3F4A6B", accent: "#7683A8" },
};

/** Drawn on a 400 × 460 canvas, stroked in the palette ink. */
const drawings: Record<MotifId, React.ReactNode> = {
  hamper: (
    <>
      {/* contents rising out of the open box */}
      <rect x="138" y="150" width="26" height="110" rx="3" />
      <rect x="187" y="122" width="26" height="138" rx="3" />
      <rect x="236" y="138" width="26" height="122" rx="3" />
      <path d="M144 176h14M193 148h14M242 164h14M144 208h14M193 180h14M242 196h14" />
      <circle cx="116" cy="178" r="19" />
      <circle cx="116" cy="178" r="8" />
      <circle cx="286" cy="164" r="16" />
      <circle cx="286" cy="164" r="7" />
      <path d="M116 197v63m170-80v80" />
      {/* box */}
      <path d="M104 260h192v112a12 12 0 0 1-12 12H116a12 12 0 0 1-12-12V260Z" />
      <path d="M94 244h212v24H94z" />
      <path d="M200 268v116" />
      {/* bow */}
      <path d="M200 244c-24-5-37-18-30-30 6-11 22-4 30 30Zm0 0c24-5 37-18 30-30-6-11-22-4-30 30Z" />
      <circle cx="200" cy="244" r="8" />
    </>
  ),

  bouquet: (
    <>
      <circle cx="152" cy="150" r="33" />
      <circle cx="152" cy="150" r="19" />
      <circle cx="152" cy="150" r="7" />
      <circle cx="248" cy="150" r="33" />
      <circle cx="248" cy="150" r="19" />
      <circle cx="248" cy="150" r="7" />
      <circle cx="200" cy="96" r="33" />
      <circle cx="200" cy="96" r="19" />
      <circle cx="200" cy="96" r="7" />
      <circle cx="200" cy="196" r="29" />
      <circle cx="200" cy="196" r="15" />
      {/* foliage */}
      <path d="M112 122c-20 9-28 26-26 44M288 122c20 9 28 26 26 44" />
      <path d="M200 58V36m-72 48-16-20m160 20 16-20" />
      {/* cone wrap */}
      <path d="M118 222h164l-48 166a14 14 0 0 1-13 9h-42a14 14 0 0 1-13-9l-48-166Z" />
      <path d="M136 282h128M148 324h104" />
      <path d="M154 300h92" strokeWidth={8} />
    </>
  ),

  chocolate: (
    <>
      <rect x="112" y="98" width="56" height="96" rx="6" />
      <rect x="232" y="98" width="56" height="96" rx="6" />
      <rect x="172" y="62" width="56" height="96" rx="6" />
      <path d="M126 124h28M246 124h28M186 88h28" />
      <path d="M126 152h28M246 152h28M186 116h28" />
      <path d="M126 180h28M246 180h28M186 144h28" />
      <path d="M140 194v44m120-44v44M200 158v80" />
      <circle cx="168" cy="204" r="17" />
      <circle cx="168" cy="204" r="7" />
      <circle cx="236" cy="204" r="17" />
      <circle cx="236" cy="204" r="7" />
      <path d="M124 238h152l-44 150a14 14 0 0 1-13 9h-38a14 14 0 0 1-13-9l-44-150Z" />
      <path d="M152 306h96" strokeWidth={8} />
    </>
  ),

  frame: (
    <>
      <rect x="96" y="70" width="208" height="288" rx="6" />
      <rect x="120" y="94" width="160" height="240" rx="3" />
      <circle cx="172" cy="176" r="29" />
      <path d="M132 292c0-29 18-49 40-49s40 20 40 49" />
      <circle cx="240" cy="188" r="24" />
      <path d="M206 292c0-25 15-42 34-42s34 17 34 42" />
      <path d="M146 320h108" />
      <path d="M96 382h208" strokeWidth={3} />
      <path d="M118 400h164" strokeWidth={3} />
    </>
  ),

  shadowbox: (
    <>
      <rect x="82" y="62" width="236" height="312" rx="6" />
      <rect x="104" y="84" width="192" height="268" rx="4" />
      <rect x="128" y="108" width="144" height="220" rx="4" />
      <rect x="152" y="132" width="96" height="172" rx="4" />
      <path d="M200 292V180" />
      <path d="M200 222c-16 0-27-11-27-27 16 0 27 11 27 27Zm0 0c16 0 27-11 27-27-16 0-27 11-27 27Z" />
      <path d="M200 264c-14 0-23-9-23-23 14 0 23 9 23 23Zm0 0c14 0 23-9 23-23-14 0-23 9-23 23Z" />
      <circle cx="200" cy="168" r="11" />
      <path d="M82 400h236" strokeWidth={3} />
    </>
  ),

  dupatta: (
    <>
      <path d="M100 66c42 28 158 28 200 0v300c-42 30-158 30-200 0V66Z" />
      <path d="M100 108c42 28 158 28 200 0M100 320c42 28 158 28 200 0" />
      <path d="M104 352c13 15 28 15 41 0s28-15 41 0 28 15 41 0 28-15 41 0 22 13 30 2" />
      <path d="M104 76c13 15 28 15 41 0s28-15 41 0 28 15 41 0 28-15 41 0" />
      <circle cx="148" cy="194" r="6" />
      <circle cx="200" cy="166" r="6" />
      <circle cx="252" cy="194" r="6" />
      <circle cx="174" cy="244" r="6" />
      <circle cx="226" cy="244" r="6" />
      <circle cx="200" cy="284" r="6" />
      <path d="M200 208v-14m-26 62-9 9m61-9 9 9" />
    </>
  ),

  scroll: (
    <>
      <rect x="86" y="58" width="228" height="28" rx="14" />
      <rect x="86" y="374" width="228" height="28" rx="14" />
      <path d="M102 86h196v288H102z" />
      <rect x="122" y="110" width="156" height="240" rx="4" />
      <path d="M148 152h104M144 186h112M154 220h92M144 254h112M160 288h80M170 322h60" />
    </>
  ),

  envelope: (
    <>
      <rect x="76" y="118" width="248" height="184" rx="8" />
      <path d="M76 132l124 94 124-94" />
      <path d="M76 292l92-78m156 78-92-78" />
      <circle cx="200" cy="240" r="34" />
      <circle cx="200" cy="240" r="22" />
      <path d="M191 233l9 14 9-14" />
      <path d="M300 78c-20 9-29 23-29 37" />
      <path d="M287 85c-7-9-5-18 2-23m-4 36c-9-5-16 0-18 7" />
      <path d="M118 330h164" strokeWidth={3} />
    </>
  ),

  digital: (
    <>
      <rect x="120" y="46" width="160" height="330" rx="24" />
      <path d="M172 66h56" />
      <rect x="140" y="88" width="120" height="246" rx="6" />
      <path d="M160 128h80M174 154h52M154 182h92" />
      <circle cx="200" cy="234" r="26" />
      <path d="M200 208v52m-26-26h52" />
      <path d="M164 288h72" />
      <path d="M184 354h32" />
      <path d="M302 118c15 15 15 37 0 52M320 98c26 26 26 64 0 90" />
    </>
  ),
};

export function Motif({
  motif,
  className,
  seed = 0,
}: {
  motif: MotifId;
  className?: string;
  /** Shifts the background texture so a grid of tiles never looks tiled. */
  seed?: number;
}) {
  const palette = palettes[motif];

  return (
    <div
      className={cx("relative h-full w-full overflow-hidden", className)}
      style={{
        backgroundImage: `linear-gradient(140deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
      role="presentation"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${palette.accent} 1.2px, transparent 1.2px)`,
          backgroundSize: "26px 26px",
          backgroundPosition: `${(seed * 7) % 26}px ${(seed * 11) % 26}px`,
          opacity: 0.22,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-[9%]">
        <svg
          viewBox="0 0 400 460"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full overflow-visible"
        >
          {/* halo scales with the drawing, so it frames the subject at any size */}
          <circle cx="200" cy="230" r="188" fill="#fff" opacity="0.3" />
          <g
            stroke={palette.ink}
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.85"
          >
            {drawings[motif]}
          </g>
        </svg>
      </div>
    </div>
  );
}

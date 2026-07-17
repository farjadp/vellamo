// ---------------------------------------------------------------------------
// All graphics are inline SVG — no external image dependencies.
// The logo mark is strictly orthogonal: no diagonal lines anywhere near it.
// ---------------------------------------------------------------------------

const BLUE = "var(--vellamo-blue)";
const TEAL = "var(--vellamo-teal)";
const ICE = "var(--vellamo-ice)";
const GRAY = "var(--vellamo-gray)";

/**
 * Vellamo logo mark: waterline + wave crest above, three piles with one
 * horizontal brace and a sensor dot on the center pile below.
 * `tone` = "dark" (blue mark for light backgrounds) or "light" (ice mark
 * for dark backgrounds).
 */
export function LogoMark({ size = 36, tone = "dark", title = "Vellamo logo" }) {
  const main = tone === "dark" ? BLUE : ICE;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      fill="none"
    >
      {/* wave crest above the waterline (teal) */}
      <path
        d="M14 11c3 0 3-3 6-3s3 3 6 3 3-3 6-3 3 3 6 3"
        stroke={TEAL}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* waterline */}
      <line
        x1="4"
        y1="18"
        x2="44"
        y2="18"
        stroke={main}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* three vertical piles */}
      <line x1="12" y1="18" x2="12" y2="44" stroke={main} strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="18" x2="24" y2="44" stroke={main} strokeWidth="3" strokeLinecap="round" />
      <line x1="36" y1="18" x2="36" y2="44" stroke={main} strokeWidth="3" strokeLinecap="round" />
      {/* one horizontal brace connecting the piles */}
      <line x1="12" y1="32" x2="36" y2="32" stroke={main} strokeWidth="2.5" strokeLinecap="round" />
      {/* sensor dot on the center pile (teal) */}
      <circle cx="24" cy="26" r="3.25" fill={TEAL} />
    </svg>
  );
}

/** Logo mark + lowercase wordmark. */
export function Logo({ tone = "dark", size = 34 }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} tone={tone} />
      <span
        className={`text-2xl font-semibold tracking-tight lowercase ${
          tone === "dark" ? "text-vellamo-blue" : "text-vellamo-ice"
        }`}
      >
        vellamo
      </span>
    </span>
  );
}

/**
 * Large faint background graphic for the hero: a slowly drifting waterline
 * with a submerged pile group — the logo motif at architectural scale.
 */
export function HeroBackdrop() {
  const wave =
    "M0 40c40 0 40-16 80-16s40 16 80 16 40-16 80-16 40 16 80 16 40-16 80-16 40 16 80 16 40-16 80-16 40 16 80 16";
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* drifting wave lines near the waterline */}
      <div className="absolute left-0 top-[38%] w-[200%] wave-drift opacity-25">
        <svg width="100%" height="80" viewBox="0 0 1280 80" preserveAspectRatio="none" fill="none">
          <path d={wave} stroke={TEAL} strokeWidth="2" />
          <path d={wave} stroke={TEAL} strokeWidth="2" transform="translate(640 0)" />
        </svg>
      </div>
      <div className="absolute left-0 top-[43%] w-[200%] wave-drift-slow opacity-15">
        <svg width="100%" height="80" viewBox="0 0 1280 80" preserveAspectRatio="none" fill="none">
          <path d={wave} stroke={ICE} strokeWidth="1.5" />
          <path d={wave} stroke={ICE} strokeWidth="1.5" transform="translate(640 0)" />
        </svg>
      </div>
      {/* still waterline */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-vellamo-ice opacity-30" />
      {/* submerged pile group, faint, right of center */}
      <svg
        className="absolute right-[6%] top-1/2 hidden h-[45%] w-auto opacity-[0.14] md:block"
        viewBox="0 0 240 200"
        fill="none"
        preserveAspectRatio="xMidYMin meet"
      >
        <line x1="40" y1="0" x2="40" y2="200" stroke={ICE} strokeWidth="6" />
        <line x1="120" y1="0" x2="120" y2="200" stroke={ICE} strokeWidth="6" />
        <line x1="200" y1="0" x2="200" y2="200" stroke={ICE} strokeWidth="6" />
        <line x1="40" y1="110" x2="200" y2="110" stroke={ICE} strokeWidth="4" />
        <circle cx="120" cy="70" r="10" fill={TEAL} />
        {/* sensor network: node dots connected by thin lines */}
        <line x1="40" y1="150" x2="120" y2="150" stroke={TEAL} strokeWidth="1.5" opacity="0.8" />
        <line x1="120" y1="150" x2="200" y2="150" stroke={TEAL} strokeWidth="1.5" opacity="0.8" />
        <circle cx="40" cy="150" r="5" fill={TEAL} />
        <circle cx="200" cy="150" r="5" fill={TEAL} />
      </svg>
      {/* subtle depth gradient below the waterline */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-b from-transparent to-black/25" />
    </div>
  );
}

/**
 * Recurring waterline + pile-group motif used as a divider between sections.
 */
export function SectionDivider({ className = "" }) {
  return (
    <div className={`flex justify-center py-2 ${className}`} aria-hidden="true">
      <svg width="160" height="40" viewBox="0 0 160 40" fill="none">
        <line x1="0" y1="12" x2="160" y2="12" stroke={ICE} strokeWidth="2" opacity="0.2" />
        <line x1="56" y1="12" x2="56" y2="36" stroke={ICE} strokeWidth="2" opacity="0.2" />
        <line x1="80" y1="12" x2="80" y2="36" stroke={ICE} strokeWidth="2" opacity="0.2" />
        <line x1="104" y1="12" x2="104" y2="36" stroke={ICE} strokeWidth="2" opacity="0.2" />
        <line x1="56" y1="26" x2="104" y2="26" stroke={ICE} strokeWidth="1.5" opacity="0.2" />
        <circle cx="80" cy="19" r="2.5" fill={TEAL} />
      </svg>
    </div>
  );
}

/** Abstract Baltic coastline motif — stylized silhouette, not a literal map. */
export function BalticMotif() {
  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      className="w-full max-w-sm"
      role="img"
      aria-label="Abstract illustration of a northern coastline with sensor nodes"
    >
      {/* stylized coastline strokes */}
      <path
        d="M30 200c30-14 44-42 40-72s16-52 44-60 44-30 40-52"
        stroke={ICE}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M70 226c36-10 50-40 48-70s20-46 48-56 46-34 44-64"
        stroke={ICE}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.25"
      />
      {/* short wave ticks in the sea */}
      <path d="M210 190c6 0 6-5 12-5s6 5 12 5" stroke={TEAL} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M234 214c6 0 6-5 12-5s6 5 12 5" stroke={TEAL} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M186 226c6 0 6-5 12-5s6 5 12 5" stroke={TEAL} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {/* sensor nodes along the coast, connected by thin lines */}
      <line x1="66" y1="150" x2="118" y2="92" stroke={TEAL} strokeWidth="1" opacity="0.5" />
      <line x1="118" y1="92" x2="176" y2="52" stroke={TEAL} strokeWidth="1" opacity="0.5" />
      <circle cx="66" cy="150" r="5" fill={TEAL} />
      <circle cx="118" cy="92" r="5" fill={TEAL} />
      <circle cx="176" cy="52" r="5" fill={TEAL} />
    </svg>
  );
}

/* ------------------------------ icons ----------------------------------- */

const iconStroke = { stroke: ICE, strokeWidth: 2, strokeLinecap: "round" };

/** Fatigue: a pile with a growing micro-crack under repeated load ticks. */
export function IconFatigue({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <line x1="6" y1="10" x2="42" y2="10" {...iconStroke} />
      <line x1="24" y1="10" x2="24" y2="42" {...iconStroke} strokeWidth={3} />
      <path d="M24 24h-4v4h4v4h-4" stroke={TEAL} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M8 18c2 0 2-3 4-3s2 3 4 3" {...iconStroke} strokeWidth={1.5} />
      <path d="M32 18c2 0 2-3 4-3s2 3 4 3" {...iconStroke} strokeWidth={1.5} />
    </svg>
  );
}

/** Corrosion: a pile pitted below the waterline. */
export function IconCorrosion({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <line x1="6" y1="14" x2="42" y2="14" {...iconStroke} />
      <line x1="24" y1="6" x2="24" y2="42" {...iconStroke} strokeWidth={3} />
      <circle cx="19" cy="24" r="1.5" fill={TEAL} />
      <circle cx="29" cy="30" r="1.5" fill={TEAL} />
      <circle cx="19" cy="36" r="1.5" fill={TEAL} />
      <circle cx="29" cy="20" r="1.5" fill={TEAL} />
    </svg>
  );
}

/** Ice loads: an ice sheet pressing against a pile at the waterline. */
export function IconIce({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <line x1="4" y1="20" x2="44" y2="20" {...iconStroke} />
      <rect x="6" y="14" width="14" height="6" stroke={TEAL} strokeWidth="2" fill="none" />
      <line x1="30" y1="8" x2="30" y2="42" {...iconStroke} strokeWidth={3} />
      <line x1="22" y1="17" x2="26" y2="17" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Sense: sensor node emitting concentric signal arcs. */
export function IconSense({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <line x1="24" y1="20" x2="24" y2="42" {...iconStroke} strokeWidth={3} />
      <circle cx="24" cy="20" r="4" fill={TEAL} />
      <path d="M15 13a12 12 0 0 1 18 0" {...iconStroke} strokeWidth={1.75} />
      <path d="M11 8a18 18 0 0 1 26 0" {...iconStroke} strokeWidth={1.75} opacity="0.5" />
    </svg>
  );
}

/** Model: a structure mirrored as its digital twin (dotted). */
export function IconModel({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <line x1="10" y1="8" x2="10" y2="40" {...iconStroke} strokeWidth={3} />
      <line x1="10" y1="24" x2="20" y2="24" {...iconStroke} strokeWidth={2} />
      <line x1="38" y1="8" x2="38" y2="40" stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 4" />
      <line x1="28" y1="24" x2="38" y2="24" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
      <circle cx="24" cy="24" r="2" fill={TEAL} />
    </svg>
  );
}

/** Act: a healthy status reading with a check mark. */
export function IconAct({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="10" width="32" height="24" rx="3" {...iconStroke} fill="none" />
      <path d="M17 22l5 5 9-9" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="18" y1="40" x2="30" y2="40" {...iconStroke} />
    </svg>
  );
}

/** Port authorities: quay edge with a bollard. */
export function IconPort({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M6 20h24v18" {...iconStroke} fill="none" />
      <line x1="30" y1="38" x2="6" y2="38" {...iconStroke} />
      <rect x="14" y="12" width="8" height="8" rx="2" stroke={TEAL} strokeWidth="2" fill="none" />
      <path d="M34 30c3 0 3-4 6-4s3 4 6 4" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Offshore wind: monopile with turbine rotor above the waterline. */
export function IconWind({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <line x1="24" y1="14" x2="24" y2="42" {...iconStroke} strokeWidth={3} />
      <circle cx="24" cy="12" r="2.5" fill={TEAL} />
      <line x1="24" y1="9.5" x2="24" y2="2" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
      <line x1="26.5" y1="13" x2="33" y2="17" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
      <line x1="21.5" y1="13" x2="15" y2="17" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="30" x2="42" y2="30" {...iconStroke} />
    </svg>
  );
}

/** Shipyards: a hull cross-section above the waterline. */
export function IconShip({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 20h32l-6 12H14L8 20z" {...iconStroke} strokeLinejoin="round" fill="none" />
      <line x1="4" y1="26" x2="44" y2="26" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="20" x2="24" y2="12" {...iconStroke} />
    </svg>
  );
}

/** Insurers & class societies: shield with a sensor dot. */
export function IconShield({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 6l14 5v11c0 9-6 16-14 20-8-4-14-11-14-20V11l14-5z"
        {...iconStroke}
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="24" cy="22" r="3.5" fill={TEAL} />
      <line x1="24" y1="25.5" x2="24" y2="33" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Icon avatar for team cards (photos will replace these later). */
export function AvatarIcon({ size = 72, accent = false }) {
  const ring = accent ? TEAL : "rgba(244, 248, 250, 0.45)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      role="img"
      aria-label="Team member placeholder avatar"
    >
      <circle
        cx="36"
        cy="36"
        r="35"
        fill="rgba(244, 248, 250, 0.05)"
        stroke={ring}
        strokeWidth="2"
      />
      <circle cx="36" cy="28" r="10" fill="none" stroke={ICE} strokeWidth="2.5" opacity="0.7" />
      <path d="M16 60c3-11 11-16 20-16s17 5 20 16" fill="none" stroke={ICE} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="52" cy="18" r="4" fill={TEAL} />
    </svg>
  );
}

// Blueprint-style fallback cover for cases without a real thumbnail (e.g.
// social posts whose platforms block scraping). Pure SVG line work — circuit
// traces, a waveform, an IC outline — on a shelf-tinted background.
// Every pattern is seeded by the case slug, so each card gets a unique but
// deterministic design. No emoji anywhere; decorative and kept quiet so the
// title and author row stay the focus.
//
// Colors come from CSS variables (--ca-from/--ca-to/--ca-ink) defined per
// shelf in globals.css, with dark-mode variants — the component never
// hardcodes a theme.
import type { Lang, Shelf } from "@/content/schema";
import { shelfName } from "@/i18n/dict";

const W = 400;
const H = 250;

// --- deterministic PRNG (murmur-ish string hash + mulberry32) ---

function hashSeed(s: string): number {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type P = [number, number];

// Manhattan-routed trace: alternating horizontal/vertical segments.
function trace(rand: () => number): { d: string; vias: P[] } {
  let x = 12 + rand() * (W - 24);
  let y = 12 + rand() * (H - 24);
  const segs: P[] = [[x, y]];
  const steps = 2 + Math.floor(rand() * 3); // 2–4 segments
  for (let i = 0; i < steps; i++) {
    const horizontal = i % 2 === 0 ? rand() < 0.5 : rand() >= 0.5;
    const len = 24 + rand() * 64;
    if (horizontal) {
      x = Math.min(W - 14, Math.max(14, x + (rand() < 0.5 ? len : -len)));
    } else {
      y = Math.min(H - 14, Math.max(14, y + (rand() < 0.5 ? len : -len)));
    }
    segs.push([x, y]);
  }
  const d = segs.map(([px, py], i) => `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  return { d, vias: [segs[0], segs[segs.length - 1]] };
}

// Sine waveform strip.
function waveform(rand: () => number): string {
  const yc = 60 + rand() * (H - 120);
  const amp = 10 + rand() * 14;
  const lambda = 48 + rand() * 40;
  const phase = rand() * Math.PI * 2;
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 10) {
    const y = yc + amp * Math.sin((2 * Math.PI * x) / lambda + phase);
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}

// IC package outline with pin ticks, placed in one of the quadrants.
function chip(rand: () => number): { rect: P; pins: string[] } {
  const qx = rand() < 0.5 ? 0.14 : 0.62;
  const qy = rand() < 0.5 ? 0.18 : 0.52;
  const x = qx * W;
  const y = qy * H;
  const s = 56; // body size
  const pins: string[] = [];
  for (let i = 0; i < 6; i++) {
    const px = x + 8 + i * 8;
    pins.push(`M${px},${y - 7} L${px},${y}`); // top pins
    pins.push(`M${px},${y + s} L${px},${y + s + 7}`); // bottom pins
  }
  return { rect: [x, y], pins };
}

export default function CoverArt({
  shelf,
  number,
  slug,
  lang,
}: {
  shelf: Shelf;
  number: string;
  slug: string;
  lang: Lang;
}) {
  const rand = mulberry32(hashSeed(slug || shelf));

  const traceCount = 2 + Math.floor(rand() * 3); // 2–4 traces
  const traces = Array.from({ length: traceCount }, () => trace(rand));
  const wave = waveform(rand);
  const chipGeom = chip(rand);
  const grid = 22 + Math.floor(rand() * 3) * 6; // 22/28/34px grid
  const [cx, cy] = chipGeom.rect;
  const cs = 56;

  return (
    <div
      className="cover-art relative h-full w-full overflow-hidden"
      data-shelf={shelf}
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <pattern id={`bp-${slug}`} width={grid} height={grid} patternUnits="userSpaceOnUse">
            <path d={`M${grid} 0 H0 V${grid}`} fill="none" stroke="var(--ca-ink)" strokeWidth="1" strokeOpacity="0.07" />
          </pattern>
        </defs>

        {/* blueprint grid */}
        <rect x="0" y="0" width={W} height={H} fill={`url(#bp-${slug})`} />

        {/* circuit traces */}
        {traces.map((tr, i) => (
          <g key={i} fill="none" stroke="var(--ca-ink)" strokeWidth="1" strokeOpacity="0.32">
            <path d={tr.d} />
            {tr.vias.map(([vx, vy], j) => (
              <circle key={j} cx={vx} cy={vy} r="2.5" fill="var(--ca-ink)" fillOpacity="0.35" stroke="none" />
            ))}
          </g>
        ))}

        {/* waveform strip */}
        <path d={wave} fill="none" stroke="var(--ca-ink)" strokeWidth="1.25" strokeOpacity="0.34" />

        {/* IC outline + pins */}
        <g stroke="var(--ca-ink)" strokeWidth="1" strokeOpacity="0.26" fill="none">
          <rect x={cx} y={cy} width={cs} height={cs} rx="4" />
          {chipGeom.pins.map((d, i) => (
            <path key={i} d={d} />
          ))}
          <circle cx={cx + cs / 2} cy={cy + cs / 2} r="3" />
        </g>
      </svg>

      <span className="absolute bottom-2.5 left-3 rounded-md bg-card/80 px-2 py-0.5 text-[11px] font-medium text-foreground/80 backdrop-blur-sm">
        {shelfName(shelf, lang)}
      </span>
      <span className="absolute bottom-2.5 right-3 font-mono text-[11px] text-foreground/50">
        №{number}
      </span>
    </div>
  );
}

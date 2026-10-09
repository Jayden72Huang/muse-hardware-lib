// Original ASCII-art mascot for the homepage hero: a small hardware-geek
// robot, hand-drawn for this site (not copied from any source).
// Purely decorative — the <pre> is aria-hidden; the wrapper carries
// role="img" with a short accessible label. No copy, so no i18n needed.
const ART = String.raw`      | |
   ___|_|___
  |  o   o  |
  |         |
  |   \_/   |
  |_________|
   __|   |__
  |  |   |  |
  |__|   |__|
     |   |
    _|   |_
   |_|   |_|`;

export default function AsciiMascot() {
  return (
    <div
      role="img"
      aria-label="ASCII robot mascot"
      className="mascot-wiggle hidden shrink-0 select-none sm:block"
    >
      <pre
        aria-hidden="true"
        className="font-mono text-[10px] leading-[1.1] text-foreground/55"
      >
        {ART}
      </pre>
    </div>
  );
}

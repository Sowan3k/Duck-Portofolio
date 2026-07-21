/**
 * Steam — soft wisps rising off the coffee mug (CLAUDE.md §4 ambient). Pure
 * transform/opacity (translateY + scale + fade), so it holds 60fps; frozen and
 * hidden under reduced motion by the global reset + the parent's motion guard.
 */
export default function Steam() {
  return (
    <div className="ambient ambient-steam" aria-hidden="true">
      <span className="ambient-steam__wisp" style={{ ['--i' as string]: 0 }} />
      <span className="ambient-steam__wisp" style={{ ['--i' as string]: 1 }} />
      <span className="ambient-steam__wisp" style={{ ['--i' as string]: 2 }} />
    </div>
  );
}

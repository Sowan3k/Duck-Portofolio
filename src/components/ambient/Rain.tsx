/**
 * Rain - a subtle moving streak layer over the window (CLAUDE.md §4 ambient).
 * The window already has painted rain; this adds just a little motion on top, so
 * it's kept faint. Two translateY-only gradient layers give a shallow parallax;
 * clipped to the window rect by the parent's `overflow: hidden`. Frozen/hidden
 * under reduced motion.
 */
export default function Rain() {
  return (
    <div className="ambient ambient-rain" aria-hidden="true">
      <span className="ambient-rain__sheet ambient-rain__sheet--far" />
      <span className="ambient-rain__sheet ambient-rain__sheet--near" />
    </div>
  );
}

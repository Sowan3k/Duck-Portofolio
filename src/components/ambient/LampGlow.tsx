/**
 * LampGlow — a warm pool of banker's-lamp light on the desk (CLAUDE.md §4
 * ambient, art_style.md green-lamp glow). Opacity-only breathing (no layout,
 * no color animation); screen-blended so it lightens the art like real light,
 * always warm (never a cold cast — art_style.md never-list). Static under
 * reduced motion.
 */
export default function LampGlow() {
  return <div className="ambient ambient-lamp" aria-hidden="true" />;
}

/**
 * engine.ts — the office's timing constants and view-level types.
 *
 * The full interaction state machine (CLAUDE.md §5 canonical timing table)
 * lands in Phase 4. Phase 3 needs the CRT power-on timing, the reduced-motion
 * fallback, and the entry→office view states — all as named constants here, the
 * single source (no magic numbers in components, CLAUDE.md §5).
 */

/** CRT power-on duration — owner-tuned against the live prototype (status.md 2026-07-20). */
export const CRT_POWER_ON_MS = 1350;

/** prefers-reduced-motion collapses every transition to at most this crossfade. */
export const REDUCED_MOTION_CROSSFADE_MS = 150;

/** Mobile first-visit: reveal every object label for this long, once (§4). */
export const LABEL_FLASH_MS = 3000;

/** localStorage keys (namespaced so the office owns its own storage). */
export const STORAGE_KEYS = {
  /** Ambient sound preference; persists a returning muted visitor (law 8). */
  sound: 'swans-office:sound',
  /** Whether this visitor has seen the office before (first-visit label flash). */
  visitedOffice: 'swans-office:visited-office',
} as const;

/**
 * The office's top-level view.
 * - entry:    the framed-portrait cover, "press Enter to come in".
 * - crt:      the power-on transition is playing.
 * - office:   the gray-box office is live and touchable.
 * - standard: the overlay is dismissed; the standard view underneath is shown.
 */
export type OfficeView = 'entry' | 'crt' | 'office' | 'standard';

/**
 * engine.ts - the office's timing constants and view-level types.
 *
 * The full interaction state machine (CLAUDE.md §5 canonical timing table)
 * lands in Phase 4. Phase 3 needs the CRT power-on timing, the reduced-motion
 * fallback, and the entry→office view states - all as named constants here, the
 * single source (no magic numbers in components, CLAUDE.md §5).
 */

/** CRT power-on duration - owner-tuned against the live prototype (status.md 2026-07-20). */
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
  /** Objects this visitor has already opened (repeat-visit dialogue, §5 memory). */
  visitedObjects: 'swans-office:visited-objects',
  /** Whether the origin-story intro has played (once per visitor, bible §3). */
  introSeen: 'swans-office:intro-seen',
  /** Whether the portrait rotate-your-phone hint has been shown (once). */
  rotateHint: 'swans-office:rotate-hint',
} as const;

/**
 * The office's top-level view.
 * - entry:    the framed-portrait cover, "press Enter to come in".
 * - crt:      the power-on transition is playing.
 * - office:   the gray-box office is live and touchable.
 * - standard: the overlay is dismissed; the standard view underneath is shown.
 */
export type OfficeView = 'entry' | 'crt' | 'office' | 'standard';

/* ================================================================== *
 * Interaction state machine (CLAUDE.md §5 canonical timing table)
 *
 * One pattern, driven by data: click → notice → talk (lines advance on input
 * only, ≤3, skippable) → content opens → close → return → resume idle. Every
 * step is interruptible. The Résumé folder bypasses this entirely (law 2).
 * ================================================================== */

import type { SceneContentId } from '../../lib/scene';

/** Named timings - the single source (no magic numbers in components, §5). */
export const TIMING = {
  /** Input → duck settles → first line (worst case ≤ 1.2s, §5 hard rule). */
  NOTICE_MS: 1000,
  /** Repeat activation of a visited object: a single quick glance instead. */
  GLANCE_MS: 400,
  /** Word-chunk reveal cadence (~40ms/word); off under reduced motion. */
  WORD_REVEAL_MS: 40,
  /** After the final line's input, the physical UI opens (≤ 0.45s). */
  OPEN_MS: 250,
  /** Content closes and the object returns (≤ 0.45s). */
  CLOSE_MS: 350,
  /** Duck returns and resumes the exact idle it was in (close + 0.80). */
  RETURN_MS: 450,
} as const;

/** Duck pose states - consumed by the Rive rig in Phase 6; state-only now. */
export type DuckState =
  | 'idle'
  | 'notice'
  | 'talk'
  | 'think'
  | 'read'
  | 'sleep'
  | 'return';

export type InteractionPhase =
  | 'idle'
  | 'noticing'
  | 'talking'
  | 'opening'
  | 'open'
  | 'closing'
  | 'returning';

export interface InteractionState {
  phase: InteractionPhase;
  objectId: string | null;
  contentId: SceneContentId | null;
  lines: string[];
  lineIndex: number;
  /** Repeat visit → the notice beat is a short glance. */
  glance: boolean;
  duck: DuckState;
}

export const initialInteraction: InteractionState = {
  phase: 'idle',
  objectId: null,
  contentId: null,
  lines: [],
  lineIndex: 0,
  glance: false,
  duck: 'idle',
};

export type InteractionEvent =
  | {
      type: 'ACTIVATE';
      objectId: string;
      contentId: SceneContentId;
      lines: string[];
      glance: boolean;
    }
  | { type: 'REACH_TALK' } // timer: notice → talk
  | { type: 'ADVANCE' } // input: next line, or open after the last
  | { type: 'SKIP' } // skip affordance: jump straight to content
  | { type: 'OPEN' } // timer: opening → open
  | { type: 'CLOSE' } // Esc / close button
  | { type: 'REACH_RETURN' } // timer: closing → returning
  | { type: 'REACH_IDLE' }; // timer: returning → idle

/**
 * Pure transition function. Idempotent guards make every step interruptible
 * without double-firing (a second input during notice/talk advances; input on a
 * settled phase that doesn't accept it is ignored).
 */
export function interactionReducer(
  state: InteractionState,
  event: InteractionEvent
): InteractionState {
  switch (event.type) {
    case 'ACTIVATE':
      // Only start from rest; ignore taps while an interaction is underway.
      if (state.phase !== 'idle') return state;
      return {
        phase: 'noticing',
        objectId: event.objectId,
        contentId: event.contentId,
        lines: event.lines,
        lineIndex: 0,
        glance: event.glance,
        duck: 'notice',
      };

    case 'REACH_TALK':
      if (state.phase !== 'noticing') return state;
      return { ...state, phase: 'talking', lineIndex: 0, duck: 'talk' };

    case 'ADVANCE':
      if (state.phase === 'noticing') {
        // A second input during the notice beat skips straight to the lines.
        return { ...state, phase: 'talking', lineIndex: 0, duck: 'talk' };
      }
      if (state.phase === 'talking') {
        if (state.lineIndex < state.lines.length - 1) {
          return { ...state, lineIndex: state.lineIndex + 1 };
        }
        return { ...state, phase: 'opening', duck: 'think' };
      }
      return state;

    case 'SKIP':
      if (state.phase === 'noticing' || state.phase === 'talking') {
        return { ...state, phase: 'opening', duck: 'think' };
      }
      return state;

    case 'OPEN':
      if (state.phase !== 'opening') return state;
      return { ...state, phase: 'open', duck: 'talk' };

    case 'CLOSE':
      if (state.phase !== 'open') return state;
      return { ...state, phase: 'closing', duck: 'return' };

    case 'REACH_RETURN':
      if (state.phase !== 'closing') return state;
      return { ...state, phase: 'returning', duck: 'return' };

    case 'REACH_IDLE':
      if (state.phase !== 'returning') return state;
      return initialInteraction;

    default:
      return state;
  }
}


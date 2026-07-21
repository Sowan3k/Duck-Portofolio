import type { CSSProperties } from 'react';
import ClockHands from './ClockHands';
import Steam from './Steam';
import Rain from './Rain';
import LampGlow from './LampGlow';
import './ambient.css';

/**
 * Ambient - the office's small signs of life, layered over the painted scene
 * (CLAUDE.md §4 ambient list, Phase 5 task 4). Every loop is transform/opacity
 * only (60fps or cut). Each piece is positioned by scene-relative % so it tracks
 * the painted object it belongs to at every size; the whole layer is
 * `aria-hidden` and never interactive.
 *
 * Registered positions (scene %):
 *  - clock  → the round wall clock (real local time)
 *  - lamp   → the banker's-lamp pool on the desk
 *  - steam  → rising off the coffee mug
 *  - rain   → the window (kept faint; the window art is already rainy)
 *
 * Plant sway is intentionally omitted: the plants are baked into the painted
 * furniture layer with no separate cutout, so there is nothing to transform
 * without faking it - cut rather than excuse (§8). It returns only if a plant
 * cutout is ever produced.
 *
 * Reduced motion: the clock still shows the correct time (frozen sweep) and the
 * lamp keeps a static warm glow; the motion-only rain and steam are dropped
 * (a frozen wisp/streak would just read as a smudge).
 */
const RECTS = {
  // Box centred on the round clock face (measured centre 72.07%, 7.43%); square
  // in view (7.0%w × 9.33%h ≈ equal on a 4:3 box) so the hands stay circular.
  clock: { left: 68.6, top: 2.8, width: 7.0, height: 9.33 },
  lamp: { left: 7, top: 35, width: 22, height: 30 },
  steam: { left: 62, top: 48, width: 7, height: 18 },
  // The window's two glass panes, measured off the clean plate - the rain
  // never touches the wooden frame, centre rail, sill, or the lamp below.
  rainUpper: { left: 1.1, top: 8.2, width: 12.2, height: 16.0 },
  rainLower: { left: 1.2, top: 26.2, width: 12.2, height: 7.3 },
} as const;

function rectStyle(r: { left: number; top: number; width: number; height: number }): CSSProperties {
  return { left: `${r.left}%`, top: `${r.top}%`, width: `${r.width}%`, height: `${r.height}%` };
}

export default function Ambient({ reduced }: { reduced: boolean }) {
  return (
    <div className="ambient-layer" aria-hidden="true">
      <div className="ambient-slot" style={rectStyle(RECTS.lamp)}>
        <LampGlow />
      </div>
      <div className="ambient-slot ambient-slot--clock" style={rectStyle(RECTS.clock)}>
        <ClockHands reduced={reduced} />
      </div>
      {!reduced && (
        <>
          <div className="ambient-slot ambient-slot--clip" style={rectStyle(RECTS.rainUpper)}>
            <Rain />
          </div>
          <div className="ambient-slot ambient-slot--clip" style={rectStyle(RECTS.rainLower)}>
            <Rain />
          </div>
          <div className="ambient-slot" style={rectStyle(RECTS.steam)}>
            <Steam />
          </div>
        </>
      )}
    </div>
  );
}

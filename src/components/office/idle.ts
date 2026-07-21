/**
 * idle.ts - the duck's idle life as pure logic (bible §7: reading, sipping,
 * sleeping, blinking, checking the clock, looking outside, adjusting pipe...).
 *
 * The scheduler alternates: variant -> settle back to idle -> next variant, so
 * Swan always returns to rest between behaviours and the office breathes
 * instead of fidgeting. Behaviour choice is weighted by the visitor's local
 * time (2026-07-20 time-aware decision): late night leans sleeping, morning
 * leans coffee. Blinking is not scheduled here - it loops inside the rig's
 * open-eye animations.
 *
 * Pure functions + injected randomness so every rule is unit-testable; the
 * thin timer hook lives in useIdleScheduler.ts.
 */
import type { TimeOfDay } from '../../lib/dialogue';
import type { DuckPose } from './engine';

/** Idle variants the scheduler may pick (a subset of DuckPose). */
export type IdleBehaviour = Extract<
  DuckPose,
  'idle' | 'read' | 'sip' | 'think' | 'sleep' | 'lookWindow' | 'lookClock'
>;

/** How long Swan holds a variant behaviour before settling back to idle. */
export const IDLE_HOLD_MS: readonly [number, number] = [5000, 10000];
/** How long Swan rests in idle between variants. */
export const IDLE_REST_MS: readonly [number, number] = [6000, 14000];
/** Sleeping is a long behaviour - waking up every few seconds would be cruel. */
export const SLEEP_HOLD_MS: readonly [number, number] = [18000, 30000];

/** Weighted pools per time of day. Weights sum to 1 per pool. */
const POOLS: Record<TimeOfDay, Array<[Exclude<IdleBehaviour, 'idle'>, number]>> = {
  night: [
    ['sleep', 0.55],
    ['lookWindow', 0.2],
    ['think', 0.1],
    ['read', 0.1],
    ['sip', 0.05],
  ],
  morning: [
    ['sip', 0.35],
    ['read', 0.25],
    ['think', 0.15],
    ['lookWindow', 0.15],
    ['lookClock', 0.1],
  ],
  day: [
    ['read', 0.3],
    ['think', 0.2],
    ['lookWindow', 0.2],
    ['sip', 0.15],
    ['lookClock', 0.15],
  ],
  evening: [
    ['read', 0.3],
    ['think', 0.25],
    ['lookWindow', 0.25],
    ['sip', 0.1],
    ['lookClock', 0.1],
  ],
};

/**
 * Pick the next behaviour. Rules:
 *  - after any variant, Swan settles back to 'idle' (the interleave rule);
 *  - from idle, pick from the time-of-day pool, never repeating the variant
 *    he just did (no "sips coffee twice in a row" loops);
 *  - `rand` is injected (0..1) so the choice is deterministic in tests.
 */
export function pickNextIdle(
  tod: TimeOfDay,
  previous: IdleBehaviour,
  lastVariant: IdleBehaviour | null,
  rand: number
): IdleBehaviour {
  if (previous !== 'idle') return 'idle';
  const pool = POOLS[tod].filter(([b]) => b !== lastVariant);
  const total = pool.reduce((sum, [, w]) => sum + w, 0);
  let roll = Math.max(0, Math.min(0.999999, rand)) * total;
  for (const [behaviour, weight] of pool) {
    roll -= weight;
    if (roll < 0) return behaviour;
  }
  return pool[pool.length - 1]?.[0] ?? 'idle';
}

/** How long to stay in `behaviour` before the next tick. */
export function idleDuration(behaviour: IdleBehaviour, rand: number): number {
  const [min, max] =
    behaviour === 'idle' ? IDLE_REST_MS : behaviour === 'sleep' ? SLEEP_HOLD_MS : IDLE_HOLD_MS;
  return Math.round(min + (max - min) * Math.max(0, Math.min(1, rand)));
}

import { describe, expect, it } from 'vitest';
import {
  pickNextIdle,
  idleDuration,
  IDLE_HOLD_MS,
  IDLE_REST_MS,
  SLEEP_HOLD_MS,
  type IdleBehaviour,
} from '../../src/components/office/idle';
import { RIVE_POSE } from '../../src/components/office/engine';
import type { TimeOfDay } from '../../src/lib/dialogue';

/**
 * The duck's idle life is pure logic (idle.ts) so its rules are testable:
 * variants interleave with rest, choices stay in the rig's vocabulary, the
 * time of day genuinely biases behaviour, and no variant repeats back-to-back.
 */
const TODS: TimeOfDay[] = ['night', 'morning', 'day', 'evening'];
const rolls = Array.from({ length: 200 }, (_, i) => i / 200);

describe('pickNextIdle', () => {
  it('always settles back to idle after any variant (the interleave rule)', () => {
    for (const tod of TODS) {
      for (const prev of ['read', 'sip', 'think', 'sleep', 'lookWindow', 'lookClock'] as const) {
        expect(pickNextIdle(tod, prev, prev, 0.5)).toBe('idle');
      }
    }
  });

  it('only ever picks behaviours the Rive contract knows', () => {
    for (const tod of TODS) {
      for (const r of rolls) {
        const pick = pickNextIdle(tod, 'idle', null, r);
        expect(RIVE_POSE[pick]).toBeDefined();
      }
    }
  });

  it('never repeats the same variant twice in a row', () => {
    for (const tod of TODS) {
      for (const last of ['read', 'sip', 'think', 'lookWindow'] as const) {
        for (const r of rolls) {
          expect(pickNextIdle(tod, 'idle', last, r)).not.toBe(last);
        }
      }
    }
  });

  it('sleeps mostly at night, and only at night', () => {
    const count = (tod: TimeOfDay, behaviour: IdleBehaviour) =>
      rolls.filter((r) => pickNextIdle(tod, 'idle', null, r) === behaviour).length;
    // Night: sleeping is the majority behaviour.
    expect(count('night', 'sleep')).toBeGreaterThan(rolls.length * 0.45);
    // Sleep never appears outside the night pool.
    for (const tod of ['morning', 'day', 'evening'] as const) {
      expect(count(tod, 'sleep')).toBe(0);
    }
    // Morning leans on the coffee.
    expect(count('morning', 'sip')).toBeGreaterThan(rolls.length * 0.25);
  });

  it('handles degenerate rand values without leaving the vocabulary', () => {
    for (const r of [-1, 0, 0.999999, 1, 2]) {
      const pick = pickNextIdle('day', 'idle', null, r);
      expect(RIVE_POSE[pick]).toBeDefined();
    }
  });
});

describe('idleDuration', () => {
  it('stays within each behaviour band and sleeps longest', () => {
    expect(idleDuration('idle', 0)).toBe(IDLE_REST_MS[0]);
    expect(idleDuration('idle', 1)).toBe(IDLE_REST_MS[1]);
    expect(idleDuration('read', 0)).toBe(IDLE_HOLD_MS[0]);
    expect(idleDuration('read', 1)).toBe(IDLE_HOLD_MS[1]);
    expect(idleDuration('sleep', 0)).toBe(SLEEP_HOLD_MS[0]);
    expect(idleDuration('sleep', 0)).toBeGreaterThan(idleDuration('read', 1));
  });
});

import { useEffect, useRef, useState } from 'react';
import type { TimeOfDay } from '../../lib/dialogue';
import { pickNextIdle, idleDuration, type IdleBehaviour } from './idle';

/**
 * useIdleScheduler - the thin timer around the pure idle logic (idle.ts).
 * Cycles Swan's idle behaviours on a randomized clock while the office is at
 * rest; any interaction disables it (Office passes `enabled: false`) and the
 * behaviour snaps back to 'idle' so the interaction pose takes over cleanly.
 * Reduced motion freezes the scheduler to the single calm pose (CLAUDE.md §5).
 */
export function useIdleScheduler(
  enabled: boolean,
  reduced: boolean,
  tod: TimeOfDay
): IdleBehaviour {
  const [behaviour, setBehaviour] = useState<IdleBehaviour>('idle');
  const lastVariant = useRef<IdleBehaviour | null>(null);

  useEffect(() => {
    if (!enabled || reduced) {
      setBehaviour('idle');
      return;
    }
    let current: IdleBehaviour = 'idle';
    let timer = 0;
    const tick = () => {
      const next = pickNextIdle(tod, current, lastVariant.current, Math.random());
      if (next !== 'idle') lastVariant.current = next;
      current = next;
      setBehaviour(next);
      timer = window.setTimeout(tick, idleDuration(next, Math.random()));
    };
    // First variant arrives after one rest period - Swan doesn't perform on cue.
    timer = window.setTimeout(tick, idleDuration('idle', Math.random()));
    return () => {
      window.clearTimeout(timer);
      setBehaviour('idle');
    };
  }, [enabled, reduced, tod]);

  return behaviour;
}

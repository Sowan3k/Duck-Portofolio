import { useEffect, useReducer } from 'react';
import {
  interactionReducer,
  initialInteraction,
  TIMING,
  REDUCED_MOTION_CROSSFADE_MS,
} from './engine';

/**
 * useInteraction — wraps the pure interaction reducer and schedules the timed
 * transitions of the canonical timing table (§5). Input-driven phases (talking,
 * open) have no timer; they wait for the visitor. Reduced motion collapses every
 * timed beat to ≤150ms.
 */
export function useInteraction(reduced: boolean) {
  const [state, dispatch] = useReducer(interactionReducer, initialInteraction);

  useEffect(() => {
    const clamp = (ms: number) =>
      reduced ? Math.min(ms, REDUCED_MOTION_CROSSFADE_MS) : ms;
    let id: number | undefined;

    if (state.phase === 'noticing') {
      id = window.setTimeout(
        () => dispatch({ type: 'REACH_TALK' }),
        clamp(state.glance ? TIMING.GLANCE_MS : TIMING.NOTICE_MS)
      );
    } else if (state.phase === 'opening') {
      id = window.setTimeout(() => dispatch({ type: 'OPEN' }), clamp(TIMING.OPEN_MS));
    } else if (state.phase === 'closing') {
      id = window.setTimeout(
        () => dispatch({ type: 'REACH_RETURN' }),
        clamp(TIMING.CLOSE_MS)
      );
    } else if (state.phase === 'returning') {
      id = window.setTimeout(
        () => dispatch({ type: 'REACH_IDLE' }),
        clamp(TIMING.RETURN_MS)
      );
    }

    return () => {
      if (id) window.clearTimeout(id);
    };
  }, [state.phase, state.glance, reduced]);

  return { state, dispatch };
}

import { describe, it, expect } from 'vitest';
import {
  interactionReducer,
  initialInteraction,
  TIMING,
  type InteractionState,
} from '../../src/components/office/engine';

/**
 * The interaction reducer is the heart of the office (§5). These tests pin every
 * transition and the interruptibility rules so the timing pattern can't drift.
 */
const activate = (over: Partial<Parameters<typeof interactionReducer>[1]> = {}) =>
  interactionReducer(initialInteraction, {
    type: 'ACTIVATE',
    objectId: 'computer',
    contentId: 'projects',
    lines: ['a', 'b', 'c'],
    glance: false,
    ...over,
  } as Parameters<typeof interactionReducer>[1]);

describe('interaction reducer', () => {
  it('ACTIVATE from idle → noticing (duck notices)', () => {
    const s = activate();
    expect(s.phase).toBe('noticing');
    expect(s.objectId).toBe('computer');
    expect(s.contentId).toBe('projects');
    expect(s.duck).toBe('notice');
    expect(s.lineIndex).toBe(0);
  });

  it('ACTIVATE is ignored while an interaction is already underway', () => {
    const noticing = activate();
    const again = interactionReducer(noticing, {
      type: 'ACTIVATE',
      objectId: 'telephone',
      contentId: 'contact',
      lines: ['x'],
      glance: false,
    });
    expect(again).toBe(noticing);
  });

  it('REACH_TALK moves notice → talk', () => {
    const s = interactionReducer(activate(), { type: 'REACH_TALK' });
    expect(s.phase).toBe('talking');
    expect(s.duck).toBe('talk');
  });

  it('a second input during notice skips straight to the lines', () => {
    const s = interactionReducer(activate(), { type: 'ADVANCE' });
    expect(s.phase).toBe('talking');
    expect(s.lineIndex).toBe(0);
  });

  it('ADVANCE walks the lines, then opens after the last', () => {
    let s: InteractionState = interactionReducer(activate(), { type: 'REACH_TALK' });
    s = interactionReducer(s, { type: 'ADVANCE' });
    expect(s.lineIndex).toBe(1);
    s = interactionReducer(s, { type: 'ADVANCE' });
    expect(s.lineIndex).toBe(2);
    s = interactionReducer(s, { type: 'ADVANCE' }); // past the last line
    expect(s.phase).toBe('opening');
  });

  it('SKIP jumps to content from notice or talk', () => {
    expect(interactionReducer(activate(), { type: 'SKIP' }).phase).toBe('opening');
    const talking = interactionReducer(activate(), { type: 'REACH_TALK' });
    expect(interactionReducer(talking, { type: 'SKIP' }).phase).toBe('opening');
  });

  it('runs the full open → close → return → idle cycle', () => {
    let s = interactionReducer(activate(), { type: 'SKIP' }); // opening
    s = interactionReducer(s, { type: 'OPEN' });
    expect(s.phase).toBe('open');
    s = interactionReducer(s, { type: 'CLOSE' });
    expect(s.phase).toBe('closing');
    expect(s.duck).toBe('return');
    s = interactionReducer(s, { type: 'REACH_RETURN' });
    expect(s.phase).toBe('returning');
    s = interactionReducer(s, { type: 'REACH_IDLE' });
    expect(s).toEqual(initialInteraction);
    expect(s.duck).toBe('idle');
  });

  it('ignores events that do not belong to the current phase', () => {
    expect(interactionReducer(initialInteraction, { type: 'OPEN' })).toBe(initialInteraction);
    expect(interactionReducer(initialInteraction, { type: 'CLOSE' })).toBe(initialInteraction);
    const open = interactionReducer(interactionReducer(activate(), { type: 'SKIP' }), { type: 'OPEN' });
    expect(interactionReducer(open, { type: 'ADVANCE' })).toBe(open);
  });

  it('input → first line stays within the 1.2s worst case (§5)', () => {
    expect(TIMING.NOTICE_MS).toBeLessThanOrEqual(1200);
    expect(TIMING.GLANCE_MS).toBeLessThan(TIMING.NOTICE_MS);
  });
});

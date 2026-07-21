import { describe, it, expect } from 'vitest';
import {
  objectDialogue,
  originIntro,
  greetingByTime,
  easterEggs,
  timeOfDay,
  pickLines,
} from '../../src/lib/dialogue';
import type { SceneContentId } from '../../src/lib/scene';

/**
 * Dialogue is voice, not facts (law 4). These guard the bible §5/§6 constraints:
 * ≤60 chars/line, ≤3 lines before content opens (law 2), every object covered,
 * and exactly the three easter eggs (bible §16, non-goal: no more).
 */
const CONTENT_IDS: SceneContentId[] = [
  'about',
  'projects',
  'experience',
  'skills',
  'awards',
  'education',
  'roadmap',
  'contact',
  'resume',
];

function everyLine(): string[] {
  const lines: string[] = [...originIntro, ...Object.values(easterEggs)];
  for (const set of Object.values(greetingByTime)) lines.push(...set);
  for (const entry of Object.values(objectDialogue)) {
    for (const s of [...entry.first, ...entry.repeat]) lines.push(...s);
  }
  return lines;
}

describe('dialogue', () => {
  it('covers exactly the nine content targets', () => {
    expect(Object.keys(objectDialogue).sort()).toEqual([...CONTENT_IDS].sort());
  });

  it('every line is non-empty and ≤ 60 characters (§6)', () => {
    for (const line of everyLine()) {
      expect(line.trim().length).toBeGreaterThan(0);
      expect(line.length, `too long: "${line}"`).toBeLessThanOrEqual(60);
    }
  });

  it('every object line set has 1–3 lines (law 2)', () => {
    for (const entry of Object.values(objectDialogue)) {
      for (const set of [...entry.first, ...entry.repeat]) {
        expect(set.length).toBeGreaterThanOrEqual(1);
        expect(set.length).toBeLessThanOrEqual(3);
      }
    }
  });

  it('the origin intro names the key objects (bible §3)', () => {
    const text = originIntro.join(' ').toLowerCase();
    expect(text).toContain('swan');
    expect(text).toContain('sowan');
    expect(text).toContain('computer');
    expect(text).toContain('cv');
  });

  it('has exactly the three easter eggs (bible §16, no more)', () => {
    expect(Object.keys(easterEggs).sort()).toEqual(['coffee', 'hire', 'spam']);
  });

  it('pickLines returns first-visit vs repeat sets deterministically', () => {
    const first = pickLines('projects', { visited: false, visitCount: 0 });
    const repeat = pickLines('projects', { visited: true, visitCount: 0 });
    expect(first).toEqual(objectDialogue.projects.first[0]);
    expect(repeat).toEqual(objectDialogue.projects.repeat[0]);
    // Deterministic: same inputs → same output.
    expect(pickLines('projects', { visited: false, visitCount: 0 })).toEqual(first);
  });

  it('maps local hours to the right part of day', () => {
    expect(timeOfDay(2)).toBe('night');
    expect(timeOfDay(8)).toBe('morning');
    expect(timeOfDay(14)).toBe('day');
    expect(timeOfDay(20)).toBe('evening');
  });
});

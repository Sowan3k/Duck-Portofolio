import { describe, it, expect } from 'vitest';
import { hotspots, SCENE_ASPECT, type SceneContentId } from '../../src/lib/scene';

/**
 * scene.ts drives the office hotspots. These guard the data so a bad rect,
 * duplicate id, or missing object can't ship (the geometry is refined in
 * Phase 5, but it must always be well-formed).
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

describe('scene hotspots', () => {
  it('has the nine interactive objects (CLAUDE.md §4), ids unique', () => {
    expect(hotspots).toHaveLength(9);
    const ids = hotspots.map((h) => h.id);
    expect(new Set(ids).size).toBe(9);
  });

  it('covers exactly the nine content targets, one each', () => {
    const targets = hotspots.map((h) => h.contentId).sort();
    expect(targets).toEqual([...CONTENT_IDS].sort());
  });

  it('every rect is on-canvas (0–100% and within bounds)', () => {
    for (const h of hotspots) {
      const { xPct, yPct, wPct, hPct } = h.rect;
      for (const v of [xPct, yPct, wPct, hPct]) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(100);
      }
      expect(xPct + wPct).toBeLessThanOrEqual(100);
      expect(yPct + hPct).toBeLessThanOrEqual(100);
      expect(wPct).toBeGreaterThan(0);
      expect(hPct).toBeGreaterThan(0);
    }
  });

  it('every object has a label, aria label, band, reaction, and z', () => {
    const bands = ['background', 'midground', 'foreground'];
    const reactions = ['notice', 'talk', 'think', 'read'];
    for (const h of hotspots) {
      expect(h.label.trim().length).toBeGreaterThan(0);
      expect(h.ariaLabel.trim().length).toBeGreaterThan(0);
      expect(bands).toContain(h.band);
      expect(reactions).toContain(h.reaction);
      expect(Number.isFinite(h.z)).toBe(true);
    }
  });

  it('exactly one object is the résumé download, and it targets resume (law 2)', () => {
    const downloads = hotspots.filter((h) => h.download);
    expect(downloads).toHaveLength(1);
    expect(downloads[0]?.contentId).toBe('resume');
    // The résumé is the only object whose content is a direct download.
    expect(hotspots.filter((h) => h.contentId === 'resume')).toHaveLength(1);
  });

  it('keeps the 4:3 scene aspect', () => {
    expect(SCENE_ASPECT).toBeCloseTo(4 / 3, 5);
  });
});

import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  sceneLayers,
  layerFile,
  SCENE_DIR,
  type SceneLayer,
} from '../../src/lib/sceneLayers';

/**
 * scene-layers.ts drives the painted office (Phase 5). These guard the manifest
 * so a missing tier, a broken placement, or a re-encode that blows the ≤700KB
 * scene-art budget (CLAUDE.md §8) can't ship silently.
 */
const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const publicPath = (webPath: string) =>
  resolve(repoRoot, 'public', webPath.replace(/^\/+/, ''));

const FORMATS = ['avif', 'webp'] as const;

// The nine painted layers, back-to-front (V-011 report `layer_order`).
const EXPECTED_ORDER = [
  'background-wall',
  'midground-furniture',
  'desk-surface',
  'swan',
  'desk-occluders',
  'resume-folder',
  'skills-book',
  'telephone',
  'contact-card',
];

const topTier = (layer: SceneLayer) => layer.widths[layer.widths.length - 1]!;

describe('scene layer manifest', () => {
  it('is the nine painted layers in paint order', () => {
    expect(sceneLayers.map((l) => l.id)).toEqual(EXPECTED_ORDER);
  });

  it('has a well-formed placement for every layer', () => {
    for (const l of sceneLayers) {
      if (l.place.kind === 'full') continue;
      const { leftPct, topPct, widthPct } = l.place;
      for (const v of [leftPct, topPct, widthPct]) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(100);
      }
      expect(widthPct).toBeGreaterThan(0);
      expect(leftPct + widthPct).toBeLessThanOrEqual(100);
    }
  });

  it('has ascending widths and a positive intrinsic size', () => {
    for (const l of sceneLayers) {
      expect(l.widths.length).toBeGreaterThan(0);
      const sorted = [...l.widths].sort((a, b) => a - b);
      expect(l.widths).toEqual(sorted);
      expect(l.intrinsic.w).toBeGreaterThan(0);
      expect(l.intrinsic.h).toBeGreaterThan(0);
    }
  });

  it('ships every referenced tier file (avif + webp) in public/assets/scene', () => {
    for (const l of sceneLayers) {
      for (const w of l.widths) {
        for (const fmt of FORMATS) {
          const web = layerFile(l, w, fmt);
          expect(web.startsWith(`${SCENE_DIR}/`)).toBe(true);
          expect(existsSync(publicPath(web)), `missing ${web}`).toBe(true);
        }
      }
    }
  });

  it('keeps the largest-breakpoint packs under the 700KB scene-art budget (§8)', () => {
    for (const fmt of FORMATS) {
      const bytes = sceneLayers.reduce(
        (sum, l) => sum + statSync(publicPath(layerFile(l, topTier(l), fmt))).size,
        0
      );
      expect(bytes, `${fmt} top-tier pack ${bytes} bytes`).toBeLessThanOrEqual(700_000);
    }
  });
});

/**
 * sceneLayers.ts — the painted office as typed layer data (Phase 5).
 *
 * The four depth layers reconstruct the *fully clean* office (Swan and every
 * liftable prop removed) byte-identically; Swan and the four movable props then
 * composite on top. So the runtime stack is nine layers, painted back-to-front:
 *
 *   background-wall → midground-furniture → desk-surface → Swan → desk-occluders
 *     → résumé folder → skills book → telephone handset → contact card
 *
 * (layer order is authoritative — V-011 report `layer_order`.)
 *
 * Placements are in scene-relative percentages so one coordinate system survives
 * responsive scaling (§8), and they are REGISTERED, not estimated:
 *  - the four depth layers are full-frame (2896×2172, the exact scene 4:3 box);
 *  - Swan is placed at the approved integration coordinates (V-005 review:
 *    top-left (689,176), 448×560, in the 1448×1086 canvas);
 *  - each prop is placed from its approved object mask bbox minus the cutout's
 *    own transparent border, so the painted pixels land exactly where they were
 *    cut from the master.
 *
 * All files are the approved, byte-identical runtime exports copied into
 * `public/assets/scene/` (never re-encoded — the top breakpoint is the gated
 * ≤700KB pack). AVIF is primary (byte-identical to the gate at every tier);
 * WebP is the fallback (gated 2896w scene layers, smaller tiers below).
 */

/** Where a layer sits in the scene box. */
export type LayerPlace =
  | { kind: 'full' }
  | { kind: 'rect'; leftPct: number; topPct: number; widthPct: number };

export interface SceneLayer {
  /** Stable id (also the CSS hook `scene-layer--<id>`). */
  id: string;
  /** Filename stem shared by every tier/format under `/assets/scene/`. */
  stem: string;
  /** Responsive widths available for this layer (ascending). */
  widths: number[];
  /** Whether the width token carries a trailing `w` (scene/props do, Swan doesn't). */
  wSuffix: boolean;
  /** Intrinsic pixel size of the source (drives aspect-ratio → no CLS). */
  intrinsic: { w: number; h: number };
  place: LayerPlace;
}

/** Public directory the runtime tiers were copied into (Phase 5 task 1). */
export const SCENE_DIR = '/assets/scene';

/**
 * The nine painted layers in paint order (index = z, lower is further back).
 * Swan is index 3; Phase 6 replaces this static pose with the Rive duck in the
 * same slot (the calm static pose remains the pre-Rive / reduced-motion image).
 */
export const sceneLayers: SceneLayer[] = [
  {
    id: 'background-wall',
    stem: 'scene-background-wall--v01',
    widths: [724, 1448, 2896],
    wSuffix: true,
    intrinsic: { w: 2896, h: 2172 },
    place: { kind: 'full' },
  },
  {
    id: 'midground-furniture',
    stem: 'scene-midground-furniture--v01',
    widths: [724, 1448, 2896],
    wSuffix: true,
    intrinsic: { w: 2896, h: 2172 },
    place: { kind: 'full' },
  },
  {
    id: 'desk-surface',
    stem: 'scene-desk-surface--v01',
    widths: [724, 1448, 2896],
    wSuffix: true,
    intrinsic: { w: 2896, h: 2172 },
    place: { kind: 'full' },
  },
  {
    // The calm static Swan (V-005). Registered to the approved integration spot.
    id: 'swan',
    stem: 'calm-static-swan--v01',
    widths: [320, 640, 1280],
    wSuffix: false,
    intrinsic: { w: 1280, h: 1600 },
    place: { kind: 'rect', leftPct: 47.58, topPct: 16.21, widthPct: 30.94 },
  },
  {
    // Desk front lip / papers that occlude Swan's lower body — sits above Swan.
    id: 'desk-occluders',
    stem: 'scene-desk-occluders--v01',
    widths: [724, 1448, 2896],
    wSuffix: true,
    intrinsic: { w: 2896, h: 2172 },
    place: { kind: 'full' },
  },
  {
    id: 'resume-folder',
    stem: 'interactive-resume-folder--v01',
    widths: [170, 341, 682],
    wSuffix: true,
    intrinsic: { w: 341, h: 205 },
    place: { kind: 'rect', leftPct: 48.13, topPct: 73.30, widthPct: 23.55 },
  },
  {
    id: 'skills-book',
    stem: 'interactive-skills-book-shelf-cutout--v01',
    widths: [30, 59, 118],
    wSuffix: true,
    intrinsic: { w: 59, h: 113 },
    place: { kind: 'rect', leftPct: 35.57, topPct: 29.47, widthPct: 4.07 },
  },
  {
    id: 'telephone',
    stem: 'interactive-telephone-handset--v02',
    widths: [52, 105, 210],
    wSuffix: true,
    intrinsic: { w: 105, h: 128 },
    place: { kind: 'rect', leftPct: 76.52, topPct: 64.18, widthPct: 7.25 },
  },
  {
    id: 'contact-card',
    stem: 'interactive-contact-card-rest--v01',
    widths: [64, 128, 256],
    wSuffix: true,
    intrinsic: { w: 128, h: 85 },
    place: { kind: 'rect', leftPct: 85.77, topPct: 78.18, widthPct: 8.84 },
  },
];

/** Filename for one tier/format, e.g. `/assets/scene/scene-desk-surface--v01-1448w.avif`. */
export function layerFile(layer: SceneLayer, width: number, fmt: 'avif' | 'webp'): string {
  return `${SCENE_DIR}/${layer.stem}-${width}${layer.wSuffix ? 'w' : ''}.${fmt}`;
}

/** `srcset` string for a layer in one format. */
export function layerSrcSet(layer: SceneLayer, fmt: 'avif' | 'webp'): string {
  return layer.widths.map((w) => `${layerFile(layer, w, fmt)} ${w}w`).join(', ');
}

/**
 * `sizes` for a layer. Full-frame layers fill the scene box, whose width is
 * `min(100vw, (100dvh − toolbar) × 4/3)`; approximated as `min(100vw, 133vh)`
 * (a hair larger than actual, so the browser never under-picks a tier). A
 * positioned prop is that box width times its own width fraction.
 */
export const SCENE_BOX_SIZES = 'min(100vw, 133vh)';
export function layerSizes(layer: SceneLayer): string {
  if (layer.place.kind === 'full') return SCENE_BOX_SIZES;
  const f = (layer.place.widthPct / 100).toFixed(3);
  return `calc(${SCENE_BOX_SIZES} * ${f})`;
}

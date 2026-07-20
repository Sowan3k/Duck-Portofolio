/**
 * scene.ts — the nine interactive objects of Swan's Office (CLAUDE.md §4 table).
 *
 * Hotspot geometry is in scene-relative percentages so one coordinate system
 * survives responsive scaling (§8). Coordinates are ESTIMATED from the master
 * scene (visuals/00-references/canonical/ref-01-master-scene.png) for the
 * gray-box; Phase 5 refines them to the painted objects. Do not add or remove
 * objects without an owner decision (§4).
 */

/** Section content an object opens; 'resume' is a direct download, not a panel. */
export type SceneContentId =
  | 'about'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'awards'
  | 'education'
  | 'roadmap'
  | 'contact'
  | 'resume';

/** Duck reaction state driven when an object is activated (wired in Phase 6). */
export type DuckReaction = 'notice' | 'talk' | 'think' | 'read';

/** Depth band (CLAUDE.md §4): back wall → midground furniture → desk foreground. */
export type SceneBand = 'background' | 'midground' | 'foreground';

/** A rectangle as percentages of the scene box (0–100). */
export interface HotspotRect {
  xPct: number;
  yPct: number;
  wPct: number;
  hPct: number;
}

export interface Hotspot {
  id: string;
  contentId: SceneContentId;
  /** Hand-written label revealed on hover/focus/first-tap. */
  label: string;
  /** Accessible button name (verb-led, says what opens). */
  ariaLabel: string;
  rect: HotspotRect;
  /** Paint order within the scene (higher = nearer the viewer). */
  z: number;
  band: SceneBand;
  reaction: DuckReaction;
  /** Résumé folder only: activation downloads the real PDF, no gate (law 2). */
  download?: boolean;
}

/** Master scene is 2896×2172 → 4:3; the scene box always holds this ratio. */
export const SCENE_ASPECT = 4 / 3;

/**
 * The nine objects, ordered to match the CLAUDE.md §4 mapping table. Rects are
 * gray-box estimates read off the master scene; z/band mirror the final art's
 * layer structure so Phase 5 is a swap, not a re-layout.
 */
export const hotspots: Hotspot[] = [
  {
    id: 'nameplate',
    contentId: 'about',
    label: 'About me',
    ariaLabel: 'About Sowan — open the introduction',
    rect: { xPct: 8, yPct: 77, wPct: 17, hPct: 12 },
    z: 40,
    band: 'foreground',
    reaction: 'talk',
  },
  {
    id: 'computer',
    contentId: 'projects',
    label: 'Projects',
    ariaLabel: 'Projects — open the storybook',
    rect: { xPct: 15, yPct: 43, wPct: 16, hPct: 19 },
    z: 30,
    band: 'foreground',
    reaction: 'notice',
  },
  {
    id: 'filing-cabinet',
    contentId: 'experience',
    label: 'Experience',
    ariaLabel: 'Work experience — open the paper folder',
    rect: { xPct: 19, yPct: 22, wPct: 10, hPct: 22 },
    z: 20,
    band: 'midground',
    reaction: 'think',
  },
  {
    id: 'bookshelf',
    contentId: 'skills',
    label: 'Skills',
    ariaLabel: 'Skills and technologies — open the book',
    rect: { xPct: 32, yPct: 5, wPct: 18, hPct: 33 },
    z: 10,
    band: 'background',
    reaction: 'notice',
  },
  {
    id: 'trophy-shelf',
    contentId: 'awards',
    label: 'Awards',
    ariaLabel: 'Awards — open the trophy detail',
    rect: { xPct: 53, yPct: 4, wPct: 12, hPct: 12 },
    z: 10,
    band: 'background',
    reaction: 'talk',
  },
  {
    id: 'graduation-frame',
    contentId: 'education',
    label: 'Education',
    ariaLabel: 'Education — open the framed certificate',
    rect: { xPct: 56, yPct: 22, wPct: 9, hPct: 8 },
    z: 10,
    band: 'background',
    reaction: 'think',
  },
  {
    id: 'resume-folder',
    contentId: 'resume',
    label: 'Résumé (PDF)',
    ariaLabel: 'Download résumé PDF',
    rect: { xPct: 45, yPct: 73, wPct: 18, hPct: 18 },
    z: 40,
    band: 'foreground',
    reaction: 'notice',
    download: true,
  },
  {
    id: 'telephone',
    contentId: 'contact',
    label: 'Contact',
    ariaLabel: 'Contact — open the business card',
    rect: { xPct: 80, yPct: 62, wPct: 18, hPct: 16 },
    z: 40,
    band: 'foreground',
    reaction: 'talk',
  },
  {
    id: 'whiteboard',
    contentId: 'roadmap',
    label: 'Roadmap',
    ariaLabel: "Current goals and roadmap — open the whiteboard",
    rect: { xPct: 76, yPct: 5, wPct: 23, hPct: 24 },
    z: 10,
    band: 'background',
    reaction: 'think',
  },
];

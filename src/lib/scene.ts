/**
 * scene.ts - the nine interactive objects of Swan's Office (CLAUDE.md §4 table).
 *
 * Hotspot geometry is in scene-relative percentages so one coordinate system
 * survives responsive scaling (§8). Phase 5 registered these to the painted
 * objects: the four liftable props come straight from their approved object-mask
 * bounding boxes; Swan and the wall fixtures were read off the master scene /
 * clean plate. Do not add or remove objects without an owner decision (§4).
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
 * registered to the painted art (Phase 5); z/band mirror the scene's layer
 * structure. Where fixtures overlap (monitor in front of the cabinet), the
 * nearer object carries the higher z so clicks resolve to it.
 */
export const hotspots: Hotspot[] = [
  {
    // CLAUDE.md §4: Desk / Duck → About Me. The hotspot sits on Swan's face/torso
    // (Swan is placed at ~48–77% x, 19–65% y); this targets the clear centre.
    id: 'desk-duck',
    contentId: 'about',
    label: 'About me',
    ariaLabel: 'About Sowan - talk to the duck',
    rect: { xPct: 53, yPct: 32, wPct: 18, hPct: 27 },
    z: 40,
    band: 'midground',
    reaction: 'talk',
  },
  {
    // The monitor on the desk, foreground - sits in front of the filing cabinet.
    id: 'computer',
    contentId: 'projects',
    label: 'Projects',
    ariaLabel: 'Projects - open the storybook',
    rect: { xPct: 16, yPct: 44, wPct: 17, hPct: 19 },
    z: 30,
    band: 'foreground',
    reaction: 'notice',
  },
  {
    // The metal filing cabinet's visible upper drawers (above the monitor).
    id: 'filing-cabinet',
    contentId: 'experience',
    label: 'Experience',
    ariaLabel: 'Work experience - open the paper folder',
    rect: { xPct: 17, yPct: 24, wPct: 13, hPct: 20 },
    z: 20,
    band: 'midground',
    reaction: 'think',
  },
  {
    // The whole bookcase (CLAUDE.md §4: Bookshelf → Skills; the rust-red book
    // is just the prop that lifts). Owner call 2026-07-21: the entire shelf is
    // the object, not the one small book. The computer (z30) wins clicks where
    // the two overlap at the shelf's lower-left.
    id: 'bookshelf',
    contentId: 'skills',
    label: 'Skills',
    ariaLabel: 'Skills and technologies - open the book',
    rect: { xPct: 25, yPct: 4, wPct: 24, hPct: 56 },
    z: 10,
    band: 'background',
    reaction: 'notice',
  },
  {
    // The gold trophy + silver plaque on the wall shelf, top centre.
    id: 'trophy-shelf',
    contentId: 'awards',
    label: 'Awards',
    ariaLabel: 'Awards - open the trophy detail',
    rect: { xPct: 54, yPct: 3, wPct: 13, hPct: 15 },
    z: 10,
    band: 'background',
    reaction: 'talk',
  },
  {
    // The small framed certificate on the wall (partly occluded by the chair - 
    // this targets its clear upper-left, above Swan's shoulder; §4 fixture note).
    id: 'graduation-frame',
    contentId: 'education',
    label: 'Education',
    ariaLabel: 'Education - open the framed certificate',
    rect: { xPct: 52, yPct: 21, wPct: 9, hPct: 9 },
    z: 10,
    band: 'background',
    reaction: 'think',
  },
  {
    // The manila résumé folder on the desk (from its object mask).
    id: 'resume-folder',
    contentId: 'resume',
    label: 'Résumé (PDF)',
    ariaLabel: 'Download résumé PDF',
    rect: { xPct: 48, yPct: 73, wPct: 23, hPct: 18 },
    z: 40,
    band: 'foreground',
    reaction: 'notice',
    download: true,
  },
  {
    // The telephone, bottom-right of the desk.
    id: 'telephone',
    contentId: 'contact',
    label: 'Contact',
    ariaLabel: 'Contact - open the business card',
    rect: { xPct: 75, yPct: 61, wPct: 15, hPct: 16 },
    z: 40,
    band: 'foreground',
    reaction: 'talk',
  },
  {
    // The whiteboard on the right wall (its clear upper-right, above the chair).
    id: 'whiteboard',
    contentId: 'roadmap',
    label: 'Roadmap',
    ariaLabel: 'Current goals and roadmap - open the whiteboard',
    rect: { xPct: 77, yPct: 5, wPct: 22, hPct: 27 },
    z: 10,
    band: 'background',
    reaction: 'think',
  },
];

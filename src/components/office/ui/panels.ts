/**
 * panels.ts - which approved blank art skins each object's physical UI, and
 * where its DOM content sits (law 3: text renders over blank props).
 *
 * Insets are REGISTERED to the painted writable areas (2026-07-22, owner
 * review): measured per art (alpha bbox + largest pale region) and then
 * hand-fitted where the surface is tilted (the open books sit at a slight
 * perspective, so their boxes stay conservatively inside the page slant -
 * a rectangle that pokes past a slanted page edge reads as broken physics).
 */
import type { SceneContentId } from '../../../lib/scene';

export interface PanelArt {
  stem: string;
  widths: number[];
  /** Intrinsic art ratio (w / h) for the <img> aspect. */
  ratio: number;
  /** Accessible title for the dialog. */
  title: string;
  /**
   * The readable "sheet" region inside the art box: [top, right, bottom, left]
   * %. Sized to sit WITHIN the prop's flat centre so the prop's own edges
   * (book spine, folder tab, frame, plaque border) stay visible around it and
   * frame it - the content reads as a page resting on the opened object, kept
   * upright for readability (owner review 2026-07-22).
   */
  inset: [number, number, number, number];
  /** Two-page spread → content lays out as columns across the gutter. */
  spread?: boolean;
}

export const UI_DIR = '/assets/ui';

export const PANEL_ART: Record<SceneContentId, PanelArt> = {
  about: {
    stem: 'about-desk-card-blank--v01',
    widths: [480, 960, 1920],
    ratio: 2400 / 1800,
    title: 'About Sowan',
    inset: [15, 17, 29, 17],
  },
  projects: {
    stem: 'projects-storybook-open-spread--v01',
    widths: [600, 1200, 2400],
    ratio: 3000 / 1800,
    title: 'Projects',
    inset: [20, 18, 22, 18],
    spread: true,
  },
  experience: {
    stem: 'experience-folder-open-with-papers--v01',
    widths: [600, 1200, 2400],
    ratio: 3000 / 1800,
    title: 'Work experience',
    inset: [18, 11, 22, 45],
  },
  skills: {
    stem: 'skills-book-open-spread--v01',
    widths: [600, 1200, 2400],
    ratio: 2400 / 1800,
    title: 'Skills & technologies',
    inset: [22, 16, 24, 16],
    spread: true,
  },
  awards: {
    stem: 'award-detail-plaque--v01',
    widths: [480, 960, 1920],
    ratio: 2400 / 1800,
    title: 'Awards',
    inset: [27, 17, 26, 17],
  },
  education: {
    stem: 'education-certificate-framed--v01',
    widths: [600, 1200, 2400],
    ratio: 2800 / 2000,
    title: 'Education',
    inset: [15, 11, 15, 11],
  },
  roadmap: {
    stem: 'whiteboard-enlarged-blank--v01',
    widths: [400, 800, 1600],
    ratio: 2600 / 2900,
    title: 'Current goals & roadmap',
    inset: [10, 10, 10, 10],
  },
  contact: {
    stem: 'contact-business-card-blank-front--v02',
    widths: [360, 720, 1440],
    ratio: 2800 / 1600,
    title: 'Contact',
    inset: [12, 8, 12, 8],
  },
  resume: {
    stem: 'resume-document-blank--v01',
    widths: [400, 800, 1600],
    ratio: 2200 / 3000,
    title: 'Résumé',
    inset: [8, 10, 8, 10],
  },
};

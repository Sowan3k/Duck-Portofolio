/**
 * panels.ts - which approved blank art skins each object's physical UI, and
 * where its DOM content sits (law 3: text renders over blank props). Content
 * insets are gray-box estimates; Phase 5 registers them to the painted art.
 */
import type { SceneContentId } from '../../../lib/scene';

export interface PanelArt {
  stem: string;
  widths: number[];
  /** Intrinsic art ratio (w / h) for the <img> aspect. */
  ratio: number;
  /** Accessible title for the dialog. */
  title: string;
  /** Content region inset within the art box: [top, right, bottom, left] %. */
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
    inset: [15, 11, 15, 11],
  },
  projects: {
    stem: 'projects-storybook-open-spread--v01',
    widths: [600, 1200, 2400],
    ratio: 3000 / 1800,
    title: 'Projects',
    inset: [13, 12, 17, 12],
    spread: true,
  },
  experience: {
    stem: 'experience-folder-open-with-papers--v01',
    widths: [600, 1200, 2400],
    ratio: 3000 / 1800,
    title: 'Work experience',
    inset: [17, 14, 16, 14],
  },
  skills: {
    stem: 'skills-book-open-spread--v01',
    widths: [600, 1200, 2400],
    ratio: 2400 / 1800,
    title: 'Skills & technologies',
    inset: [14, 12, 17, 12],
    spread: true,
  },
  awards: {
    stem: 'award-detail-plaque--v01',
    widths: [480, 960, 1920],
    ratio: 2400 / 1800,
    title: 'Awards',
    inset: [17, 15, 17, 15],
  },
  education: {
    stem: 'education-certificate-framed--v01',
    widths: [600, 1200, 2400],
    ratio: 2800 / 2000,
    title: 'Education',
    inset: [17, 15, 17, 15],
  },
  roadmap: {
    stem: 'whiteboard-enlarged-blank--v01',
    widths: [400, 800, 1600],
    ratio: 2600 / 2900,
    title: 'Current goals & roadmap',
    inset: [13, 11, 13, 11],
  },
  contact: {
    stem: 'contact-business-card-blank-front--v02',
    widths: [360, 720, 1440],
    ratio: 2800 / 1600,
    title: 'Contact',
    inset: [15, 11, 15, 11],
  },
  resume: {
    stem: 'resume-document-blank--v01',
    widths: [400, 800, 1600],
    ratio: 2200 / 3000,
    title: 'Résumé',
    inset: [11, 11, 11, 11],
  },
};

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { profile, PROJECT_MEDIA } from '../../src/content/profile';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const projectSource = resolve(repoRoot, PROJECT_MEDIA.sourceDir);
const projectPublic = resolve(
  repoRoot,
  'public',
  PROJECT_MEDIA.publicDir.replace(/^\/+/, '')
);
const portraitSource = resolve(
  repoRoot,
  'visuals/06-supporting/entry-portrait/approved/runtime'
);
const portraitPublic = resolve(repoRoot, 'public/assets/portrait');

const digest = (path: string): string =>
  createHash('sha256').update(readFileSync(path)).digest('hex');

const projectFiles = profile.projects.flatMap((project) =>
  project.media.flatMap((media) =>
    PROJECT_MEDIA.widths.flatMap((width) =>
      PROJECT_MEDIA.formats.map(
        (format) => `${media.stem}-${width}w.${format}`
      )
    )
  )
);

const portraitFiles = [320, 640, 1200].flatMap((width) =>
  PROJECT_MEDIA.formats.map(
    (format) => `entry-portrait-sowan--v04-inner-${width}w.${format}`
  )
);

describe('Phase 2 public asset copies', () => {
  it('contains exactly the 36 approved project variants byte-for-byte', () => {
    expect(readdirSync(projectPublic).sort()).toEqual([...projectFiles].sort());
    for (const file of projectFiles) {
      const source = resolve(projectSource, file);
      const copy = resolve(projectPublic, file);
      expect(existsSync(source), `missing approved source ${file}`).toBe(true);
      expect(digest(copy), `public copy drifted: ${file}`).toBe(digest(source));
    }
  });

  it('contains exactly the six approved v04 portrait variants byte-for-byte', () => {
    expect(readdirSync(portraitPublic).sort()).toEqual([...portraitFiles].sort());
    for (const file of portraitFiles) {
      const source = resolve(portraitSource, file);
      const copy = resolve(portraitPublic, file);
      expect(existsSync(source), `missing approved source ${file}`).toBe(true);
      expect(digest(copy), `public copy drifted: ${file}`).toBe(digest(source));
    }
  });
});

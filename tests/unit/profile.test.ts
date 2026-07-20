import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  profile,
  newspaper,
  stickyNotes,
  PROJECT_MEDIA,
} from '../../src/content/profile';

/**
 * profile.ts is the single source of truth (LAW 4). These tests are the guard
 * that keeps it truthful and complete: required fields present, no placeholders,
 * URLs valid, media maps to real files, and the CV's non-negotiable
 * truthfulness flags cannot be softened without a red test.
 */

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));

/** Every human-readable string in the profile, flattened for substring checks. */
function allProfileText(): string {
  return JSON.stringify(profile);
}

const HTTPS_URL = /^https:\/\/[^\s]+$/;
const GITHUB_REPO = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/;

const EXPECTED_PROJECT_REPOS: Record<string, string[]> = {
  bahasabot: ['https://github.com/Sowan3k/BahasaBot'],
  'virtual-zara': [],
  'my-bibi': ['https://github.com/Sowan3k/My-Bibi-App'],
  'usm-evently': ['https://github.com/Sowan3k/usm_evently'],
};

const EXPECTED_MEDIA_STEMS: Record<string, string[]> = {
  bahasabot: ['bahasabot-overview--v01', 'bahasabot-course-builder--v01'],
  'virtual-zara': [],
  'my-bibi': ['my-bibi-chat--v01', 'my-bibi-mobile-flow--v01'],
  'usm-evently': [
    'usm-evently-overview--v01',
    'usm-evently-analytics--v01',
  ],
};

function expectAllStringsNonEmpty(value: unknown, path = 'content'): void {
  if (typeof value === 'string') {
    expect(value.trim(), `${path} must not be empty`).not.toBe('');
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      expectAllStringsNonEmpty(item, `${path}[${index}]`)
    );
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      expectAllStringsNonEmpty(item, `${path}.${key}`);
    }
  }
}

describe('identity', () => {
  it('has canonical name, known-as, headline, status, location, summary', () => {
    expect(profile.name).toBe('Noor Mohammad Sowan');
    expect(profile.knownAs).toBe('Sowan');
    for (const field of [
      profile.headline,
      profile.status,
      profile.location,
      profile.summary,
    ]) {
      expect(field.trim().length).toBeGreaterThan(0);
    }
  });

  it('summary names the real, checkable facts', () => {
    expect(profile.summary).toContain('249');
    expect(profile.summary).toContain('PIXEL 2026');
  });
});

describe('contact — email, GitHub, LinkedIn only, no phone', () => {
  it('publishes exactly the three allowed channels', () => {
    const kinds = profile.contact.map((c) => c.kind).sort();
    expect(kinds).toEqual(['email', 'github', 'linkedin']);
  });

  it('has valid hrefs and the exact current contact values', () => {
    for (const link of profile.contact) {
      expect(link.label.trim().length).toBeGreaterThan(0);
      expect(link.href.trim().length).toBeGreaterThan(0);
      expect(() => new URL(link.href)).not.toThrow();
    }
    const github = profile.contact.find((c) => c.kind === 'github');
    expect(github?.href).toBe('https://github.com/Sowan3k');
    const email = profile.contact.find((c) => c.kind === 'email');
    expect(email).toMatchObject({
      label: 'nurmohammadsowan119@gmail.com',
      href: 'mailto:nurmohammadsowan119@gmail.com',
    });
    const linkedin = profile.contact.find((c) => c.kind === 'linkedin');
    expect(linkedin).toMatchObject({
      label: 'linkedin.com/in/noor-mohammad-sowan-b3742b37b',
      href: 'https://www.linkedin.com/in/noor-mohammad-sowan-b3742b37b',
      swappable: true,
    });
  });

  it('never exposes a phone number anywhere in the profile', () => {
    const text = allProfileText();
    // The CV phone is +60 14-520 2958; guard against it and any phone-shaped run.
    expect(text).not.toContain('+60');
    expect(text).not.toMatch(/\b\d{2,4}[-\s]\d{3,4}[-\s]\d{3,4}\b/);
  });
});

describe('single source of truth', () => {
  it('Base.astro derives owner identity from profile.ts', () => {
    const source = readFileSync(resolve(repoRoot, 'src/layouts/Base.astro'), 'utf8');
    expect(source).toContain("import { profile } from '../content/profile'");
    expect(source).toContain('profile.knownAs');
    expect(source).toContain('profile.name');
    expect(source).not.toContain('Noor Mohammad Sowan');
  });
});

describe('education', () => {
  it('has USM with an unmistakable completion status and no repeated award', () => {
    const usm = profile.education[0];
    expect(usm).toBeDefined();
    expect(usm?.institution).toContain('Universiti Sains Malaysia');
    expect(usm?.status.toLowerCase()).toContain('graduating');
    // CV: the PIXEL award must NOT be repeated in the education entry.
    expect(JSON.stringify(usm)).not.toContain('PIXEL');
    expect(JSON.stringify(usm)).not.toMatch(/silver/i);
  });
});

describe('experience', () => {
  it('keeps the ECTrons title unchanged and prints the mandatory ESS context', () => {
    const ectrons = profile.experience.find((e) =>
      e.organization.includes('ECTrons')
    );
    expect(ectrons).toBeDefined();
    // Title never changed (background check sees the letter).
    expect(ectrons?.role).toBe(
      'Firmware / Embedded Software Development Engineer (Trainee)'
    );
    // Mandatory verbatim explanation of the AI-automation reality.
    expect(ectrons?.context).toBe(
      'Assigned to internal AI automation and workflow projects, Engineering Support and Services (ESS) department.'
    );
    expect(ectrons?.bullets.length).toBeGreaterThan(0);
  });

  it('keeps Museum Hotel labelled part-time', () => {
    const hotel = profile.experience.find((e) =>
      e.organization.includes('Museum Hotel')
    );
    expect(hotel?.employmentType).toBe('part-time');
  });

  it('every experience bullet is non-empty', () => {
    for (const e of profile.experience) {
      for (const b of e.bullets) expect(b.trim().length).toBeGreaterThan(0);
    }
  });
});

describe('projects — exactly four featured, in order', () => {
  it('is the locked roster in the locked order', () => {
    expect(profile.projects.map((p) => p.id)).toEqual([
      'bahasabot',
      'virtual-zara',
      'my-bibi',
      'usm-evently',
    ]);
  });

  it('every project has the required non-empty fields', () => {
    for (const p of profile.projects) {
      expect(p.name.trim().length).toBeGreaterThan(0);
      expect(p.tagline.trim().length).toBeGreaterThan(0);
      expect(p.status.trim().length).toBeGreaterThan(0);
      expect(p.summary.trim().length).toBeGreaterThan(0);
      expect(p.bullets.length).toBeGreaterThan(0);
      expect(p.stack.length).toBeGreaterThan(0);
      for (const b of p.bullets) expect(b.trim().length).toBeGreaterThan(0);
    }
  });

  it('all project links are valid URLs with the verified repository names', () => {
    for (const p of profile.projects) {
      for (const link of p.links) {
        expect(link.href).toMatch(HTTPS_URL);
        expect(() => new URL(link.href)).not.toThrow();
        if (link.kind === 'repo') expect(link.href).toMatch(GITHUB_REPO);
      }
      expect(p.links.filter((link) => link.kind === 'repo').map((link) => link.href)).toEqual(
        EXPECTED_PROJECT_REPOS[p.id]
      );
    }
    expect(profile.additionalProjects).toEqual([
      expect.objectContaining({
        name: 'Grab Real-Time Demo',
        href: 'https://github.com/Sowan3k/grab-realtime-demo',
      }),
    ]);
    expect(profile.roadmap.building.href).toBe(
      'https://github.com/Sowan3k/Wayfinder-'
    );
  });

  it('keeps project ids unique', () => {
    const ids = profile.projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('truthfulness flags (LAW 4)', () => {
  const byId = (id: string) => profile.projects.find((p) => p.id === id);

  it('BahasaBot is a "Live demo", never "in production"', () => {
    const b = byId('bahasabot');
    expect(b?.status).toBe('Live demo');
    expect(JSON.stringify(b).toLowerCase()).not.toContain('in production');
    expect(JSON.stringify(b).toLowerCase()).not.toContain('production traffic');
    expect(JSON.stringify(b).toLowerCase()).not.toContain('payment');
    expect(JSON.stringify(b).toLowerCase()).not.toContain('paying user');
    // Canonical demo URL only; the stale link must never appear.
    expect(JSON.stringify(b)).not.toContain('bahasabot-main3');
    expect(b?.links.some((l) => l.href === 'https://bahasa-bot.vercel.app')).toBe(
      true
    );
  });

  it('Virtual Zara is confidential: described only, no media, no links', () => {
    const z = byId('virtual-zara');
    expect(z?.confidential).toBe(true);
    expect(z?.media).toHaveLength(0);
    expect(z?.links).toHaveLength(0);
    expect(z?.note?.toLowerCase()).toContain('confidential');
    expect(z?.note?.toLowerCase()).not.toContain('testimonial');
  });

  it('USM Evently never claims live/deployed and marks payments simulated', () => {
    const e = byId('usm-evently');
    expect(e?.status).toBe('Open source (not deployed)');
    expect(e?.links.every((link) => link.kind === 'repo')).toBe(true);
    const text = JSON.stringify(e).toLowerCase();
    expect(text).not.toContain('in production');
    expect(e?.summary.toLowerCase()).toContain('payments are simulated');
    expect(e?.bullets.join(' ').toLowerCase()).toContain(
      'simulated ticketed payments'
    );
  });

  it('My Bibi says encrypted-at-rest, never end-to-end', () => {
    const m = byId('my-bibi');
    const text = JSON.stringify(m).toLowerCase();
    expect(text).toContain('encryption at rest');
    expect(text).not.toContain('end-to-end');
  });

  it('skills exclude C++, CI/CD, pytest, and Jest (not yet true)', () => {
    const flat = profile.skills.flatMap((t) => t.items).join(' | ').toLowerCase();
    for (const forbidden of ['c++', 'ci/cd', 'pytest', 'jest']) {
      expect(flat).not.toContain(forbidden);
    }
  });

  it('uses exactly the two CV-authorized skill tiers', () => {
    expect(profile.skills.map((tier) => tier.label)).toEqual([
      'Primary',
      'Working knowledge',
    ]);
    for (const tier of profile.skills) {
      expect(tier.items.length).toBeGreaterThan(0);
    }
  });
});

describe('awards referential integrity', () => {
  it('PIXEL Silver carries the real numbers and links to BahasaBot', () => {
    const award = profile.awards.find((a) => a.id === 'pixel-silver');
    expect(award).toBeDefined();
    expect(award?.projectId).toBe('bahasabot');
    const facts = award?.facts.join(' ') ?? '';
    expect(facts).toContain('249');
    expect(facts).toContain('30');
  });

  it('every project.awardId resolves to a real award', () => {
    const ids = new Set(profile.awards.map((a) => a.id));
    for (const p of profile.projects) {
      if (p.awardId) expect(ids.has(p.awardId)).toBe(true);
    }
  });

  it('award ids are unique and every award.projectId resolves both ways', () => {
    const awardIds = profile.awards.map((award) => award.id);
    expect(new Set(awardIds).size).toBe(awardIds.length);
    for (const award of profile.awards) {
      if (!award.projectId) continue;
      const project = profile.projects.find(({ id }) => id === award.projectId);
      expect(project, `missing project ${award.projectId}`).toBeDefined();
      expect(project?.awardId).toBe(award.id);
    }
  });
});

describe('project media maps to real runtime files on disk', () => {
  it('has the exact approved media roster and all runtime variants', () => {
    for (const p of profile.projects) {
      expect(p.media.map((media) => media.stem)).toEqual(
        EXPECTED_MEDIA_STEMS[p.id]
      );
      for (const media of p.media) {
        expect(media).toMatchObject({ width: 1440, height: 720 });
        for (const w of PROJECT_MEDIA.widths) {
          for (const fmt of PROJECT_MEDIA.formats) {
            const rel = `${PROJECT_MEDIA.sourceDir}/${media.stem}-${w}w.${fmt}`;
            expect(existsSync(resolve(repoRoot, rel)), `missing ${rel}`).toBe(true);
          }
        }
        expect(media.alt.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

describe('roadmap (living whiteboard)', () => {
  it('has the exact current build target and learning roster', () => {
    expect(profile.roadmap.building).toEqual({
      text: 'Building Wayfinder — an AI codebase mentor',
      href: 'https://github.com/Sowan3k/Wayfinder-',
    });
    expect(profile.roadmap.learning.map((item) => item.text)).toEqual([
      'LangGraph',
      'CrewAI',
      'MCP',
      'AWS',
      'CI/CD',
      'pytest',
    ]);
    for (const item of profile.roadmap.learning) {
      expect(item.text.trim().length).toBeGreaterThan(0);
      expect(typeof item.done).toBe('boolean');
      if (item.done) {
        expect(item.updated?.trim().length).toBeGreaterThan(0);
      } else {
        expect(item.updated).toBeUndefined();
      }
    }
  });
});

describe('required content completeness', () => {
  it('contains no empty strings across profile or flavor data', () => {
    expectAllStringsNonEmpty({ profile, newspaper, stickyNotes });
  });
});

describe('no placeholders leak (exit criterion)', () => {
  it('the profile carries no TODO(content) markers', () => {
    expect(allProfileText()).not.toContain('TODO(');
  });
});

describe('flavor text is populated and flagged for owner review', () => {
  it('newspaper has a masthead and 5–8 headlines, pending review', () => {
    expect(newspaper.reviewStatus).toBe('pending-owner-review');
    expect(newspaper.masthead.trim().length).toBeGreaterThan(0);
    expect(newspaper.headlines.length).toBeGreaterThanOrEqual(5);
    expect(newspaper.headlines.length).toBeLessThanOrEqual(8);
    for (const h of newspaper.headlines) expect(h.trim().length).toBeGreaterThan(0);
  });

  it('sticky notes are populated and pending review', () => {
    expect(stickyNotes.reviewStatus).toBe('pending-owner-review');
    expect(stickyNotes.notes.length).toBeGreaterThan(0);
    for (const n of stickyNotes.notes) expect(n.trim().length).toBeGreaterThan(0);
  });
});

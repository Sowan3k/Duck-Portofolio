import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * First scaffold test: the locked palette (art_style.md §4) must stay present
 * in tokens.css. A later phase adds real schema tests for dialogue/scene data;
 * this proves the Vitest wiring runs and guards the token source of truth.
 */
const tokensPath = fileURLToPath(
  new URL('../../src/styles/tokens.css', import.meta.url)
);
const tokens = readFileSync(tokensPath, 'utf8');

const REQUIRED_COLORS: Record<string, string> = {
  ink: '#241a12',
  cream: '#efe6d0',
  'wood-dark': '#6b4a2f',
  wood: '#8c6844',
  mustard: '#d9a441',
  green: '#2e7d4f',
  greyblue: '#7b93a6',
  duck: '#f5f0e4',
  bill: '#e8963c',
  suit: '#4a3524',
};

describe('design tokens', () => {
  for (const [name, hex] of Object.entries(REQUIRED_COLORS)) {
    it(`defines --color-${name} as ${hex}`, () => {
      expect(tokens.toLowerCase()).toContain(`--color-${name}: ${hex}`);
    });
  }

  it('declares both type families', () => {
    expect(tokens).toContain('--font-display');
    expect(tokens).toContain('--font-sans');
    expect(tokens).toContain('Patrick Hand');
    expect(tokens).toContain('Inter');
  });
});

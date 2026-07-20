import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * The office island (Phase 3): entry → CRT → gray-box office. Verifies the
 * flow, full keyboard operability, look-around, the standard-view link, the
 * reduced-motion path, sound persistence, and that the overlay is axe-clean.
 */

const A11Y_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

async function comeIn(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: /come in/i }).click();
  await expect(page.locator('.office-overlay[data-view="office"]')).toBeVisible({
    timeout: 4000,
  });
}

test('entry screen shows the portrait, welcome, and enabled controls', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: "Welcome to Swan's Office" })).toBeVisible();
  await expect(page.getByRole('img', { name: /Framed cartoon portrait/ })).toBeVisible();
  const enter = page.getByRole('button', { name: /come in/i });
  await expect(enter).toBeEnabled();
  await expect(enter).toBeFocused(); // whole screen is one CTA
  await expect(page.getByRole('button', { name: /Sound on/i })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Standard view' })).toBeVisible();
});

test('coming in reveals the gray-box office with all nine objects', async ({ page }) => {
  await comeIn(page);
  await expect(page.locator('.hotspot')).toHaveCount(9);
  // The résumé folder is a real download link (law 2), the rest are buttons.
  await expect(page.locator('a.hotspot[href="/resume.pdf"][download]')).toHaveCount(1);
  await expect(page.locator('button.hotspot')).toHaveCount(8);
  await expect(page.getByRole('button', { name: /Look around/i })).toBeVisible();
});

test('is fully keyboard operable: hotspots are reachable and labelled', async ({ page }) => {
  await comeIn(page);
  const projects = page.getByRole('button', { name: /Projects — open the storybook/ });
  await projects.focus();
  await expect(projects).toBeFocused();
  // Activating a non-résumé object reveals its section in the standard view.
  await projects.press('Enter');
  await expect(page.locator('.office-overlay')).toHaveCount(0);
  await expect(page.locator('#projects')).toBeVisible();
});

test('look-around lists every object and Esc closes it', async ({ page }) => {
  await comeIn(page);
  await page.getByRole('button', { name: /Look around/i }).click();
  const nav = page.getByRole('navigation', { name: /Everything in the office/i });
  await expect(nav).toBeVisible();
  await expect(nav.locator('li')).toHaveCount(9);
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
});

test('the standard-view link dismisses the office', async ({ page }) => {
  await comeIn(page);
  await page.locator('.office-controls').getByRole('button', { name: 'Standard view' }).click();
  await expect(page.locator('.office-overlay')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Noor Mohammad Sowan', level: 1 })).toBeVisible();
});

test('the standard view can reopen the office', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Standard view' }).click();
  await expect(page.locator('.office-overlay')).toHaveCount(0);
  await page.getByRole('button', { name: /Visit Swan's Office/i }).click();
  await expect(page.locator('.office-overlay')).toBeVisible();
});

test('reduced motion skips the CRT transition', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await page.getByRole('button', { name: /come in/i }).click();
  await expect(page.locator('.office-overlay[data-view="office"]')).toBeVisible({ timeout: 600 });
  await expect(page.locator('.crt')).toHaveCount(0);
  await context.close();
});

test('the sound preference persists across reloads', async ({ page }) => {
  await comeIn(page);
  await page.locator('.office-controls').getByRole('button', { name: /Sound on/i }).click();
  await expect(
    page.locator('.office-controls').getByRole('button', { name: /Sound off/i })
  ).toBeVisible();
  await page.reload();
  // The entry screen now reflects the persisted preference.
  await expect(page.getByRole('button', { name: /Sound off/i })).toBeVisible();
});

test('office entry and scene have no axe-detectable violations', async ({ page }) => {
  await page.goto('/');
  const entry = await new AxeBuilder({ page })
    .include('.office-overlay')
    .withTags(A11Y_TAGS)
    .analyze();
  expect(entry.violations).toEqual([]);

  await page.getByRole('button', { name: /come in/i }).click();
  await expect(page.locator('.office-overlay[data-view="office"]')).toBeVisible({ timeout: 4000 });
  const office = await new AxeBuilder({ page })
    .include('.office-overlay')
    .withTags(A11Y_TAGS)
    .analyze();
  expect(office.violations).toEqual([]);
});

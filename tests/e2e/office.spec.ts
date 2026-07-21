import { test, expect, type Page, type TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * The office island: entry → CRT → gray-box office → the duck's dialogue →
 * content opens as a physical panel → close → return (CLAUDE.md §5). Also covers
 * the review fixes: CRT input lockout, focus return, mobile first-tap, look-
 * around labels, reduced motion, the JS-failure fallback, and the easter eggs.
 */
const A11Y_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

async function comeIn(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: /come in/i }).click();
  await expect(page.locator('.office-overlay[data-view="office"]')).toBeVisible({ timeout: 4000 });
  // Skip the origin-story intro if it plays.
  const skip = page.getByRole('button', { name: /^Skip/ });
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await expect(page.locator('.dialogue')).toHaveCount(0);
}

/** Activate an object (two taps on touch: select, then open). */
async function openObject(page: Page, id: string, info: TestInfo) {
  const el = page.locator(`[data-object="${id}"]`);
  await el.click();
  if (info.project.name === 'mobile') await el.click();
  await expect(page.locator('.dialogue')).toBeVisible({ timeout: 3000 });
}

async function openPanel(page: Page) {
  // Advance/skip through the lines to the content. Guard each click with a
  // short timeout so a button that detaches mid-close never stalls the run.
  for (let i = 0; i < 8; i += 1) {
    if (await page.locator('.panel').count()) break;
    const next = page.locator('.dialogue__next');
    if (await next.count()) await next.click({ timeout: 1000 }).catch(() => {});
    else await page.waitForTimeout(150);
  }
  await expect(page.locator('.panel')).toBeVisible({ timeout: 3000 });
}

test('the office is server-rendered and marked ready after hydration', async ({ page }) => {
  await page.goto('/');
  // The overlay paints immediately (covers the fetch); hydration then marks the
  // island ready (used by the JS-failure timeout + the reopen button).
  await expect(page.locator('.office-overlay')).toBeVisible();
  await expect(page.locator('html')).toHaveClass(/office-ready/);
});

test('coming in reveals the gray-box office with all nine objects', async ({ page }) => {
  await comeIn(page);
  await expect(page.locator('.hotspot')).toHaveCount(9);
  await expect(page.locator('a.hotspot[href="/resume.pdf"][download]')).toHaveCount(1);
  await expect(page.locator('[data-object="desk-duck"]')).toHaveCount(1); // Desk/Duck → About
});

test('the CRT transition does not accept input (critical fix)', async ({ browser }) => {
  // No reduced-motion → the CRT actually plays, and must lock the scene.
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/');
  await page.getByRole('button', { name: /come in/i }).click();
  await expect(page.locator('.office-overlay[data-view="crt"]')).toBeVisible();
  // During CRT the scene + controls are inert.
  expect(await page.locator('.scene-viewport').evaluate((el) => (el as HTMLElement).inert)).toBe(true);
  // Clicking through the transition must not navigate away.
  await page.mouse.click(200, 400);
  await expect(page.locator('.office-overlay[data-view="office"]')).toBeVisible({ timeout: 4000 });
  await context.close();
});

test('an object opens the duck dialogue, then content as a panel', async ({ page }, info) => {
  await comeIn(page);
  await openObject(page, 'computer', info);
  await expect(page.locator('.dialogue')).toContainText('Swan');
  await openPanel(page);
  const panel = page.getByRole('dialog', { name: 'Projects' });
  await expect(panel).toBeVisible();
  await expect(panel).toContainText('BahasaBot');
});

test('Esc closes content and focus returns to the object (law 7)', async ({ page }, info) => {
  await comeIn(page);
  await openObject(page, 'telephone', info);
  await openPanel(page);
  await page.keyboard.press('Escape');
  await expect(page.locator('.panel')).toHaveCount(0);
  await expect(page.locator('[data-object="telephone"]')).toBeFocused();
});

test('the contact card offers a vCard, and the résumé folder downloads (law 2)', async ({ page }, info) => {
  await comeIn(page);
  // Résumé is a one-tap direct download, no dialogue.
  await expect(page.locator('a.hotspot[href="/resume.pdf"][download]')).toHaveCount(1);
  await openObject(page, 'telephone', info);
  await openPanel(page);
  await expect(page.getByRole('button', { name: /Take a card/i })).toBeVisible();
});

test('look-around lights every object label', async ({ page }) => {
  await comeIn(page);
  await page.getByRole('button', { name: /Look around/i }).click();
  await expect(page.locator('.hotspots')).toHaveClass(/hotspots--show-labels/);
  await expect(page.getByRole('navigation', { name: /Everything in the office/i }).locator('li')).toHaveCount(9);
});

test('Standard view returns to the top of the page and focuses the heading', async ({ page }) => {
  await comeIn(page);
  await page.locator('.office-controls').getByRole('button', { name: 'Standard view' }).click();
  await expect(page.locator('.office-overlay')).toHaveCount(0);
  await expect(page.locator('#page-top')).toBeFocused();
});

test('the standard view can reopen the office and still runs first-visit discovery', async ({ page }) => {
  await page.goto('/');
  await page.locator('html.office-ready').waitFor(); // office hydrates on idle
  await page.getByRole('button', { name: 'Standard view' }).click();
  await expect(page.locator('.office-overlay')).toHaveCount(0);
  await page.getByRole('button', { name: /Visit Swan's Office/i }).click();
  await expect(page.locator('.office-overlay')).toBeVisible();
});

test('touch first tap selects and labels; second tap opens', async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await comeIn(page);
  const el = page.locator('[data-object="computer"]');
  await el.click();
  await expect(el).toHaveClass(/hotspot--selected/); // first tap: selected + labelled
  await expect(page.locator('.dialogue')).toHaveCount(0);
  await el.click();
  await expect(page.locator('.dialogue')).toBeVisible({ timeout: 3000 }); // second tap opens
  await context.close();
});

test('reduced motion skips the CRT and opens content quickly', async ({ browser }, info) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await page.getByRole('button', { name: /come in/i }).click();
  await expect(page.locator('.office-overlay[data-view="office"]')).toBeVisible({ timeout: 600 });
  await expect(page.locator('.crt')).toHaveCount(0);
  const skip = page.getByRole('button', { name: /^Skip/ });
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await openObject(page, 'computer', info);
  await openPanel(page);
  await context.close();
});

test('the "hire" easter egg fires (bible §16)', async ({ page }) => {
  await comeIn(page);
  await page.keyboard.type('hire');
  await expect(page.getByRole('status')).toContainText(/waiting for that command/i);
});

test('office has no axe-detectable violations at entry, scene, and an open panel', async ({ page }, info) => {
  await page.goto('/');
  expect((await new AxeBuilder({ page }).include('.office-overlay').withTags(A11Y_TAGS).analyze()).violations).toEqual([]);
  await comeIn(page);
  expect((await new AxeBuilder({ page }).include('.office-overlay').withTags(A11Y_TAGS).analyze()).violations).toEqual([]);
  await openObject(page, 'computer', info);
  await openPanel(page);
  expect((await new AxeBuilder({ page }).include('.panel').withTags(A11Y_TAGS).analyze()).violations).toEqual([]);
});

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * The standard view is a complete portfolio a recruiter can use without ever
 * seeing the office (law 5). These tests are its contract: every section
 * renders, the résumé is one tap away, no-JS works, and it's axe-clean.
 */

const SECTIONS = [
  'about',
  'experience',
  'projects',
  'skills',
  'awards',
  'education',
  'roadmap',
  'contact',
];

test('every section landmark renders', async ({ page }) => {
  await page.goto('/');
  for (const id of SECTIONS) {
    await expect(page.locator(`section#${id}`)).toBeVisible();
  }
});

test('résumé downloads directly from hero and contact (law 2)', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('a[href="/resume.pdf"][download]');
  await expect(links).toHaveCount(2);
  // The file is actually served.
  const res = await page.request.get('/resume.pdf');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('pdf');
});

test('publishes email, GitHub, LinkedIn — and no phone number', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
  await expect(page.locator('a[href="https://github.com/Sowan3k"]').first()).toBeVisible();
  await expect(page.locator('a[href*="linkedin.com/in/"]').first()).toBeVisible();
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  expect(await page.textContent('body')).not.toContain('+60');
});

test('Virtual Zara is described-only: confidentiality note, no screenshots', async ({ page }) => {
  await page.goto('/');
  const zara = page.locator('article', { hasText: 'Virtual Zara' });
  await expect(zara).toContainText('Confidential');
  await expect(zara.locator('img')).toHaveCount(0);
});

test('skip link is the first focusable element', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const focused = page.locator(':focus');
  await expect(focused).toHaveText('Skip to content');
  await expect(focused).toHaveAttribute('href', '#main');
});

test('the page is complete with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Noor Mohammad Sowan', level: 1 })).toBeVisible();
  for (const id of SECTIONS) {
    await expect(page.locator(`section#${id}`)).toBeVisible();
  }
  await expect(page.locator('a[href="/resume.pdf"][download]').first()).toBeVisible();
  await context.close();
});

test('standard view has no axe-detectable accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

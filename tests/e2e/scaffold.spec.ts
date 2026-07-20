import { test, expect } from '@playwright/test';

// First E2E: the built site serves its two pages. Real per-object and
// standard-view flows arrive in Phases 2–4.
test('home page renders and loads the display font', async ({ page }) => {
  await page.goto('/');
  const heading = page.getByRole('heading', { name: "Swan's Office", level: 1 });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveCSS('font-family', /Patrick Hand/);
});

test('404 page preserves the approved art ratio and DOM caption', async ({ page }) => {
  const res = await page.goto('/missing-page');
  expect(res?.status()).toBe(404);
  await expect(page.getByText('This page flew south.')).toBeVisible();
  const illustration = page.getByRole('img', {
    name: 'Swan the duck standing alone, looking a little lost.',
  });
  await expect(illustration).toHaveAttribute('width', '480');
  await expect(illustration).toHaveAttribute('height', '600');
});

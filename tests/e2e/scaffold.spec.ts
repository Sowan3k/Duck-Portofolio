import { test, expect } from '@playwright/test';

// Basic scaffold guarantees. Full standard-view coverage is in standard.spec.ts.
test('home page loads with the display font wired', async ({ page }) => {
  await page.goto('/');
  const heading = page.getByRole('heading', { name: 'Noor Mohammad Sowan', level: 1 });
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

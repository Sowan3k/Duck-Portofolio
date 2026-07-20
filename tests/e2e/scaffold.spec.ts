import { test, expect } from '@playwright/test';

// First E2E: the built site serves its two pages. Real per-object and
// standard-view flows arrive in Phases 2–4.
test('home page renders and loads the display font', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: "Swan's Office", level: 1 })).toBeVisible();
});

test('404 page shows the DOM caption', async ({ page }) => {
  const res = await page.goto('/404.html');
  expect(res?.status()).toBe(200);
  await expect(page.getByText('This page flew south.')).toBeVisible();
});

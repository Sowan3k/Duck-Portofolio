import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * The standard view is a complete portfolio a recruiter can use without ever
 * seeing the office (law 5): the no-JS surface, the SEO surface, and one tap
 * from the office. With JS the office overlay covers it on load, so these tests
 * reach it the way a visitor does — via the "Standard view" link — or with JS
 * disabled (its canonical form).
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

/** Land on the page and dismiss the office overlay to reach the standard view. */
async function openStandardView(page: Page) {
  await page.goto('/');
  // The office hydrates on idle; wait for it before driving its controls.
  await page.locator('html.office-ready').waitFor();
  await page.getByRole('button', { name: 'Standard view' }).click();
  await expect(page.locator('.office-overlay')).toHaveCount(0);
}

test('every section landmark renders', async ({ page }) => {
  await openStandardView(page);
  for (const id of SECTIONS) {
    await expect(page.locator(`section#${id}`)).toBeVisible();
  }
});

test('renders meaningful profile content, not empty section shells', async ({ page }) => {
  await openStandardView(page);
  await expect(
    page.getByRole('heading', { name: 'Noor Mohammad Sowan', level: 1 })
  ).toBeVisible();
  await expect(page.locator('#experience li.card')).toHaveCount(2);
  await expect(page.locator('#projects article')).toHaveCount(4);
  await expect(page.locator('#projects')).toContainText(
    'A real-time operations dashboard (CSE443 coursework)'
  );
  await expect(page.locator('#skills .chip')).not.toHaveCount(0);
  await expect(page.locator('footer')).toContainText('Noor Mohammad Sowan');
});

test('résumé downloads directly from hero and contact (law 2)', async ({ page }) => {
  await openStandardView(page);
  const links = page.locator('#standard-view a[href="/resume.pdf"][download]');
  await expect(links).toHaveCount(2);
  // The file is actually served.
  const res = await page.request.get('/resume.pdf');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('pdf');
});

test('publishes email, GitHub, LinkedIn — and no phone number', async ({ page }) => {
  await openStandardView(page);
  await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
  await expect(page.locator('a[href="https://github.com/Sowan3k"]').first()).toBeVisible();
  await expect(page.locator('a[href*="linkedin.com/in/"]').first()).toBeVisible();
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  expect(await page.textContent('body')).not.toContain('+60');
});

test('Virtual Zara is described-only: confidentiality note, no screenshots', async ({ page }) => {
  await openStandardView(page);
  const zara = page.locator('article', { hasText: 'Virtual Zara' });
  await expect(zara).toContainText('Confidential');
  await expect(zara.locator('img')).toHaveCount(0);
});

test('skip link is the first focusable element (no-JS standard view)', async ({ browser }) => {
  // The skip link is the standard view's keyboard entry point; test it in the
  // canonical no-JS surface where the standard view is the whole page.
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await page.keyboard.press('Tab');
  const focused = page.locator(':focus');
  await expect(focused).toHaveText('Skip to content');
  await expect(focused).toHaveAttribute('href', '#main');
  await context.close();
});

test('the page is complete with JavaScript disabled', async ({ browser }, testInfo) => {
  const mobile = testInfo.project.name === 'mobile';
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: mobile ? { width: 390, height: 851 } : { width: 1280, height: 720 },
    isMobile: mobile,
    hasTouch: mobile,
  });
  const page = await context.newPage();
  await page.goto('/');
  // No JS → the office overlay is hidden and the standard view is the page.
  await expect(page.locator('.office-overlay')).toBeHidden();
  await expect(page.getByRole('heading', { name: 'Noor Mohammad Sowan', level: 1 })).toBeVisible();
  for (const id of SECTIONS) {
    await expect(page.locator(`section#${id}`)).toBeVisible();
  }
  await expect(page.locator('a[href="/resume.pdf"][download]').first()).toBeVisible();
  await expect(page.locator('#projects article')).toHaveCount(4);
  await context.close();
});

test('responsive images use approved formats and loading priorities', async ({ page }) => {
  await openStandardView(page);
  const images = page.locator('#standard-view main img, #standard-view header img');
  await expect(images).toHaveCount(7);

  const hero = page.locator('#standard-view header picture');
  await expect(hero.locator('source[type="image/avif"]')).toHaveCount(1);
  await expect(hero.locator('source[type="image/webp"]')).toHaveCount(1);
  // The hero is lazy (not eager/high-priority): it sits under the office entry
  // on load, so only the entry portrait gets high priority (keeps LCP low).
  await expect(hero.locator('img')).toHaveAttribute('loading', 'lazy');

  const projectImages = page.locator('#projects img');
  await expect(projectImages).toHaveCount(6);
  for (let index = 0; index < 6; index += 1) {
    await expect(projectImages.nth(index)).toHaveAttribute('loading', 'lazy');
  }
});

test('SEO artifacts and server-rendered content are present', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://swans-office.pages.dev/'
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /projects, experience, skills, and contact details/
  );

  // The standard view is server-rendered (the SEO baseline) — present in the
  // raw HTML without executing any script.
  const html = await (await page.request.get('/')).text();
  expect(html).toContain('Noor Mohammad Sowan');
  expect(html).toContain('id="projects"');
  expect(html).toContain('id="standard-view"');

  const robots = await page.request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('/sitemap-index.xml');
  const sitemap = await page.request.get('/sitemap-index.xml');
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain(
    'https://swans-office.pages.dev/sitemap-0.xml'
  );
  const routes = await page.request.get('/sitemap-0.xml');
  expect(routes.status()).toBe(200);
  expect(await routes.text()).toContain(
    '<loc>https://swans-office.pages.dev/</loc>'
  );
});

test('has no horizontal overflow at the supported viewport edges', async ({ page }) => {
  for (const viewport of [
    { width: 360, height: 800 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await openStandardView(page);
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test('button-style links meet the 44px mobile target', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 851 });
  await openStandardView(page);
  const buttons = page.locator('#standard-view a.btn');
  for (let index = 0; index < (await buttons.count()); index += 1) {
    const box = await buttons.nth(index).boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
});

test('standard view has no axe-detectable accessibility violations', async ({ page }) => {
  await openStandardView(page);
  const results = await new AxeBuilder({ page })
    .include('#standard-view')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

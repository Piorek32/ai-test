import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('shows the Dodge Charger hero with animated title', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('hero')).toBeVisible();
    await expect(page.getByTestId('hero-image')).toHaveAttribute(
      'alt',
      'Dodge Charger SRT Hellcat Redeye Widebody',
    );
    await expect(page.getByRole('heading', { name: 'Dodge Charger' })).toBeVisible();
    await expect(page.getByTestId('hero-subtitle')).toHaveText(
      'American muscle. Pure V8 attitude.',
    );

    const lastLetter = page.getByTestId('hero-title').locator('.letter').last();
    await expect(lastLetter).toHaveCSS('animation-name', /rise/);
    await expect(lastLetter).toHaveCSS('opacity', '1');
  });
});

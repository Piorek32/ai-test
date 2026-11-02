import { expect, test } from '@playwright/test';

test.describe('About page', () => {
  test('is reachable from the navigation bar', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-about').click();

    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole('heading', { name: 'O projekcie' })).toBeVisible();
    await expect(page.getByTestId('about-text')).toHaveText(
      'Aplikacja pisana przez AI, recenzowana przez człowieka.',
    );
  });
});

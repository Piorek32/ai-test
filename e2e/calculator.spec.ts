import { expect, test } from '@playwright/test';

test.describe('Calculator page', () => {
  test('is reachable from the home page nav bar', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-calculator').click();

    await expect(page).toHaveURL(/\/calculator$/);
    await expect(page.getByTestId('calculator')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Calculator' })).toBeVisible();
    await expect(page.getByTestId('nav-calculator')).toHaveAttribute('aria-current', 'page');

    await page.getByTestId('nav-home').click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId('hero')).toBeVisible();
  });
});

import { expect, test } from '@playwright/test';

test.describe('Red page', () => {
  test('is reachable from the navigation bar and has a red background', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-red').click();

    await expect(page).toHaveURL(/\/red$/);
    await expect(page.getByTestId('red-page')).toHaveCSS('background-color', 'rgb(255, 0, 0)');
  });
});

import { expect, test } from '@playwright/test';

test.describe('Counter page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/counter');
  });

  test('increments, decrements and resets', async ({ page }) => {
    const value = page.getByTestId('value');
    await expect(value).toHaveText('0');

    await page.getByTestId('increment').click();
    await page.getByTestId('increment').click();
    await expect(value).toHaveText('2');

    await page.getByTestId('decrement').click();
    await expect(value).toHaveText('1');

    await page.getByTestId('reset').click();
    await expect(value).toHaveText('0');
  });

  test('shows negative values in red', async ({ page }) => {
    await page.getByTestId('decrement').click();

    const value = page.getByTestId('value');
    await expect(value).toHaveText('-1');
    await expect(value).toHaveCSS('color', 'rgb(198, 40, 40)');
  });
});

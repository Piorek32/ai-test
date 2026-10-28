import { expect, Page, test } from '@playwright/test';

const keyIds: Record<string, string> = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
  '.': 'decimal',
  '=': 'equals',
  C: 'clear',
};

async function type(page: Page, keys: string) {
  for (const key of keys) {
    await page.getByTestId(`key-${keyIds[key] ?? key}`).click();
  }
}

test.describe('Calculator page', () => {
  test('is reachable from the home page nav bar', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-calculator').click();

    await expect(page).toHaveURL(/\/calculator$/);
    await expect(page.getByRole('heading', { name: 'Calculator' })).toBeVisible();
    await expect(page.getByTestId('nav-calculator')).toHaveAttribute('aria-current', 'page');

    await page.getByTestId('nav-home').click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId('hero')).toBeVisible();
  });

  test('calculates results', async ({ page }) => {
    await page.goto('/calculator');
    const display = page.getByTestId('display');
    await expect(display).toHaveText('0');

    await type(page, '12+7*2=');
    await expect(display).toHaveText('38');

    await type(page, 'C1.5/0.5=');
    await expect(display).toHaveText('3');

    await type(page, '/0=');
    await expect(display).toHaveText('Error');

    await type(page, 'C');
    await expect(display).toHaveText('0');
  });
});

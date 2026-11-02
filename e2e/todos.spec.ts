import { expect, test } from '@playwright/test';

test.describe('Todos page', () => {
  test('is reachable from the navigation bar and manages tasks', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-todos').click();
    await expect(page).toHaveURL(/\/todos$/);

    await page.getByTestId('todo-input').fill('   ');
    await page.getByTestId('todo-add').click();
    await expect(page.getByTestId('todo-item')).toHaveCount(0);

    for (const text of ['Kup mleko', 'Wyjdź z psem']) {
      await page.getByTestId('todo-input').fill(text);
      await page.getByTestId('todo-add').click();
    }
    await expect(page.getByTestId('todo-item')).toHaveCount(2);
    await expect(page.getByTestId('todo-remaining')).toHaveText('Pozostało: 2');

    await page.getByTestId('todo-checkbox').first().check();
    await expect(page.getByTestId('todo-text').first()).toHaveClass(/done/);
    await expect(page.getByTestId('todo-remaining')).toHaveText('Pozostało: 1');

    await page.getByTestId('todo-remove').first().click();
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByTestId('todo-remaining')).toHaveText('Pozostało: 1');
  });
});

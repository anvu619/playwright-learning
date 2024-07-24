import { test, expect } from '@playwright/test'

test('TC003 - Verify Dropdown', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole('link', { name: 'Dropdown' }).click();
    await expect(page.getByRole('heading', { name: 'Dropdown List' })).toBeVisible();
    
    // Select item by label ''Option 2' - The current item is 'Option 2'
    await page.selectOption('#dropdown', { label: 'Option 2' });
    await expect(page.locator('#dropdown option:checked')).toHaveText('Option 2');
    // Select item by index 1 - The current item is 'Option 1'
    await page.selectOption('#dropdown', { index: 1 });
    await expect(page.locator('#dropdown option:checked')).toHaveText('Option 1');
    // Select item by value 2 - The current item is 'Option 2'
    await page.selectOption('#dropdown', '2');
    await expect(page.locator('#dropdown option:checked')).toHaveText('Option 2');
})
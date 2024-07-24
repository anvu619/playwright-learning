import { test, expect } from '@playwright/test'

test('TC001 - Verify Checkboxes', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole('link', { name: 'Checkboxes' }).click();
    await expect(page.getByRole('heading', { name: 'Checkboxes' })).toBeVisible();
    const checkbox1 = page.getByRole('checkbox').nth(0);
    const checkbox2 = page.getByRole('checkbox').nth(1);
    await checkbox1.check();
    expect(await checkbox1.isChecked()).toBeTruthy();
    await checkbox2.uncheck();
    expect(await checkbox2.isChecked()).toBeFalsy();
})
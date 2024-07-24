import { test, expect } from '@playwright/test'

test('TC006 - Verify Dynamically Loaded Page Elements', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole('link', { name: 'Dynamic Loading' }).click();
    await expect(page.getByRole('heading', { name: 'Dynamically Loaded Page Elements' })).toBeVisible();
    await page.getByRole('link', { name: 'Example 1: Element on page that is hidden' }).click();
    await expect(page.getByRole('heading', { name: 'Dynamically Loaded Page Elements' })).toBeVisible();
    await page.getByRole('button', { name: 'Start' }).click();
    //loading Loading... 
    const loading = page.locator('#loading');
    await loading.waitFor({ state: 'visible' });
    await loading.waitFor({ state: 'hidden', timeout: 100000 });
    await expect(page.locator('#finish')).toHaveText('Hello World!');
})
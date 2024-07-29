import { test, expect } from '@playwright/test';

test('test without POM', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    await page.getByLabel('Username').fill('practice');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('b')).toContainText('You logged into a secure area!');
});
import { test, expect } from '@playwright/test'

test('TC007 - Verify input', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect(page.getByRole('heading', { name: 'Automation Testing Practice' })).toBeVisible();
    const nameLocator = page.locator('#name');
    const nameInput = 'Name_007';
    await nameLocator.fill(nameInput);
    expect(await nameLocator.inputValue()).toEqual(nameInput);

    const addressLocator = page.locator('#textarea');
    const addressInput = 'Address_007';
    await addressLocator.fill(addressInput);
    expect(await addressLocator.inputValue()).toEqual(addressInput);

    await nameLocator.clear();
    expect(await nameLocator.inputValue()).toEqual('');
    await addressLocator.clear();
    expect(await addressLocator.inputValue()).toEqual('');
})
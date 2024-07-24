import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
});

test('TC007 - Verify input', { tag: '@regression' }, async ({ page }) => {
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

test('TC008 - Verify prompt dialog', { tag: ['@regression', '@smoke'] }, async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Automation Testing Practice' })).toBeVisible();
    const testButton = await page.waitForSelector('button[onclick="myFunctionPrompt()"]');
    await testButton.click();

    page.on('dialog', async dialog=>{
        expect(dialog.type()).toContain('prompt');
        expect(dialog.message()).toContain('Please enter your name:');
        expect(dialog.defaultValue()).toContain('Harry Potter');
        const inputName = 'An Vu';
        await dialog.accept(inputName);
        await expect(page.locator('p').textContent()).resolves.toContain(`Hello ${inputName}! How are you today?`);
    })
})
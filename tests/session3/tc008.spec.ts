import { test, expect } from '@playwright/test'

test('TC008 - Verify prompt dialog', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect(page.getByRole('heading', { name: 'Automation Testing Practice' })).toBeVisible();
    

    page.on('dialog', async dialog=>{
        expect(dialog.type()).toContain('prompt');
        expect(dialog.message()).toContain('Please enter your name:');
        expect(dialog.defaultValue()).toContain('Harry Potter');
        const inputName = 'An Vu';
        await dialog.accept(inputName);
        await expect(page.locator('#demo')).toHaveText(`Hello ${inputName}! How are you today?`);
    })

    const testButton = await page.waitForSelector('button[onclick="myFunctionPrompt()"]');
    await testButton.click();
})
import { test, expect } from '@playwright/test'
import path from 'path';

test('TC005 - Verify Upload file', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole('link', { name: 'File Upload' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { name: 'File Uploader' })).toBeVisible();
    await page.locator('#file-upload').setInputFiles(path.join(__dirname, '../data/tc005File.txt'));
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page.locator('#uploaded-files')).toHaveText('tc005File.txt');
})
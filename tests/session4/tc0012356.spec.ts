import { test, expect } from '@playwright/test'
import path from 'path';

test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
});

test.skip('TC001 - Verify Checkboxes', { tag: '@regression' }, async ({ page }) => {
    await page.getByRole('link', { name: 'Checkboxes' }).click();
    await expect(page.getByRole('heading', { name: 'Checkboxes' })).toBeVisible();
    const checkbox1 = page.getByRole('checkbox').nth(0);
    const checkbox2 = page.getByRole('checkbox').nth(1);
    await checkbox1.check();
    expect(await checkbox1.isChecked()).toBeTruthy();
    await checkbox2.uncheck();
    expect(await checkbox2.isChecked()).toBeFalsy();
})

test('TC002 - Verify Drag and Drop', { tag: '@regression' }, async ({ page }) => {
    await page.getByRole('link', { name: 'Drag and Drop' }).click();
    await expect(page.getByRole('heading', { name: 'Drag and Drop' })).toBeVisible();
    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');
    await columnA.dragTo(columnB);
    expect(await columnA.textContent()).toBe('B');
    expect(await columnB.textContent()).toBe('A');
})

test.fail('TC003 - Verify Dropdown', { tag: '@regression' }, async ({ page }) => {
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

test('TC005 - Verify Upload file', { tag: ['@regression', '@smoke'] }, async ({ page }) => {
    await page.getByRole('link', { name: 'File Upload' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { name: 'File Uploader' })).toBeVisible();
    await page.locator('#file-upload').setInputFiles(path.join(__dirname, '../data/tc005File.txt'));
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page.locator('#uploaded-files')).toHaveText('tc005File.txt');
})

test('TC006 - Verify Dynamically Loaded Page Elements', { tag: '@regression' }, async ({ page }) => {
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
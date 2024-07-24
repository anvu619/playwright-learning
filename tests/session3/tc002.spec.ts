import { test, expect } from '@playwright/test'

test('TC002 - Verify Drag and Drop', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole('link', { name: 'Drag and Drop' }).click();
    await expect(page.getByRole('heading', { name: 'Drag and Drop' })).toBeVisible();
    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');
    await columnA.dragTo(columnB);
    expect(await columnA.textContent()).toBe('B');
    expect(await columnB.textContent()).toBe('A');
})
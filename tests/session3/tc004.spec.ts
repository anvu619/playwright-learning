import { test, expect } from '@playwright/test'

test('TC004 - Verify Frames ', async ({ page }) => {
    await page.goto("https://www.globalsqa.com/demo-site/frames-and-windows/");
    await expect(page.getByRole('heading', { name: 'Frames And Windows' })).toBeVisible();
    await page.getByRole('tab', { name: 'iFrame' }).click();
    
    const iframeLocator = page.frameLocator('iframe[name="globalSqa"]');
    await iframeLocator.locator('#s').waitFor({ state: 'visible', timeout: 60000 });
    await iframeLocator.getByRole('textbox').fill('Playwright');
    await expect(iframeLocator.getByRole('textbox')).toHaveValue('Playwright');
  
    await iframeLocator.getByRole('button').click();
    await expect(iframeLocator.getByText('Sorry, no posts matched your criteria.')).toBeVisible();
})
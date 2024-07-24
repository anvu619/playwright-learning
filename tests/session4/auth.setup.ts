import { test as setup, expect } from '@playwright/test'
import path from 'path';

const credFile = path.join(__dirname, '../credential/.auth/user.json');

setup('Login Account', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toContainText('Products');

    await page.context().storageState({ path: credFile })
  });
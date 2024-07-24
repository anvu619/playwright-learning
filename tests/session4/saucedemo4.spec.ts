import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
});

test('TC001 - Verify sort by price', async ({ page }) => {
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    // select sort
    await page.selectOption('.product_sort_container', { label: 'Price (low to high)' });

    // Get the list of prices
    const priceListString = await page.locator('.inventory_item_price').allTextContents();
    const priceListNumber = priceListString.map(price => parseFloat(price.replace('$', '')));
  
    for (let i = 0; i < priceListNumber.length - 1; i++) {
        expect(priceListNumber[i]).toBeLessThanOrEqual(priceListNumber[i + 1]);
    }
})

test('TC002 - Verify user can order product', async ({ page }) => {
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    const firstItem = page.locator('.inventory_item_description').first();
    const name = await firstItem.locator('.inventory_item_name').textContent();
    await firstItem.locator('#add-to-cart-sauce-labs-backpack').click();
    await firstItem.locator('#remove-sauce-labs-backpack').waitFor({ state: 'visible' });
    expect(await firstItem.locator('#remove-sauce-labs-backpack').textContent()).toBe('Remove');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.locator('.shopping_cart_badge').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    expect(page.locator('.inventory_item_name')).toHaveText(`${name}`);

    await page.locator('#checkout').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
    const first = 'first';
    const last = 'last';
    const postCode = '7600';
    await page.locator('#first-name').fill(first);
    await page.locator('#last-name').fill(last);
    await page.locator('#postal-code').fill(postCode);

    expect(await page.locator('#first-name').inputValue()).toEqual(first);
    expect(await page.locator('#last-name').inputValue()).toEqual(last);
    expect(await page.locator('#postal-code').inputValue()).toEqual(postCode);

    await page.locator('#continue').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    expect(page.locator('.inventory_item_name')).toHaveText(`${name}`);

    await page.locator('#finish').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="complete-text"]')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
})
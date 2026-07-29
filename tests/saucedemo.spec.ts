import { test, expect } from '@playwright/test';

test ('End to end add to cart and checkout', async ({page})=>{
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await expect(page.locator('.inventory_item .inventory_item_name').nth(3)).toHaveText('Sauce Labs Fleece Jacket');
    await page.locator('#add-to-cart-sauce-labs-fleece-jacket').click();
    await expect (page.locator('#remove-sauce-labs-fleece-jacket')).toHaveText('Remove');
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Fleece Jacket');
    await page.locator('#checkout').click();
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await page.locator('#first-name').fill('Testing');
    await page.locator('#last-name').fill('USQ PL');
    await page.locator('#postal-code').fill('77502');
    await page.locator('#continue').click();
    await page.getByText('Checkout: Overview', { exact: true });
    await page.locator('div').filter({ hasText: '1' }).first();
    await page.locator(':text-is("Sauce Labs Fleece Jacket")');
    await page.locator('[data-test="total-info-label"]').isVisible();
    await page.getByText('Total: $53.99', { exact: true });
    await page.locator('#finish').click();
    await page.locator('h2:has-text("Thank you for your order!")').isVisible();
    await page.locator('#back-to-products').click();
    await page.getByText('Products').isVisible();
});

test('Valid login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
});

test('Invalid Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('test');
    await page.locator('#password').fill('test');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Empty login information', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});

test('Missing password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
});

test('Locked user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

test('Invalid credentials > Verify Error > Valid Credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('test');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
});

test('Valid logout ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

});
test('Valid inventory is visible', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await expect(await page.locator('[data-test="inventory-list"]')).toBeVisible();
});

test('Valid inventory count', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    const items = page.locator('[data-test="inventory-item"]');
    const count = await items.count();
    console.log(count);
});

test('Valid inventory name of items', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    const productNames = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    console.log(productNames);
});

test('Valid add to cart for all the items', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    const addToCartButtons = page.locator('button:text("Add to cart")');
    await expect(addToCartButtons).toHaveCount(6);
});

test('Valid price is displayed for all the items', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveCount(6);
});

test('Valid name is displayed for all the items', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(6);
});

test('Valid description is displayed for all the items', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await expect(page.locator('[data-test="inventory-item-desc"]')).toHaveCount(6);
});

test('Adding 1 item to the cart and validate the count on the cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(page.locator('span:has-text("1")')).toBeVisible();

});

test('Adding 2 item to the cart and validate the count on the cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    await expect(page.locator('span:has-text("2")')).toBeVisible();

});

test('Adding all item to the cart and validate the count on the cart, then remove all the items', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-fleece-jacket"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-onesie"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    await expect(page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]')).toBeVisible();
    await expect(page.locator('span').filter({ hasText: '6' })).toBeVisible();
    await page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click();
    await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
    await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
    await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

});

test('Validate filter Name A to Z', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.selectOption('[data-test="product-sort-container"]','az');
    const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    const sortedNames = [...names].sort();expect(names).toEqual(sortedNames);
});

test('Validate filter Name Z to A', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.selectOption('[data-test="product-sort-container"]','za');
    const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
});

test('Validate filter Price Low to High', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.selectOption('[data-test="product-sort-container"]','lohi');
    const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const numericPrices = prices.map(price =>Number(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sortedPrices);
});

test('Validate filter Price High to Low', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.selectOption('[data-test="product-sort-container"]','hilo');
    const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const numericPrices = prices.map(price =>Number(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => b - a);
    expect(numericPrices).toEqual(sortedPrices);
});

test('Details of a product', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.getByText('Sauce Labs Backpack', { exact: true }).click();
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('img.inventory_details_img')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();

});

test('Hamburguer menu is displayed', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();

});

test('Validate options of Hamburguer menu', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.locator('#react-burger-menu-btn').click();
    await expect(page.locator('[data-test="inventory-sidebar-link"]')).toHaveText('All Items');
    await expect(page.locator('[data-test="about-sidebar-link"]')).toHaveText('About');
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toHaveText('Logout');
    await expect(page.locator('[data-test="reset-sidebar-link"]')).toHaveText('Reset App State');

});

test('Close Hamburguer menu', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.locator('#react-burger-menu-btn').click();
    await expect(page.locator('#react-burger-cross-btn:visible')).toBeVisible();
    await page.locator('#react-burger-cross-btn:visible').click();
    await page.getByText('Products').isVisible();

});

test('Validate social networks', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await expect(page.locator('.social_twitter')).toHaveText('Twitter');
    await expect(page.locator('.social_facebook')).toHaveText('Facebook');
    await expect(page.locator('.social_linkedin')).toHaveText('LinkedIn');

});

test('Validate detials of the cart content', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await page.locator('.shopping_cart_badge').click();
    await expect(page.locator('.cart_quantity_label')).toBeVisible();
    await expect(page.locator('.cart_desc_label')).toHaveText('Description')
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_desc')).toBeVisible();
    await expect(page.locator('.inventory_item_price')).toBeVisible();
    await expect(page.locator('#remove-sauce-labs-backpack')).toHaveText('Remove')
    await expect(page.locator('#continue-shopping')).toBeVisible();
    await expect(page.locator('#checkout')).toHaveText('Checkout');
});

test('Validate detials of checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await page.locator('.shopping_cart_badge').click();
    await page.locator('#checkout').click();
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await expect(page.locator('#first-name')).toBeVisible();
    await expect(page.locator('#last-name')).toBeVisible();
    await expect(page.locator(".error-message-container")).toBeVisible();
    await expect(page.locator('#cancel')).toHaveText('Cancel');
    await expect(page.locator("#continue")).toHaveText('Continue')
});

test('Validate detials of confirmation page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await page.locator('.shopping_cart_badge').click();
    await page.locator('#checkout').click();
    await page.locator("#first-name").fill('Test');
    await page.locator("#last-name").fill('USQ');
    await page.locator("#postal-code").fill('77502');
    await page.locator("#continue").click();
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    await expect(page.locator("div[data-test='payment-info-label']")).toHaveText('Payment Information:');
    await expect(page.locator("div[data-test='payment-info-value']")).not.toBeEmpty();
    await expect(page.locator("div[data-test='shipping-info-label']")).toHaveText('Shipping Information:');
    await expect(page.locator("div[data-test='shipping-info-value']")).not.toBeEmpty();
    await expect(page.locator("div[data-test='total-info-label']")).toHaveText('Price Total');
    await expect(page.locator(".summary_subtotal_label")).not.toBeEmpty();
    await expect(page.locator(".summary_total_label")).not.toBeEmpty();
    await expect(page.locator("#cancel")).toBeVisible();
    await expect(page.locator("#finish")).toBeVisible();


});

test('Validate detials of Complete page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginLogo = page.locator('.login_logo');
    await expect(loginLogo).toHaveText('Swag Labs');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.getByText('Products').isVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await page.locator('.shopping_cart_badge').click();
    await page.locator('#checkout').click();
    await page.locator("#first-name").fill('Test');
    await page.locator("#last-name").fill('USQ');
    await page.locator("#postal-code").fill('77502');
    await page.locator("#continue").click();
    await page.locator("#finish").click();
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
    await expect(page.locator('.pony_express')).toBeVisible();
    await expect(page.locator(".complete-header")).toHaveText('Thank you for your order!');
    await expect(page.locator(".complete-text")).toBeVisible();
    await expect(page.locator("#back-to-products")).toBeVisible();

});
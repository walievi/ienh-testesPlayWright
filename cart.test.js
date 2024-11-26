require('dotenv').config();
const { test, expect } = require('@playwright/test');

test.describe('WooCommerce Adicionar ao carrinho', () => {
  test('Add um produto ao carrinho e verificar', async ({ page }) => {
    const appUrl = process.env.APP_URL || 'http://localhost:8080';

    await page.goto(`${appUrl}`);

    await page.click('text="Shop"');

    await expect(page).toHaveURL(/shop/);

    await page.waitForTimeout(1000);

    const firstProduct = page.locator('.product').first();
    await firstProduct.locator('text="Add to cart"').click();

    await expect(firstProduct.locator('button')).toContainText('1 in cart');
  });

  test('Adicionar dois produtos distintos ao carrinho e verificar', async ({ page }) => {
    const appUrl = process.env.APP_URL || 'http://localhost:8080';

    await page.goto(`${appUrl}`);

    await page.click('text="Shop"');

    await expect(page).toHaveURL(/shop/);

    await page.waitForTimeout(1000);

    const firstProduct = page.locator('.product').first();
    await firstProduct.locator('text="Add to cart"').click();

    const secondProduct = page.locator('.product').nth(1);
    await secondProduct.locator('text="Add to cart"').click();

    await expect(firstProduct.locator('button')).toContainText('1 in cart');
    await expect(secondProduct.locator('button')).toContainText('1 in cart');
  });

  test('Adicionar dois produtos do mesmo tipo ao carrinho e verificar', async ({ page }) => {
    const appUrl = process.env.APP_URL || 'http://localhost:8080';

    await page.goto(`${appUrl}`);

    await page.click('text="Shop"');

    await expect(page).toHaveURL(/shop/);

    await page.waitForTimeout(1000);

    const firstProduct = page.locator('.product').first();
    await firstProduct.locator('text="Add to cart"').click();

    await firstProduct.locator('text="Add to cart"').click();

    await expect(firstProduct.locator('button')).toContainText('2 in cart');
  });
});
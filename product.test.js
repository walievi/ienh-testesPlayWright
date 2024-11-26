require('dotenv').config();
const { test, expect } = require('@playwright/test');
const AdminLogin = require('./classes/AdminLogin');

const appUrl = process.env.APP_URL || 'http://localhost:8080';

test.describe('WooCommerce - Manipulação de Produto', () => {
  test('Cria um produto no WooCommerce e verifica na loja', async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: true,
      extraHTTPHeaders: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      },
    });

    const adminLogin = new AdminLogin(context);
    await adminLogin.login('admin', 'admin');

    const page = adminLogin.getPage();

    await page.goto(`${appUrl}/wp-admin/post-new.php?post_type=product`);

    const productName = `Produto Teste ${Math.random().toString(36).slice(-8)}`;
    const productPrice = (Math.floor(Math.random() * 1000) + 1).toString();

    await page.fill('#title', productName);
    await page.fill('#_regular_price', productPrice);

    await page.click('#publish');

    await expect(page.locator('.notice-success').first()).toContainText('Product published.');

    const productUrl = await page.locator('#sample-permalink a').textContent();
    await page.goto(productUrl);

    await expect(page.locator('body')).toContainText(productName);
    await expect(page.locator('body')).toContainText(productPrice);
  });



  test('Alterar valor de produto', async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: true,
      extraHTTPHeaders: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      },
    });

    const adminLogin = new AdminLogin(context);
    await adminLogin.login('admin', 'admin');

    const page = adminLogin.getPage();

    await page.goto(`${appUrl}/wp-admin/edit.php?post_type=product`);

    const productTitle = await page.locator('.row-title:has-text("Produto Teste")').first();

    await productTitle.hover();

    const productName = await productTitle.textContent();
    const product = await productTitle.locator('xpath=../../..');
    const viewUrl = await product.locator('.view a').getAttribute('href');

    await product.locator('.edit a').click();

    const oldPrice = await page.locator('#_regular_price').getAttribute('value');

    const newPrice = (Math.floor(Math.random() * 1000) + 1).toString();
    await page.fill('#_regular_price', newPrice);

    await page.click('#publish');

    await expect(page.locator('#_regular_price')).toHaveValue(newPrice);

    await page.goto(viewUrl);

    await expect(page.locator('body')).toContainText(newPrice);
  });


  test('Remove um produto da loja', async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: true,
      extraHTTPHeaders: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      },
    });

    const adminLogin = new AdminLogin(context);
    await adminLogin.login('admin', 'admin');

    const page = adminLogin.getPage();

    await page.goto(`${appUrl}/wp-admin/edit.php?post_type=product`);

    const productTitle = await page.locator('.row-title:has-text("Produto Teste")').first();

    await productTitle.hover();

    const productName = await productTitle.textContent();
    const product = await productTitle.locator('xpath=../../..');
    const viewUrl = await product.locator('.view a').getAttribute('href');

    await product.locator('.trash a').click();

    await expect(page.locator('body')).not.toContainText(productName);

    await page.goto(viewUrl);

    await expect(page.locator('body')).not.toContainText(productName);
  });
});
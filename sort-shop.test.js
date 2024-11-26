require('dotenv').config();
// const { test, expect } = require('@playwright/test');
//
// test.describe('WooCommerce Adicionar ao carrinho', () => {
//   test('Ordenar produtos por preço menor->maior', async ({ page }) => {
//     const appUrl = process.env.APP_URL || 'http://localhost:8080';
//     await page.goto(`${appUrl}/shop/`);
//
//     const sortSelect = page.locator('select[name="orderby"]');
//     await sortSelect.selectOption('price');
//
//     await page.waitForTimeout(3000); // Tempo para garantir a atualização da lista
//
//     const products = page.locator(' .product');
//     const count = await products.count();
//
//     const prices = [];
//     for (let i = 0; i < count; i++) {
//       const priceText = await products.nth(i).locator('.woocommerce-Price-amount').textContent();
//       const price = parseFloat(priceText.replace(/[^0-9,.]/g, '').replace(',', '.')); // Converte para número
//       prices.push(price);
//     }
//
//     const isSorted = prices.every((price, i, arr) => i === 0 || price >= arr[i - 1]);
//     expect(isSorted).toBeTruthy(); // Falha se os preços não estiverem ordenados
//     console.log('Preços ordenados do menor para o maior:', prices);
//   });
//
//   test('Ordenar produtos por preço maior->menor', async ({ page }) => {
//     const appUrl = process.env.APP_URL || 'http://localhost:8080';
//     await page.goto(`${appUrl}/shop/`);
//
//     const sortSelect = page.locator('select[name="orderby"]');
//     await sortSelect.selectOption('price-desc');
//
//     await page.waitForTimeout(3000); // Tempo para garantir a atualização da lista
//
//     const products = page.locator('.product');
//     const count = await products.count();
//
//     const prices = [];
//     for (let i = 0; i < count; i++) {
//       const priceText = await products.nth(i).locator('.woocommerce-Price-amount').textContent();
//       const price = parseFloat(priceText.replace(/[^0-9,.]/g, '').replace(',', '.')); // Converte para número
//       prices.push(price);
//     }
//
//     const isSorted = prices.every((price, i, arr) => i === 0 || price <= arr[i - 1]);
//     expect(isSorted).toBeTruthy(); // Falha se os preços não estiverem ordenados
//     console.log('Preços ordenados do maior para o menor:', prices);
//   });
// });
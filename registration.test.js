require('dotenv').config();
const { test, expect } = require('@playwright/test');
const UserRegistration = require('./classes/UserRegistration');

test.describe('WooCommerce User Registration', () => {
  test('Register a new user and verify account', async ({ page }) => {
    const userRegistration = new UserRegistration(page);

    const { email, password } = await userRegistration.register();
    await expect(page.locator('body')).toContainText('My account');
  });
});
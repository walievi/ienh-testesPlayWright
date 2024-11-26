require('dotenv').config();
class UserRegistration {
  constructor(page) {
    this.page = page;
    this.hash = Math.random().toString(36).slice(-8);
  }

  /**
   * Gera um email único para o usuário.
   * @returns {string}
   */
  generateEmail() {
    const timestamp = Date.now();
    return `user+${this.hash}@example.com`;
  }

  /**
   * Gera uma senha segura para o usuário.
   * @returns {string}
   */
  generatePassword() {
    return `SecurePass@${this.hash}`;
  }

  /**
   * Registra um novo usuário no WooCommerce.
   * @returns {Promise<{email: string, password: string}>}
   */
  async register() {
    const appUrl = process.env.APP_URL || 'http://localhost:8080';
    const email = this.generateEmail();
    const password = this.generatePassword();

    await this.page.goto(`${appUrl}/my-account/`);

    await this.page.locator('#reg_email').fill(email);
    await this.page.locator('#reg_password').fill(password);

    await this.page.locator('button[name="register"]').evaluate(button => button.click());

    return { email, password };
  }
}

module.exports = UserRegistration;
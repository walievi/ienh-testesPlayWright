require('dotenv').config();
class AdminLogin {
  /**
   * Inicializa a classe com o contexto do navegador e a página.
   * @param {Object} context - O contexto do navegador.
   */
  constructor(context) {
    this.context = context;
    this.page = null;
    this.appUrl = process.env.APP_URL || 'http://localhost:8080'; // URL padrão do WordPress
  }

  /**
   * Realiza o login no painel administrativo do WordPress.
   * @param {string} username - Nome de usuário para login.
   * @param {string} password - Senha para login.
   */
  async login(username = 'admin', password = 'admin') {
    this.page = await this.context.newPage();

    await this.page.goto(`${this.appUrl}/wp-login.php`);

    await this.page.waitForTimeout(500);

    await this.page.fill('#user_login', username); // Usuário
    await this.page.fill('#user_pass', password); // Senha

    await this.page.click('#wp-submit');

    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector('#wpadminbar', { timeout: 10000 });
  }

  /**
   * Retorna a página atual, útil para continuar testes após o login.
   * @returns {Object} A página atual.
   */
  getPage() {
    return this.page;
  }
}

module.exports = AdminLogin;
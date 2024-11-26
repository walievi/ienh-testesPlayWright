require('dotenv').config();
const { test, expect } = require('@playwright/test');
const AdminLogin = require('./classes/AdminLogin');

test.describe('Login no WordPress como Admin', () => {
  test('Faz login no painel administrativo', async ({ browser }) => {
    // Cria o contexto do navegador
    const context = await browser.newContext({
      javaScriptEnabled: true,
      extraHTTPHeaders: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      },
    });

    // Inicializa a classe de login administrativo
    const adminLogin = new AdminLogin(context);

    // Realiza o login
    await adminLogin.login();

    // Recupera a página para continuar os testes
    const page = adminLogin.getPage();

    // Verifica se o painel administrativo foi carregado
    await expect(page.locator('#wpadminbar')).toBeVisible();
  });
});
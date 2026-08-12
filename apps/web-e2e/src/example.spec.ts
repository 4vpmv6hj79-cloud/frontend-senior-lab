import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display the landing page with hero section', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Frontend Senior Lab')).toBeVisible();
    await expect(page.locator('a[href="/diagnostic"]')).toBeVisible();
  });

  test('should navigate to diagnostic from landing', async ({ page }) => {
    await page.goto('/');

    await page.click('a[href="/diagnostic"]');
    await page.waitForURL('**/diagnostic');

    await expect(page.locator('text=Diagnóstico')).toBeVisible();
  });

  test('should toggle language between ES and EN', async ({ page }) => {
    await page.goto('/');

    // Default is Spanish
    await expect(page.locator('text=Iniciar diagnóstico')).toBeVisible();

    // Switch to English
    await page.click('button:has-text("EN")');

    await expect(page.locator('text=Start diagnostic')).toBeVisible();
  });
});

test.describe('Authentication Flow', () => {
  const testEmail = `e2e-${Date.now()}@test.com`;

  test('should navigate to register from login', async ({ page }) => {
    await page.goto('/login');

    await page.click('a[href="/register"]');
    await page.waitForURL('**/register');

    await expect(page.locator('text=Crear cuenta')).toBeVisible();
  });

  test('should show validation errors on empty submit', async ({ page }) => {
    await page.goto('/login');

    await page.click('button[type="submit"]');

    // Form should not navigate (stays on login)
    await expect(page).toHaveURL(/.*login/);
  });

  test('should register a new user and redirect to dashboard', async ({
    page,
  }) => {
    await page.goto('/register');

    await page.fill('input[id*="name"]', 'E2E Test User');
    await page.fill('input[id*="email"]', testEmail);
    await page.fill('input[id*="password"]:not([id*="confirm"])', 'E2eTest123');
    await page.fill('input[id*="confirm"]', 'E2eTest123');

    await page.click('button[type="submit"]');

    await page.waitForURL('**/dashboard', { timeout: 10000 });
    await expect(page.locator('text=E2E Test User')).toBeVisible();
  });

  test('should redirect unauthenticated users to login', async ({ page }) => {
    // Clear any session
    await page.context().clearCookies();
    await page.goto('/dashboard');

    await page.waitForURL('**/login**');
  });
});

test.describe('Diagnostic Flow', () => {
  test('should complete the diagnostic quiz', async ({ page }) => {
    await page.goto('/diagnostic');

    // Should show first question
    await expect(page.locator('text=Pregunta 1')).toBeVisible();

    // Answer all 15 questions
    for (let i = 0; i < 15; i++) {
      // Select the second option (usually a good answer)
      const options = page.locator('button[role="radio"]');
      await options.nth(1).click();

      // Click next (or finish on last question)
      if (i < 14) {
        await page.click('button:has-text("Siguiente")');
      } else {
        await page.click('button:has-text("Finalizar")');
      }
    }

    // Should show results
    await expect(page.locator('text=Resultado')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=%')).toBeVisible();
  });
});

test.describe('Protected Routes Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Register and login for protected route tests
    const email = `nav-${Date.now()}@test.com`;
    await page.goto('/register');

    await page.fill('input[id*="name"]', 'Nav User');
    await page.fill('input[id*="email"]', email);
    await page.fill('input[id*="password"]:not([id*="confirm"])', 'NavTest123');
    await page.fill('input[id*="confirm"]', 'NavTest123');

    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
  });

  test('should access learning page', async ({ page }) => {
    await page.goto('/learning');

    await expect(page.locator('text=Ruta')).toBeVisible();
  });

  test('should access interviews page', async ({ page }) => {
    await page.goto('/interviews');

    await expect(page.locator('text=Simulador')).toBeVisible();
  });

  test('should access profile page', async ({ page }) => {
    await page.goto('/profile');

    await expect(page.locator('text=Perfil')).toBeVisible();
  });
});

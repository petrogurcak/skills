import { test as setup, expect } from '@playwright/test';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // TODO: Replace with your app's login flow
  await page.goto('/login');
  await page.fill('[data-testid="email-input"]', process.env.TEST_USER_EMAIL || 'test@test.com');
  await page.fill('[data-testid="password-input"]', process.env.TEST_USER_PASSWORD || 'test123');
  await page.click('[data-testid="login-btn"]');
  await expect(page).toHaveURL(/dashboard|home/, { timeout: 15000 });

  await page.context().storageState({ path: authFile });
});

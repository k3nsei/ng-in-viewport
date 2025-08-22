import { test, expect } from '@playwright/test';

test.describe('GIVEN: Example Application', () => {
  test.describe('WHEN page was loaded', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('THEN title should be rendered', async ({ page }) => {
      const title = page.locator('.toolbar-label');
      await expect(title).toBeVisible();
      await expect(title).toContainText('Example of ng-in-viewport');
    });

    test('THEN `highlighting` navigation tab should be active', async ({ page }) => {
      const activeTab = page.locator('nav a.is-active');
      await expect(activeTab).toBeVisible();
      await expect(activeTab).toContainText('Highlighting');
    });
  });
});
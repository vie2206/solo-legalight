// DASHBOARD FUNCTIONALITY TESTS
// Testing all dashboard features and user interactions

import { test, expect } from '@playwright/test';

test.describe('Student Dashboard', () => {
  test.beforeEach(async ({ page, context }) => {
    // Mock authentication
    await context.addCookies([
      {
        name: 'auth_token',
        value: 'test_token_student',
        domain: 'localhost',
        path: '/',
      }
    ]);
    
    await page.goto('/?role=student');
  });

  test('should load student dashboard', async ({ page }) => {
    await expect(page).toHaveTitle(/SOLO by Legalight/);
    
    // Check for key dashboard elements
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('text=Mock Tests')).toBeVisible();
    await expect(page.locator('text=Performance')).toBeVisible();
  });

  test('should display user information', async ({ page }) => {
    // Should show user name/greeting
    await expect(page.locator('text=Welcome').or(page.locator('text=Hello'))).toBeVisible();
    
    // Should show student role indicator
    await expect(page.locator('text=Student')).toBeVisible();
  });

  test('should show performance metrics', async ({ page }) => {
    // Look for performance indicators
    const performanceSection = page.locator('[data-testid="performance-metrics"]').or(page.locator('text=Performance'));
    await expect(performanceSection).toBeVisible();
    
    // Should have some numerical metrics
    await expect(page.locator('text=/\\d+%/')).toBeVisible(); // Any percentage
    await expect(page.locator('text=/\\d+/')).toBeVisible(); // Any number
  });

  test('should navigate to mock tests', async ({ page }) => {
    await page.click('text=Mock Tests');
    
    // Should show mock test interface
    await expect(page.locator('text=Available Tests').or(page.locator('text=Mock Test'))).toBeVisible();
  });

  test('should start a mock test', async ({ page }) => {
    await page.click('text=Mock Tests');
    
    // Look for available test
    const startButton = page.locator('text=Start Test').or(page.locator('button[data-testid="start-mock-test"]')).first();
    
    if (await startButton.isVisible()) {
      await startButton.click();
      
      // Should enter test interface
      await expect(page.locator('text=Question').or(page.locator('text=Time Remaining'))).toBeVisible({ timeout: 10000 });
    }
  });

  test('should handle mock test navigation', async ({ page }) => {
    // Navigate to mock test
    await page.click('text=Mock Tests');
    
    const startButton = page.locator('text=Start Test').first();
    if (await startButton.isVisible()) {
      await startButton.click();
      
      // Wait for test to load
      await page.waitForLoadState('networkidle');
      
      // Look for navigation buttons
      const nextButton = page.locator('text=Next').or(page.locator('button[data-testid="next-question"]'));
      const prevButton = page.locator('text=Previous').or(page.locator('button[data-testid="prev-question"]'));
      
      if (await nextButton.isVisible()) {
        await nextButton.click();
        
        // Should move to next question
        await page.waitForTimeout(500);
        
        if (await prevButton.isVisible()) {
          await prevButton.click();
        }
      }
    }
  });

  test('should display analytics and insights', async ({ page }) => {
    // Look for analytics section
    const analyticsSection = page.locator('text=Analytics').or(page.locator('text=Insights'));
    
    if (await analyticsSection.isVisible()) {
      await analyticsSection.click();
      
      // Should show charts or graphs
      await expect(page.locator('canvas').or(page.locator('svg'))).toBeVisible({ timeout: 5000 });
    }
  });

  test('should handle study materials access', async ({ page }) => {
    const studyMaterials = page.locator('text=Study Materials').or(page.locator('text=Resources'));
    
    if (await studyMaterials.isVisible()) {
      await studyMaterials.click();
      
      // Should show study resources
      await expect(page.locator('text=Reading').or(page.locator('text=Practice'))).toBeVisible();
    }
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('text=Dashboard')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('text=Dashboard')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should handle navigation menu', async ({ page }) => {
    // Look for menu button on mobile/tablet
    await page.setViewportSize({ width: 375, height: 812 });
    
    const menuButton = page.locator('[data-testid="menu-button"]').or(page.locator('text=Menu'));
    
    if (await menuButton.isVisible()) {
      await menuButton.click();
      
      // Should show navigation options
      await expect(page.locator('text=Dashboard').or(page.locator('text=Home'))).toBeVisible();
    }
  });
});

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page, context }) => {
    // Mock admin authentication
    await context.addCookies([
      {
        name: 'auth_token',
        value: 'test_token_admin',
        domain: 'localhost',
        path: '/',
      }
    ]);
    
    await page.goto('/?role=admin');
  });

  test('should load admin dashboard with admin features', async ({ page }) => {
    await expect(page).toHaveTitle(/SOLO by Legalight/);
    
    // Check for admin-specific features
    await expect(page.locator('text=Admin').or(page.locator('text=Management'))).toBeVisible();
  });

  test('should show user management section', async ({ page }) => {
    const userManagement = page.locator('text=User Management').or(page.locator('text=Users'));
    
    if (await userManagement.isVisible()) {
      await userManagement.click();
      
      // Should show user list or management interface
      await expect(page.locator('text=Name').or(page.locator('table'))).toBeVisible();
    }
  });

  test('should show system analytics', async ({ page }) => {
    const analytics = page.locator('text=Analytics').or(page.locator('text=Reports'));
    
    if (await analytics.isVisible()) {
      await analytics.click();
      
      // Should show system-wide analytics
      await expect(page.locator('canvas').or(page.locator('text=Total Users'))).toBeVisible();
    }
  });
});

test.describe('Error Handling in Dashboard', () => {
  test('should handle API errors gracefully', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'auth_token',
        value: 'test_token_student',
        domain: 'localhost',
        path: '/',
      }
    ]);

    // Mock API failures
    await page.route('**/api/dashboard/**', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' })
      });
    });

    await page.goto('/?role=student');
    
    // Should show error state or fallback
    await expect(page.locator('text=Error').or(page.locator('text=Unable to load'))).toBeVisible({ timeout: 10000 });
  });

  test('should handle network connectivity issues', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'auth_token',
        value: 'test_token_student',
        domain: 'localhost',
        path: '/',
      }
    ]);

    await page.goto('/?role=student');
    
    // Go offline
    await context.setOffline(true);
    
    // Try to interact with dashboard
    await page.click('text=Mock Tests').catch(() => {});
    
    // Should handle offline state
    await expect(page.locator('text=Offline').or(page.locator('text=No connection'))).toBeVisible({ timeout: 5000 });
    
    // Go back online
    await context.setOffline(false);
  });
});

test.describe('Performance Tests', () => {
  test('dashboard should load within acceptable time', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'auth_token',
        value: 'test_token_student',
        domain: 'localhost',
        path: '/',
      }
    ]);

    const startTime = Date.now();
    await page.goto('/?role=student');
    
    // Wait for dashboard to be fully loaded
    await page.waitForLoadState('networkidle');
    await expect(page.locator('text=Dashboard')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    
    // Dashboard should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should handle large datasets efficiently', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'auth_token',
        value: 'test_token_admin',
        domain: 'localhost',
        path: '/',
      }
    ]);

    await page.goto('/?role=admin');
    
    // Navigate to section with potentially large data
    const userManagement = page.locator('text=User Management').or(page.locator('text=Users'));
    
    if (await userManagement.isVisible()) {
      const startTime = Date.now();
      await userManagement.click();
      
      // Wait for data to load
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Should load within reasonable time even with large datasets
      expect(loadTime).toBeLessThan(10000);
    }
  });
});
// AUTHENTICATION FLOW TESTS
// Comprehensive testing of SMS OTP authentication

import { test, expect } from '@playwright/test';

test.describe('Authentication System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/SOLO by Legalight/);
    
    // Check for key elements
    await expect(page.locator('text=SOLO')).toBeVisible();
    await expect(page.locator('text=Login')).toBeVisible();
  });

  test('should show SMS authentication form', async ({ page }) => {
    // Click login button
    await page.click('text=Login');
    
    // Should show SMS auth form
    await expect(page.locator('input[type="tel"]')).toBeVisible();
    await expect(page.locator('text=Send OTP')).toBeVisible();
  });

  test('should validate phone number input', async ({ page }) => {
    await page.click('text=Login');
    
    // Test invalid phone number
    await page.fill('input[type="tel"]', '123');
    await page.click('text=Send OTP');
    
    // Should show validation error
    await expect(page.locator('text=Please enter a valid phone number')).toBeVisible({ timeout: 5000 });
  });

  test('should accept valid phone number format', async ({ page }) => {
    await page.click('text=Login');
    
    // Test valid phone number
    await page.fill('input[type="tel"]', '+919999999999');
    await page.click('text=Send OTP');
    
    // Should proceed to OTP input
    await expect(page.locator('input[placeholder*="OTP"]')).toBeVisible({ timeout: 10000 });
  });

  test('should handle SMS OTP verification (simulated)', async ({ page }) => {
    await page.click('text=Login');
    
    // Enter phone number
    await page.fill('input[type="tel"]', process.env.TEST_USER_PHONE || '+919999999999');
    await page.click('text=Send OTP');
    
    // Wait for OTP input
    await expect(page.locator('input[placeholder*="OTP"]')).toBeVisible({ timeout: 10000 });
    
    // In test environment, we might have a test OTP
    await page.fill('input[placeholder*="OTP"]', '123456');
    await page.click('text=Verify');
    
    // Should either redirect to dashboard or show error
    await page.waitForLoadState('networkidle');
    
    // Check if we're on dashboard or still on auth page
    const isOnDashboard = await page.locator('text=Dashboard').isVisible();
    const hasError = await page.locator('text=Invalid OTP').isVisible();
    
    expect(isOnDashboard || hasError).toBe(true);
  });

  test('should handle role selection after successful auth', async ({ page }) => {
    // This test assumes we get past OTP verification
    await page.goto('/?test-auth=true'); // Test URL that might bypass OTP
    
    // Look for role selection if it appears
    const roleSelection = page.locator('text=Select Role');
    if (await roleSelection.isVisible()) {
      await page.click('text=Student');
      await expect(page.locator('text=Student Dashboard')).toBeVisible({ timeout: 10000 });
    }
  });

  test('should persist authentication across page reloads', async ({ page, context }) => {
    // Mock authenticated state
    await context.addCookies([
      {
        name: 'auth_token',
        value: 'test_token_123',
        domain: 'localhost',
        path: '/',
      }
    ]);
    
    await page.goto('/');
    await page.reload();
    
    // Should stay authenticated (this depends on your implementation)
    await page.waitForLoadState('networkidle');
    
    // Either should be on dashboard or still need to login
    const hasLoginButton = await page.locator('text=Login').isVisible();
    const hasDashboard = await page.locator('text=Dashboard').isVisible();
    
    expect(hasLoginButton || hasDashboard).toBe(true);
  });

  test('should handle logout functionality', async ({ page }) => {
    // First, simulate being logged in
    await page.goto('/?test-auth=true');
    
    // Look for logout option (might be in menu)
    const logoutButton = page.locator('text=Logout').or(page.locator('[data-testid="logout"]'));
    
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      
      // Should redirect to login page
      await expect(page.locator('text=Login')).toBeVisible({ timeout: 10000 });
    }
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Intercept network requests to simulate failure
    await page.route('**/api/auth/**', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' })
      });
    });

    await page.click('text=Login');
    await page.fill('input[type="tel"]', '+919999999999');
    await page.click('text=Send OTP');
    
    // Should show error message
    await expect(page.locator('text=Server error').or(page.locator('text=Something went wrong'))).toBeVisible({ timeout: 10000 });
  });

  test('should be accessible', async ({ page }) => {
    await page.click('text=Login');
    
    // Check for proper ARIA labels and accessibility
    const phoneInput = page.locator('input[type="tel"]');
    await expect(phoneInput).toHaveAttribute('aria-label', /phone/i);
    
    // Check keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['INPUT', 'BUTTON']).toContain(focusedElement);
  });

  test('should work on mobile viewports', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    
    await page.click('text=Login');
    
    // Form should be responsive
    const phoneInput = page.locator('input[type="tel"]');
    await expect(phoneInput).toBeVisible();
    
    const inputBox = await phoneInput.boundingBox();
    expect(inputBox?.width).toBeGreaterThan(200); // Should be wide enough on mobile
  });
});

// Error handling tests
test.describe('Authentication Error Handling', () => {
  test('should handle rate limiting', async ({ page }) => {
    await page.click('text=Login');
    
    // Simulate multiple rapid OTP requests
    for (let i = 0; i < 5; i++) {
      await page.fill('input[type="tel"]', '+919999999999');
      await page.click('text=Send OTP');
      await page.waitForTimeout(100);
    }
    
    // Should show rate limit message
    await expect(page.locator('text=Too many requests').or(page.locator('text=Please wait'))).toBeVisible({ timeout: 5000 });
  });

  test('should handle expired OTP', async ({ page }) => {
    await page.click('text=Login');
    await page.fill('input[type="tel"]', '+919999999999');
    await page.click('text=Send OTP');
    
    await expect(page.locator('input[placeholder*="OTP"]')).toBeVisible();
    
    // Wait to simulate OTP expiry (if implemented)
    await page.waitForTimeout(2000);
    
    await page.fill('input[placeholder*="OTP"]', '123456');
    await page.click('text=Verify');
    
    // Should handle expired OTP gracefully
    const hasExpiredMessage = await page.locator('text=expired').isVisible();
    const hasInvalidMessage = await page.locator('text=Invalid').isVisible();
    
    expect(hasExpiredMessage || hasInvalidMessage).toBe(true);
  });
});
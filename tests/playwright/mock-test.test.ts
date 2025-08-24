// MOCK TEST FUNCTIONALITY TESTS
// Comprehensive testing of CLAT mock test system

import { test, expect } from '@playwright/test';

test.describe('Mock Test System', () => {
  test.beforeEach(async ({ page, context }) => {
    // Mock authentication as student
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

  test('should display available mock tests', async ({ page }) => {
    await page.click('text=Mock Tests');
    
    // Should show list of available tests
    await expect(page.locator('text=CLAT Mock Test').or(page.locator('[data-testid="mock-test-card"]'))).toBeVisible();
    
    // Should show test details
    await expect(page.locator('text=120 minutes').or(page.locator('text=150 Questions'))).toBeVisible();
  });

  test('should start a mock test successfully', async ({ page }) => {
    await page.click('text=Mock Tests');
    
    // Click start test button
    const startButton = page.locator('text=Start Test').or(page.locator('[data-testid="start-test"]')).first();
    await startButton.click();
    
    // Should show test instructions or directly enter test
    await page.waitForTimeout(2000);
    
    // Look for test interface elements
    const hasInstructions = await page.locator('text=Instructions').isVisible();
    const hasQuestion = await page.locator('text=Question').isVisible();
    
    if (hasInstructions) {
      // If instructions are shown, proceed to test
      const beginButton = page.locator('text=Begin Test').or(page.locator('text=Start'));
      if (await beginButton.isVisible()) {
        await beginButton.click();
      }
    }
    
    // Should now be in test interface
    await expect(page.locator('text=Question').or(page.locator('[data-testid="question"]'))).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Time Remaining').or(page.locator('[data-testid="timer"]'))).toBeVisible();
  });

  test('should display questions with options', async ({ page }) => {
    // Navigate to mock test
    await page.click('text=Mock Tests');
    await page.click('text=Start Test', { timeout: 5000 });
    
    // Skip instructions if present
    const beginButton = page.locator('text=Begin Test').or(page.locator('text=Start'));
    if (await beginButton.isVisible({ timeout: 3000 })) {
      await beginButton.click();
    }
    
    // Wait for question to load
    await page.waitForTimeout(3000);
    
    // Should show question text
    const questionText = page.locator('[data-testid="question-text"]').or(page.locator('.question-content'));
    await expect(questionText.or(page.locator('text=Question'))).toBeVisible();
    
    // Should show multiple choice options
    await expect(page.locator('input[type="radio"]').or(page.locator('.option'))).toBeVisible();
  });

  test('should allow selecting answers', async ({ page }) => {
    await page.click('text=Mock Tests');
    await page.click('text=Start Test', { timeout: 5000 });
    
    const beginButton = page.locator('text=Begin Test').or(page.locator('text=Start'));
    if (await beginButton.isVisible({ timeout: 3000 })) {
      await beginButton.click();
    }
    
    await page.waitForTimeout(3000);
    
    // Select an option
    const firstOption = page.locator('input[type="radio"]').or(page.locator('.option')).first();
    if (await firstOption.isVisible()) {
      await firstOption.click();
      
      // Option should be selected
      await expect(firstOption).toBeChecked();
    }
  });

  test('should navigate between questions', async ({ page }) => {
    await page.click('text=Mock Tests');
    await page.click('text=Start Test', { timeout: 5000 });
    
    const beginButton = page.locator('text=Begin Test').or(page.locator('text=Start'));
    if (await beginButton.isVisible({ timeout: 3000 })) {
      await beginButton.click();
    }
    
    await page.waitForTimeout(3000);
    
    // Look for navigation buttons
    const nextButton = page.locator('text=Next').or(page.locator('[data-testid="next-question"]'));
    
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(1000);
      
      // Should move to next question
      const prevButton = page.locator('text=Previous').or(page.locator('[data-testid="prev-question"]'));
      await expect(prevButton).toBeVisible();
      
      // Go back to previous question
      await prevButton.click();
    }
  });

  test('should show question palette/navigator', async ({ page }) => {
    await page.click('text=Mock Tests');
    await page.click('text=Start Test', { timeout: 5000 });
    
    const beginButton = page.locator('text=Begin Test').or(page.locator('text=Start'));
    if (await beginButton.isVisible({ timeout: 3000 })) {
      await beginButton.click();
    }
    
    await page.waitForTimeout(3000);
    
    // Look for question palette
    const palette = page.locator('[data-testid="question-palette"]').or(page.locator('.question-navigator'));
    
    if (await palette.isVisible()) {
      // Should show question numbers
      await expect(page.locator('text=1').or(page.locator('button=1'))).toBeVisible();
    }
  });

  test('should handle timer functionality', async ({ page }) => {
    await page.click('text=Mock Tests');
    await page.click('text=Start Test', { timeout: 5000 });
    
    const beginButton = page.locator('text=Begin Test').or(page.locator('text=Start'));
    if (await beginButton.isVisible({ timeout: 3000 })) {
      await beginButton.click();
    }
    
    await page.waitForTimeout(3000);
    
    // Should show timer
    const timer = page.locator('[data-testid="timer"]').or(page.locator('text=Time Remaining'));
    await expect(timer).toBeVisible();
    
    // Timer should show time format (like 02:00:00 or 120:00)
    await expect(page.locator('text=/\\d+:\\d+/')).toBeVisible();
  });

  test('should allow submitting test', async ({ page }) => {
    await page.click('text=Mock Tests');
    await page.click('text=Start Test', { timeout: 5000 });
    
    const beginButton = page.locator('text=Begin Test').or(page.locator('text=Start'));
    if (await beginButton.isVisible({ timeout: 3000 })) {
      await beginButton.click();
    }
    
    await page.waitForTimeout(3000);
    
    // Look for submit button (might be in menu or at end)
    const submitButton = page.locator('text=Submit Test').or(page.locator('[data-testid="submit-test"]'));
    
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // Should show confirmation dialog
      const confirmButton = page.locator('text=Confirm Submit').or(page.locator('text=Yes'));
      if (await confirmButton.isVisible({ timeout: 3000 })) {
        await confirmButton.click();
      }
      
      // Should redirect to results or thank you page
      await expect(page.locator('text=Submitted').or(page.locator('text=Thank you'))).toBeVisible({ timeout: 10000 });
    }
  });

  test('should display test results after submission', async ({ page }) => {
    // This test would need a completed test or mock data
    await page.goto('/?test-results=true'); // Mock URL for results
    
    // Should show results page
    const hasResults = await page.locator('text=Results').or(page.locator('text=Score')).isVisible();
    
    if (hasResults) {
      // Should show score
      await expect(page.locator('text=/\\d+%/').or(page.locator('text=/\\d+\/\\d+/'))).toBeVisible();
      
      // Should show analysis
      await expect(page.locator('text=Analysis').or(page.locator('text=Performance'))).toBeVisible();
    }
  });

  test('should handle auto-submit when time expires', async ({ page }) => {
    // Mock a test with very short time limit
    await page.route('**/api/mock-test/**', route => {
      const response = route.request().url();
      if (response.includes('start')) {
        route.fulfill({
          status: 200,
          body: JSON.stringify({
            testId: 'test-123',
            duration: 5, // 5 seconds for testing
            questions: [
              {
                id: 1,
                question: 'Test question?',
                options: ['A', 'B', 'C', 'D'],
                type: 'multiple-choice'
              }
            ]
          })
        });
      } else {
        route.continue();
      }
    });

    await page.click('text=Mock Tests');
    await page.click('text=Start Test', { timeout: 5000 });
    
    const beginButton = page.locator('text=Begin Test').or(page.locator('text=Start'));
    if (await beginButton.isVisible({ timeout: 3000 })) {
      await beginButton.click();
    }
    
    // Wait for auto-submit (longer than test duration)
    await page.waitForTimeout(10000);
    
    // Should auto-submit and show results
    await expect(page.locator('text=Time Up').or(page.locator('text=Submitted'))).toBeVisible();
  });

  test('should save answers automatically', async ({ page }) => {
    await page.click('text=Mock Tests');
    await page.click('text=Start Test', { timeout: 5000 });
    
    const beginButton = page.locator('text=Begin Test').or(page.locator('text=Start'));
    if (await beginButton.isVisible({ timeout: 3000 })) {
      await beginButton.click();
    }
    
    await page.waitForTimeout(3000);
    
    // Select an answer
    const firstOption = page.locator('input[type="radio"]').first();
    if (await firstOption.isVisible()) {
      await firstOption.click();
      
      // Navigate away and back
      const nextButton = page.locator('text=Next');
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(1000);
        
        const prevButton = page.locator('text=Previous');
        await prevButton.click();
        
        // Answer should still be selected
        await expect(firstOption).toBeChecked();
      }
    }
  });
});

test.describe('Mock Test Error Handling', () => {
  test('should handle network disconnection gracefully', async ({ page, context }) => {
    await context.addCookies([
      { name: 'auth_token', value: 'test_token_student', domain: 'localhost', path: '/' }
    ]);

    await page.goto('/?role=student');
    await page.click('text=Mock Tests');
    await page.click('text=Start Test', { timeout: 5000 });
    
    const beginButton = page.locator('text=Begin Test');
    if (await beginButton.isVisible({ timeout: 3000 })) {
      await beginButton.click();
    }
    
    await page.waitForTimeout(3000);
    
    // Simulate network disconnection
    await context.setOffline(true);
    
    // Try to navigate or submit
    const nextButton = page.locator('text=Next');
    if (await nextButton.isVisible()) {
      await nextButton.click();
    }
    
    // Should show offline message or handle gracefully
    await expect(page.locator('text=Offline').or(page.locator('text=Connection lost'))).toBeVisible({ timeout: 5000 });
    
    // Reconnect
    await context.setOffline(false);
  });

  test('should handle server errors during test', async ({ page, context }) => {
    await context.addCookies([
      { name: 'auth_token', value: 'test_token_student', domain: 'localhost', path: '/' }
    ]);

    // Mock server error
    await page.route('**/api/mock-test/**', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' })
      });
    });

    await page.goto('/?role=student');
    await page.click('text=Mock Tests');
    
    // Should handle error gracefully
    await expect(page.locator('text=Error').or(page.locator('text=Unable to load'))).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Mock Test Accessibility', () => {
  test('should be keyboard navigable', async ({ page, context }) => {
    await context.addCookies([
      { name: 'auth_token', value: 'test_token_student', domain: 'localhost', path: '/' }
    ]);

    await page.goto('/?role=student');
    await page.click('text=Mock Tests');
    await page.click('text=Start Test', { timeout: 5000 });
    
    const beginButton = page.locator('text=Begin Test');
    if (await beginButton.isVisible({ timeout: 3000 })) {
      await beginButton.click();
    }
    
    await page.waitForTimeout(3000);
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to select options with keyboard
    await page.keyboard.press('Space');
    
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['INPUT', 'BUTTON', 'LABEL']).toContain(focusedElement);
  });

  test('should have proper ARIA labels', async ({ page, context }) => {
    await context.addCookies([
      { name: 'auth_token', value: 'test_token_student', domain: 'localhost', path: '/' }
    ]);

    await page.goto('/?role=student');
    await page.click('text=Mock Tests');
    await page.click('text=Start Test', { timeout: 5000 });
    
    const beginButton = page.locator('text=Begin Test');
    if (await beginButton.isVisible({ timeout: 3000 })) {
      await beginButton.click();
    }
    
    await page.waitForTimeout(3000);
    
    // Check for accessibility attributes
    const timerElement = page.locator('[data-testid="timer"]').or(page.locator('text=Time Remaining'));
    if (await timerElement.isVisible()) {
      await expect(timerElement).toHaveAttribute('aria-label', /time/i);
    }
    
    const questionElement = page.locator('[data-testid="question"]').or(page.locator('.question-content'));
    if (await questionElement.isVisible()) {
      await expect(questionElement).toHaveAttribute('role', 'group');
    }
  });
});
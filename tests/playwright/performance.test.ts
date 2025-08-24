// PERFORMANCE TESTING SUITE
// Load testing and performance validation for 100K+ students

import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  
  test('homepage should load within performance budget', async ({ page }) => {
    // Start performance monitoring
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    
    // Homepage should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check for performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      };
    });
    
    // Performance budgets
    expect(performanceMetrics.firstPaint).toBeLessThan(2000); // First paint under 2s
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(2500); // FCP under 2.5s
    expect(performanceMetrics.domContentLoaded).toBeLessThan(1500); // DOM ready under 1.5s
  });

  test('dashboard should load efficiently with large datasets', async ({ page, context }) => {
    // Mock authentication
    await context.addCookies([
      { name: 'auth_token', value: 'test_token_student', domain: 'localhost', path: '/' }
    ]);

    // Mock large dataset response
    await page.route('**/api/dashboard/**', route => {
      // Simulate large dataset
      const mockData = {
        user: { name: 'Test Student', id: 'test-123' },
        mockTests: Array.from({ length: 100 }, (_, i) => ({
          id: `test-${i}`,
          title: `CLAT Mock Test ${i + 1}`,
          score: Math.floor(Math.random() * 100),
          date: new Date().toISOString()
        })),
        performance: {
          overallScore: 85,
          subjectWise: Array.from({ length: 10 }, (_, i) => ({
            subject: `Subject ${i + 1}`,
            score: Math.floor(Math.random() * 100)
          }))
        }
      };

      route.fulfill({
        status: 200,
        body: JSON.stringify(mockData)
      });
    });

    const startTime = Date.now();
    await page.goto('/?role=student');
    
    // Wait for dashboard to fully load
    await page.waitForLoadState('networkidle');
    await expect(page.locator('text=Dashboard')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    
    // Dashboard with large dataset should still load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('mock test should handle concurrent user simulation', async ({ browser }) => {
    // Simulate multiple users taking tests concurrently
    const contexts = await Promise.all([
      browser.newContext(),
      browser.newContext(),
      browser.newContext(),
    ]);

    const pages = await Promise.all(contexts.map(context => context.newPage()));
    
    // Add auth cookies to all contexts
    await Promise.all(contexts.map(context => 
      context.addCookies([
        { name: 'auth_token', value: `test_token_${Math.random()}`, domain: 'localhost', path: '/' }
      ])
    ));

    const startTime = Date.now();
    
    // All users navigate to mock test simultaneously
    await Promise.all(pages.map(async page => {
      await page.goto('/?role=student');
      await page.click('text=Mock Tests', { timeout: 10000 });
    }));
    
    const concurrentLoadTime = Date.now() - startTime;
    
    // Should handle concurrent load within acceptable time
    expect(concurrentLoadTime).toBeLessThan(10000);
    
    // Clean up
    await Promise.all(contexts.map(context => context.close()));
  });

  test('should handle memory usage efficiently during long sessions', async ({ page, context }) => {
    await context.addCookies([
      { name: 'auth_token', value: 'test_token_student', domain: 'localhost', path: '/' }
    ]);

    await page.goto('/?role=student');
    
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory ? {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
      } : null;
    });

    // Simulate long session with multiple interactions
    for (let i = 0; i < 10; i++) {
      await page.click('text=Mock Tests');
      await page.waitForTimeout(500);
      
      await page.click('text=Dashboard');
      await page.waitForTimeout(500);
      
      // Trigger some heavy operations
      await page.click('text=Performance', { timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(500);
    }

    // Check memory usage after interactions
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory ? {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
      } : null;
    });

    if (initialMemory && finalMemory) {
      const memoryGrowth = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize;
      const growthPercentage = (memoryGrowth / initialMemory.usedJSHeapSize) * 100;
      
      // Memory growth should be reasonable (less than 200% increase)
      expect(growthPercentage).toBeLessThan(200);
    }
  });

  test('should optimize image loading and rendering', async ({ page }) => {
    await page.goto('/');
    
    // Check if images use modern formats and loading strategies
    const images = await page.locator('img').all();
    
    for (const image of images) {
      const src = await image.getAttribute('src');
      const loading = await image.getAttribute('loading');
      
      if (src) {
        // Should use modern formats or optimized loading
        const hasModernFormat = src.includes('.webp') || src.includes('.avif');
        const hasLazyLoading = loading === 'lazy';
        const isOptimized = hasModernFormat || hasLazyLoading || src.includes('placeholder');
        
        // At least some optimization should be present
        expect(isOptimized).toBe(true);
      }
    }
  });

  test('should minimize JavaScript bundle size', async ({ page }) => {
    // Monitor network requests for JavaScript files
    const jsRequests: Array<{ url: string; size: number }> = [];
    
    page.on('response', async response => {
      const url = response.url();
      if (url.includes('.js') && response.status() === 200) {
        const headers = response.headers();
        const contentLength = headers['content-length'];
        
        if (contentLength) {
          jsRequests.push({
            url,
            size: parseInt(contentLength, 10)
          });
        }
      }
    });

    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Calculate total JavaScript size
    const totalJSSize = jsRequests.reduce((total, request) => total + request.size, 0);
    const totalJSSizeMB = totalJSSize / (1024 * 1024);
    
    // Total JavaScript should be under reasonable limit (e.g., 2MB)
    expect(totalJSSizeMB).toBeLessThan(2);
    
    // Check for code splitting
    const hasMultipleChunks = jsRequests.length > 3; // Should have multiple chunks for code splitting
    expect(hasMultipleChunks).toBe(true);
  });

  test('should handle API response times efficiently', async ({ page, context }) => {
    await context.addCookies([
      { name: 'auth_token', value: 'test_token_student', domain: 'localhost', path: '/' }
    ]);

    const apiResponseTimes: Array<{ url: string; responseTime: number }> = [];
    
    page.on('response', async response => {
      const url = response.url();
      if (url.includes('/api/')) {
        const timing = response.timing();
        apiResponseTimes.push({
          url,
          responseTime: timing.responseEnd - timing.requestStart
        });
      }
    });

    await page.goto('/?role=student');
    await page.waitForLoadState('networkidle');

    // All API calls should complete within reasonable time
    apiResponseTimes.forEach(({ url, responseTime }) => {
      expect(responseTime).toBeLessThan(5000); // 5 seconds max
    });

    // Critical APIs should be even faster
    const criticalAPIs = apiResponseTimes.filter(api => 
      api.url.includes('/dashboard') || api.url.includes('/auth')
    );
    
    criticalAPIs.forEach(({ url, responseTime }) => {
      expect(responseTime).toBeLessThan(2000); // 2 seconds for critical APIs
    });
  });

  test('should maintain performance under stress', async ({ browser }) => {
    // Create multiple contexts to simulate heavy load
    const contextCount = 5;
    const contexts = await Promise.all(
      Array.from({ length: contextCount }, () => browser.newContext())
    );

    const pages = await Promise.all(contexts.map(context => context.newPage()));
    
    // Add authentication to all contexts
    await Promise.all(contexts.map((context, index) => 
      context.addCookies([
        { name: 'auth_token', value: `test_token_stress_${index}`, domain: 'localhost', path: '/' }
      ])
    ));

    const startTime = Date.now();
    
    // Simulate heavy concurrent usage
    await Promise.all(pages.map(async (page, index) => {
      try {
        await page.goto('/?role=student');
        await page.click('text=Mock Tests');
        
        // Simulate taking a test
        const startTest = page.locator('text=Start Test').first();
        if (await startTest.isVisible({ timeout: 5000 })) {
          await startTest.click();
        }
        
        // Interact with test interface
        await page.waitForTimeout(2000);
        
        // Navigate around
        await page.click('text=Dashboard').catch(() => {});
        await page.waitForTimeout(1000);
        
      } catch (error) {
        console.log(`Page ${index} failed:`, error);
      }
    }));
    
    const totalTime = Date.now() - startTime;
    
    // Should handle stress test within reasonable time
    expect(totalTime).toBeLessThan(30000); // 30 seconds for all operations
    
    // Clean up
    await Promise.all(contexts.map(context => context.close()));
  });

  test('should optimize database queries performance', async ({ page, context }) => {
    await context.addCookies([
      { name: 'auth_token', value: 'test_token_admin', domain: 'localhost', path: '/' }
    ]);

    // Monitor API requests to database-heavy endpoints
    const dbQueryTimes: Array<{ endpoint: string; responseTime: number }> = [];
    
    page.on('response', response => {
      const url = response.url();
      const timing = response.timing();
      
      // Track database-heavy endpoints
      if (url.includes('/analytics') || url.includes('/users') || url.includes('/reports')) {
        dbQueryTimes.push({
          endpoint: url,
          responseTime: timing.responseEnd - timing.requestStart
        });
      }
    });

    await page.goto('/?role=admin');
    
    // Navigate to analytics (database-heavy page)
    const analyticsButton = page.locator('text=Analytics').or(page.locator('text=Reports'));
    if (await analyticsButton.isVisible({ timeout: 5000 })) {
      await analyticsButton.click();
      await page.waitForLoadState('networkidle');
    }

    // Database queries should be optimized
    dbQueryTimes.forEach(({ endpoint, responseTime }) => {
      expect(responseTime).toBeLessThan(3000); // 3 seconds max for DB queries
    });
  });

  test('should handle file uploads efficiently', async ({ page, context }) => {
    await context.addCookies([
      { name: 'auth_token', value: 'test_token_admin', domain: 'localhost', path: '/' }
    ]);

    await page.goto('/?role=admin');
    
    // Look for file upload functionality
    const fileUpload = page.locator('input[type="file"]');
    
    if (await fileUpload.isVisible({ timeout: 5000 })) {
      // Create a test file
      const testFile = Buffer.from('test file content for performance testing');
      
      const startTime = Date.now();
      
      // Upload file
      await fileUpload.setInputFiles({
        name: 'test-performance.txt',
        mimeType: 'text/plain',
        buffer: testFile
      });
      
      // Wait for upload to complete
      await page.waitForTimeout(3000);
      
      const uploadTime = Date.now() - startTime;
      
      // File upload should be reasonably fast
      expect(uploadTime).toBeLessThan(10000); // 10 seconds max
    }
  });
});

test.describe('Scalability Tests', () => {
  
  test('should maintain performance with large user datasets', async ({ page, context }) => {
    await context.addCookies([
      { name: 'auth_token', value: 'test_token_admin', domain: 'localhost', path: '/' }
    ]);

    // Mock API to return large dataset
    await page.route('**/api/users**', route => {
      const largeDataset = {
        users: Array.from({ length: 1000 }, (_, i) => ({
          id: `user-${i}`,
          name: `User ${i}`,
          email: `user${i}@example.com`,
          role: 'student',
          lastActive: new Date().toISOString()
        })),
        total: 10000,
        page: 1,
        limit: 1000
      };

      route.fulfill({
        status: 200,
        body: JSON.stringify(largeDataset)
      });
    });

    const startTime = Date.now();
    
    await page.goto('/?role=admin');
    
    const usersSection = page.locator('text=Users').or(page.locator('text=User Management'));
    if (await usersSection.isVisible({ timeout: 5000 })) {
      await usersSection.click();
      await page.waitForLoadState('networkidle');
    }
    
    const loadTime = Date.now() - startTime;
    
    // Should handle large datasets efficiently
    expect(loadTime).toBeLessThan(8000); // 8 seconds max
  });

  test('should implement efficient pagination', async ({ page, context }) => {
    await context.addCookies([
      { name: 'auth_token', value: 'test_token_admin', domain: 'localhost', path: '/' }
    ]);

    await page.goto('/?role=admin');
    
    const usersSection = page.locator('text=Users').or(page.locator('text=User Management'));
    if (await usersSection.isVisible({ timeout: 5000 })) {
      await usersSection.click();
      
      // Look for pagination
      const pagination = page.locator('[data-testid="pagination"]').or(page.locator('text=Next'));
      
      if (await pagination.isVisible({ timeout: 5000 })) {
        const startTime = Date.now();
        
        await pagination.click();
        await page.waitForLoadState('networkidle');
        
        const paginationTime = Date.now() - startTime;
        
        // Pagination should be fast
        expect(paginationTime).toBeLessThan(3000);
      }
    }
  });
});
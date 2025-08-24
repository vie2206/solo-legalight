// GLOBAL TEARDOWN FOR PLAYWRIGHT TESTS
// Clean up test environment and data

import { chromium, FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting Playwright Global Teardown');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const backendURL = 'http://localhost:8000';
    
    // Clean up test data
    await cleanupTestData(page, backendURL);
    
    // Clean up test user (optional - you might want to keep for debugging)
    // await cleanupTestUser(page, backendURL);
    
    console.log('✅ Global teardown completed successfully');
    
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    // Don't throw error as this shouldn't fail the tests
  } finally {
    await context.close();
    await browser.close();
  }
}

async function cleanupTestData(page: any, backendURL: string) {
  try {
    if (process.env.TEST_MOCK_TEST_ID) {
      const response = await page.request.delete(`${backendURL}/api/test-data/mock-test/${process.env.TEST_MOCK_TEST_ID}`);
      
      if (response.ok()) {
        console.log('✅ Test mock test data cleaned up');
      }
    }
    
    // Clean up any other test data
    await page.request.post(`${backendURL}/api/test-data/cleanup`, {
      data: { testRun: true },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.log('⚠️  Could not clean up test data:', error);
  }
}

async function cleanupTestUser(page: any, backendURL: string) {
  try {
    if (process.env.TEST_USER_ID) {
      const response = await page.request.delete(`${backendURL}/api/auth/test-user/${process.env.TEST_USER_ID}`);
      
      if (response.ok()) {
        console.log('✅ Test user cleaned up');
      }
    }
  } catch (error) {
    console.log('⚠️  Could not clean up test user:', error);
  }
}

export default globalTeardown;
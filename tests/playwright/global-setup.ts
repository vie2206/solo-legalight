// GLOBAL SETUP FOR PLAYWRIGHT TESTS
// Prepare test environment and data

import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting Playwright Global Setup');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Wait for the application to be ready
    console.log('⏳ Waiting for application to be ready...');
    
    const baseURL = config.projects[0].use?.baseURL || 'http://localhost:3000';
    
    // Check if frontend is ready
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    
    // Check if backend is ready
    const backendURL = 'http://localhost:8000';
    try {
      const healthResponse = await page.request.get(`${backendURL}/health`);
      if (healthResponse.ok()) {
        console.log('✅ Backend health check passed');
      } else {
        console.log('⚠️  Backend health check failed, tests may be flaky');
      }
    } catch (error) {
      console.log('⚠️  Backend not available, some tests may fail');
    }

    // Create test user if needed
    await createTestUser(page, backendURL);
    
    // Set up test data
    await setupTestData(page, backendURL);
    
    console.log('✅ Global setup completed successfully');
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}

async function createTestUser(page: any, backendURL: string) {
  try {
    const testUser = {
      name: 'Test Student',
      phone: '+919999999999', // Test phone number
      role: 'student'
    };

    const response = await page.request.post(`${backendURL}/api/auth/test-user`, {
      data: testUser,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok()) {
      const userData = await response.json();
      console.log('✅ Test user created/verified:', userData.user?.name);
      
      // Store test user credentials for tests
      process.env.TEST_USER_ID = userData.user?.id;
      process.env.TEST_USER_PHONE = testUser.phone;
    } else {
      console.log('⚠️  Test user creation failed, using existing data');
    }
  } catch (error) {
    console.log('⚠️  Could not create test user:', error);
  }
}

async function setupTestData(page: any, backendURL: string) {
  try {
    // Create sample mock test data
    const mockTestData = {
      title: 'Playwright Test Mock Test',
      description: 'Automated test data',
      duration: 120,
      questions: [
        {
          question: 'Test question for automation',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
          explanation: 'This is a test question'
        }
      ]
    };

    const response = await page.request.post(`${backendURL}/api/test-data/mock-test`, {
      data: mockTestData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok()) {
      const testData = await response.json();
      console.log('✅ Test data created');
      process.env.TEST_MOCK_TEST_ID = testData.id;
    }
  } catch (error) {
    console.log('⚠️  Could not create test data:', error);
  }
}

export default globalSetup;
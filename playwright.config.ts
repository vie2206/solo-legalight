import { defineConfig, devices } from '@playwright/test';

/**
 * CLAT PLATFORM PLAYWRIGHT CONFIGURATION
 * Cross-browser testing for production readiness
 */
export default defineConfig({
  // Test directory
  testDir: './tests/playwright',
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  
  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Record video on failure
    video: 'retain-on-failure',
    
    // Take screenshot on failure
    screenshot: 'only-on-failure',
    
    // Global timeout for each test
    actionTimeout: 30000,
    
    // Navigation timeout
    navigationTimeout: 60000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Enable Chrome DevTools Protocol
        launchOptions: {
          args: ['--enable-devtools-experiments']
        }
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
      },
    },

    // Mobile testing
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
      },
    },

    // Edge browser
    {
      name: 'Microsoft Edge',
      use: { 
        ...devices['Desktop Edge'], 
        channel: 'msedge' 
      },
    },

    // High DPI display testing
    {
      name: 'Desktop Chrome HiDPI',
      use: {
        ...devices['Desktop Chrome HiDPI'],
      },
    },
  ],

  // Global setup/teardown
  globalSetup: require.resolve('./tests/playwright/global-setup.ts'),
  globalTeardown: require.resolve('./tests/playwright/global-teardown.ts'),

  // Run your local dev server before starting the tests
  webServer: [
    {
      command: 'npm start',
      port: 3000,
      reuseExistingServer: !process.env.CI,
      env: {
        NODE_ENV: 'test',
      },
    },
    // Also start backend for integration tests
    {
      command: 'cd backend && npm start',
      port: 8000,
      reuseExistingServer: !process.env.CI,
      env: {
        NODE_ENV: 'test',
        PORT: '8000',
      },
    }
  ],

  // Test timeout
  timeout: 60000,

  // Expect timeout
  expect: {
    timeout: 10000,
  },

  // Output directory
  outputDir: 'test-results/',
  
  // Test match patterns
  testMatch: [
    '**/*.test.ts',
    '**/*.spec.ts',
  ],
});
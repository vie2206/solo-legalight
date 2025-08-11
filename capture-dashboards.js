const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Dashboard configurations for different user types
const dashboardConfigs = [
  {
    name: 'admin',
    user: {
      id: 'demo-admin-001',
      name: 'Demo Admin',
      email: 'admin@demo.com',
      role: 'admin',
      subscription_tier: 'pro'
    }
  },
  {
    name: 'student',
    user: {
      id: 'demo-student-001',
      name: 'Demo Student',
      email: 'student@demo.com',
      role: 'student',
      subscription_tier: 'pro'
    }
  },
  {
    name: 'parent',
    user: {
      id: 'demo-parent-001',
      name: 'Demo Parent',
      email: 'parent@demo.com',
      role: 'parent',
      subscription_tier: 'pro'
    }
  },
  {
    name: 'educator',
    user: {
      id: 'demo-educator-001',
      name: 'Demo Educator',
      email: 'educator@demo.com',
      role: 'educator',
      subscription_tier: 'pro'
    }
  }
];

async function captureDashboards() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });

  for (const config of dashboardConfigs) {
    const page = await browser.newPage();
    
    // Navigate to the app
    await page.goto('http://localhost:3001');
    
    // Inject user data directly into localStorage to bypass login
    await page.evaluate((userData) => {
      localStorage.setItem('auth_token', `demo-token-${userData.role}`);
      localStorage.setItem('user_data', JSON.stringify(userData));
    }, config.user);
    
    // Reload to apply the user session
    await page.reload();
    await page.waitForTimeout(3000);
    
    // Take screenshots of different sections
    const sections = [
      { name: 'overview', selector: '#overview' },
      { name: 'analytics', selector: '#analytics' },
      { name: 'profile', selector: '#profile' },
      { name: 'settings', selector: '#settings' }
    ];
    
    // Main dashboard screenshot
    await page.screenshot({
      path: `./screenshots/${config.name}-dashboard-main.png`,
      fullPage: false
    });
    
    // Capture different tabs/sections if available
    for (const section of sections) {
      try {
        await page.click(`[data-tab="${section.name}"]`);
        await page.waitForTimeout(1000);
        await page.screenshot({
          path: `./screenshots/${config.name}-${section.name}.png`,
          fullPage: false
        });
      } catch (e) {
        console.log(`Section ${section.name} not found for ${config.name}`);
      }
    }
    
    await page.close();
  }
  
  await browser.close();
  console.log('All screenshots captured successfully!');
}

// Run the capture
captureDashboards().catch(console.error);
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// User configurations for direct dashboard access
const userConfigs = [
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
    name: 'admin',
    user: {
      id: 'demo-admin-001',
      name: 'Demo Administrator',
      email: 'admin@demo.com',
      role: 'admin',
      subscription_tier: 'ultra'
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
      subscription_tier: 'ultra'
    }
  }
];

async function captureDashboards() {
  const screenshotsDir = './dashboard-screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  console.log('🚀 Starting Direct Dashboard Screenshot Capture...\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized'
    ]
  });

  let screenshotCount = 0;

  for (const config of userConfigs) {
    console.log(`🎯 Capturing ${config.name} dashboard...`);
    
    const page = await browser.newPage();
    
    try {
      // Navigate to main app
      console.log('   📡 Loading main app...');
      await page.goto('http://localhost:3001', { 
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait for page load
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Inject user data into localStorage to bypass login
      console.log('   🔐 Setting up user session...');
      await page.evaluate((userData) => {
        localStorage.setItem('auth_token', `demo-token-${userData.role}`);
        localStorage.setItem('user_data', JSON.stringify(userData));
      }, config.user);

      // Reload to apply the session
      console.log('   🔄 Applying user session...');
      await page.reload({ waitUntil: 'networkidle0' });
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Now the dashboard should be loaded - take screenshots
      console.log('   📸 Capturing dashboard screenshots...');

      // 1. Full page screenshot
      screenshotCount++;
      await page.screenshot({
        path: `${screenshotsDir}/${config.name}-dashboard-full.png`,
        fullPage: true
      });
      console.log(`   ✅ Full page captured`);

      // 2. Viewport screenshot
      screenshotCount++;
      await page.screenshot({
        path: `${screenshotsDir}/${config.name}-dashboard-viewport.png`,
        fullPage: false
      });
      console.log(`   ✅ Viewport captured`);

      // 3. Scroll through different sections
      const scrollPositions = [0, 500, 1000, 1500, 2000, 2500];
      for (let i = 0; i < scrollPositions.length; i++) {
        await page.evaluate((scrollY) => {
          window.scrollTo({ top: scrollY, behavior: 'instant' });
        }, scrollPositions[i]);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        screenshotCount++;
        await page.screenshot({
          path: `${screenshotsDir}/${config.name}-section-${i + 1}.png`,
          fullPage: false
        });
        console.log(`   ✅ Section ${i + 1} captured`);
      }

      // 4. Try to capture specific dashboard elements
      try {
        // Look for common dashboard elements and click them
        const navigationItems = await page.$$eval('button, [role="tab"], .nav-item, [class*="tab"], [class*="menu"]', 
          elements => elements.map(el => ({
            text: el.textContent?.trim() || '',
            clickable: true
          }))
        );

        console.log(`   📋 Found ${navigationItems.length} interactive elements`);
        
        // Try clicking on different sections
        let clicked = 0;
        for (let i = 0; i < Math.min(5, navigationItems.length); i++) {
          try {
            const selector = `button:nth-of-type(${i + 1}), [role="tab"]:nth-of-type(${i + 1})`;
            await page.click(selector);
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            screenshotCount++;
            await page.screenshot({
              path: `${screenshotsDir}/${config.name}-interaction-${clicked + 1}.png`,
              fullPage: false
            });
            console.log(`   ✅ Interaction ${clicked + 1} captured`);
            clicked++;
          } catch (e) {
            // Continue if click fails
          }
        }
      } catch (e) {
        console.log('   ⚠️  Could not interact with dashboard elements');
      }

      // 5. Mobile responsive view
      console.log('   📱 Capturing mobile view...');
      await page.setViewport({ width: 375, height: 667 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      screenshotCount++;
      await page.screenshot({
        path: `${screenshotsDir}/${config.name}-mobile.png`,
        fullPage: true
      });

      // 6. Tablet responsive view
      console.log('   📱 Capturing tablet view...');
      await page.setViewport({ width: 768, height: 1024 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      screenshotCount++;
      await page.screenshot({
        path: `${screenshotsDir}/${config.name}-tablet.png`,
        fullPage: true
      });

      console.log(`   🎉 Completed ${config.name} dashboard`);

    } catch (error) {
      console.error(`   ❌ Error capturing ${config.name}:`, error.message);
    }

    await page.close();
  }

  await browser.close();

  console.log(`\n🎊 CAPTURE COMPLETE! 🎊`);
  console.log(`📊 Total screenshots: ${screenshotCount}`);
  console.log(`📁 Saved to: ${path.resolve(screenshotsDir)}`);

  // List captured files
  const files = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png'));
  console.log(`\n📋 Captured ${files.length} files:`);
  files.forEach((file, i) => console.log(`   ${i + 1}. ${file}`));
}

// Run the automation
captureDashboards()
  .then(() => {
    console.log('\n✅ AUTOMATION SUCCESSFUL!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ AUTOMATION FAILED:', error);
    process.exit(1);
  });
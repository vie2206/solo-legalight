const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Dashboard configurations for different user types
const dashboardConfigs = [
  { name: 'student', displayName: 'Student Dashboard' },
  { name: 'admin', displayName: 'Admin Dashboard' },
  { name: 'parent', displayName: 'Parent Dashboard' },
  { name: 'educator', displayName: 'Educator Dashboard' }
];

async function captureDashboards() {
  // Create screenshots directory
  const screenshotsDir = './dashboard-screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  console.log('🚀 Starting comprehensive dashboard screenshot capture...\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080
    },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });

  let screenshotCount = 0;
  
  for (const config of dashboardConfigs) {
    console.log(`🎯 Capturing ${config.displayName}...`);
    
    const page = await browser.newPage();
    
    // Navigate to screenshot generator
    console.log('   📡 Loading screenshot generator...');
    await page.goto('http://localhost:3001?mode=screenshots', { 
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Wait for page to fully load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Click on the appropriate dashboard button
    console.log(`   🖱️  Selecting ${config.displayName}...`);
    try {
      // Find and click the dashboard button
      await page.evaluate((dashboardName) => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const targetButton = buttons.find(button => 
          button.textContent.includes(dashboardName)
        );
        if (targetButton) {
          targetButton.click();
        } else {
          throw new Error(`Button for ${dashboardName} not found`);
        }
      }, config.displayName);
      
      // Wait for dashboard to load completely
      console.log('   ⏳ Waiting for dashboard to load...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Wait for any lazy-loaded components
      await page.waitForSelector('div', { timeout: 10000 });
      
      // Take comprehensive screenshots
      
      // 1. Full page screenshot
      screenshotCount++;
      const fullPagePath = `${screenshotsDir}/${config.name}-dashboard-full-page.png`;
      await page.screenshot({
        path: fullPagePath,
        fullPage: true,
        quality: 100
      });
      console.log(`   ✅ Full page screenshot saved`);
      
      // 2. Viewport screenshot
      screenshotCount++;
      const viewportPath = `${screenshotsDir}/${config.name}-dashboard-viewport.png`;
      await page.screenshot({
        path: viewportPath,
        fullPage: false,
        quality: 100
      });
      console.log(`   ✅ Viewport screenshot saved`);
      
      // 3. Multiple section screenshots by scrolling
      const scrollPositions = [0, 400, 800, 1200, 1600, 2000, 2400];
      
      for (let i = 0; i < scrollPositions.length; i++) {
        await page.evaluate((scrollY) => {
          window.scrollTo({ top: scrollY, behavior: 'smooth' });
        }, scrollPositions[i]);
        
        // Wait for scroll to complete and content to load
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        screenshotCount++;
        const sectionPath = `${screenshotsDir}/${config.name}-section-${i + 1}.png`;
        await page.screenshot({
          path: sectionPath,
          fullPage: false,
          quality: 100,
          clip: { x: 0, y: 0, width: 1920, height: 1080 }
        });
        console.log(`   ✅ Section ${i + 1} screenshot saved`);
      }
      
      // 4. Mobile responsive screenshots
      await page.setViewport({ width: 375, height: 667 }); // iPhone size
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      screenshotCount++;
      const mobilePath = `${screenshotsDir}/${config.name}-mobile-view.png`;
      await page.screenshot({
        path: mobilePath,
        fullPage: true,
        quality: 100
      });
      console.log(`   ✅ Mobile view screenshot saved`);
      
      // 5. Tablet responsive screenshots
      await page.setViewport({ width: 768, height: 1024 }); // iPad size
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      screenshotCount++;
      const tabletPath = `${screenshotsDir}/${config.name}-tablet-view.png`;
      await page.screenshot({
        path: tabletPath,
        fullPage: true,
        quality: 100
      });
      console.log(`   ✅ Tablet view screenshot saved`);
      
      // Reset viewport
      await page.setViewport({ width: 1920, height: 1080 });
      
    } catch (error) {
      console.error(`   ❌ Error capturing ${config.displayName}:`, error.message);
    }
    
    await page.close();
    console.log(`   🎉 Completed ${config.displayName} capture\n`);
  }
  
  await browser.close();
  
  console.log(`\n🎊 SCREENSHOT CAPTURE COMPLETE! 🎊`);
  console.log(`📊 Total screenshots captured: ${screenshotCount}`);
  console.log(`📁 Saved to: ${path.resolve(screenshotsDir)}`);
  console.log(`\n📋 Summary:`);
  dashboardConfigs.forEach(config => {
    console.log(`   • ${config.displayName}: ~${Math.floor(screenshotCount / dashboardConfigs.length)} screenshots`);
  });
}

// Run the capture with error handling
captureDashboards()
  .then(() => {
    console.log('\n✨ All done! Check your dashboard-screenshots folder.');
  })
  .catch((error) => {
    console.error('\n💥 Error during screenshot capture:', error);
    process.exit(1);
  });
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureDashboards() {
  // Create screenshots directory
  const screenshotsDir = './dashboard-screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  console.log('🚀 Starting SOLO Dashboard Screenshot Automation...\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      '--start-maximized',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  });

  const page = await browser.newPage();
  let screenshotCount = 0;

  try {
    // Navigate to the screenshot generator
    console.log('📡 Loading SOLO Screenshot Generator...');
    await page.goto('http://localhost:3001?mode=screenshots', { 
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    await new Promise(resolve => setTimeout(resolve, 5000));

    // Get all dashboard buttons by text content
    const dashboards = [
      { name: 'student', buttonText: 'Student' },
      { name: 'admin', buttonText: 'Admin' },
      { name: 'parent', buttonText: 'Parent' },
      { name: 'educator', buttonText: 'Educator' }
    ];

    for (const dashboard of dashboards) {
      console.log(`\n🎯 Capturing ${dashboard.name} dashboard...`);
      
      // Go back to menu if not already there
      try {
        await page.goto('http://localhost:3001?mode=screenshots', { 
          waitUntil: 'networkidle0',
          timeout: 30000 
        });
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (error) {
        console.log('   ⚠️  Refreshing page...');
        await page.reload();
        await new Promise(resolve => setTimeout(resolve, 5000));
      }

      // Find and click dashboard button
      console.log(`   🖱️  Clicking ${dashboard.buttonText} dashboard...`);
      
      try {
        // Try multiple methods to find and click the button
        const clicked = await page.evaluate((buttonText) => {
          // Method 1: Find by exact text content
          const buttons = Array.from(document.querySelectorAll('button'));
          let targetButton = buttons.find(btn => 
            btn.textContent && btn.textContent.toLowerCase().includes(buttonText.toLowerCase())
          );
          
          if (!targetButton) {
            // Method 2: Find by partial text match
            targetButton = buttons.find(btn => 
              btn.innerHTML && btn.innerHTML.toLowerCase().includes(buttonText.toLowerCase())
            );
          }
          
          if (!targetButton) {
            // Method 3: Find by class or div content
            const divs = Array.from(document.querySelectorAll('div'));
            const matchingDiv = divs.find(div => 
              div.textContent && div.textContent.toLowerCase().includes(buttonText.toLowerCase())
            );
            if (matchingDiv && matchingDiv.closest('button')) {
              targetButton = matchingDiv.closest('button');
            }
          }
          
          if (targetButton) {
            targetButton.click();
            return true;
          }
          
          return false;
        }, dashboard.buttonText);

        if (!clicked) {
          console.log(`   ❌ Could not find ${dashboard.buttonText} button`);
          continue;
        }

        // Wait for dashboard to load
        console.log(`   ⏳ Loading ${dashboard.buttonText} dashboard...`);
        await new Promise(resolve => setTimeout(resolve, 8000));

        // Take multiple screenshots with different approaches

        // 1. Full page screenshot
        console.log(`   📸 Capturing full page...`);
        screenshotCount++;
        await page.screenshot({
          path: `${screenshotsDir}/${dashboard.name}-full-page.png`,
          fullPage: true,
          quality: 100
        });

        // 2. Viewport screenshot
        console.log(`   📸 Capturing viewport...`);
        screenshotCount++;
        await page.screenshot({
          path: `${screenshotsDir}/${dashboard.name}-viewport.png`,
          fullPage: false,
          quality: 100
        });

        // 3. Specific element screenshots (try to find main dashboard content)
        try {
          const mainContent = await page.$('main, .dashboard, .content, [class*="dashboard"]');
          if (mainContent) {
            console.log(`   📸 Capturing main content...`);
            screenshotCount++;
            await mainContent.screenshot({
              path: `${screenshotsDir}/${dashboard.name}-main-content.png`,
              quality: 100
            });
          }
        } catch (e) {
          console.log(`   ⚠️  Could not capture main content`);
        }

        // 4. Scroll and capture sections
        console.log(`   📸 Capturing scrolled sections...`);
        const scrollPositions = [0, 500, 1000, 1500, 2000];
        
        for (let i = 0; i < scrollPositions.length; i++) {
          await page.evaluate((scrollY) => {
            window.scrollTo({ top: scrollY, behavior: 'instant' });
          }, scrollPositions[i]);
          
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          screenshotCount++;
          await page.screenshot({
            path: `${screenshotsDir}/${dashboard.name}-scroll-${i + 1}.png`,
            fullPage: false,
            quality: 100
          });
        }

        // 5. Mobile view
        console.log(`   📱 Capturing mobile view...`);
        await page.setViewport({ width: 375, height: 667 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        screenshotCount++;
        await page.screenshot({
          path: `${screenshotsDir}/${dashboard.name}-mobile.png`,
          fullPage: true,
          quality: 100
        });

        // 6. Tablet view  
        console.log(`   📱 Capturing tablet view...`);
        await page.setViewport({ width: 768, height: 1024 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        screenshotCount++;
        await page.screenshot({
          path: `${screenshotsDir}/${dashboard.name}-tablet.png`,
          fullPage: true,
          quality: 100
        });

        // Reset viewport
        await page.setViewport({ width: 1920, height: 1080 });
        
        console.log(`   ✅ Completed ${dashboard.name} dashboard (${screenshotCount} total so far)`);

      } catch (error) {
        console.error(`   ❌ Error with ${dashboard.name}:`, error.message);
      }
    }

  } catch (error) {
    console.error('💥 Fatal error:', error);
  } finally {
    await browser.close();
  }

  console.log(`\n🎊 AUTOMATION COMPLETE! 🎊`);
  console.log(`📊 Total screenshots captured: ${screenshotCount}`);
  console.log(`📁 Location: ${path.resolve(screenshotsDir)}`);
  
  // List all captured files
  if (fs.existsSync(screenshotsDir)) {
    const files = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png'));
    console.log(`\n📋 Captured Files (${files.length}):`);
    files.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`);
    });
  }
}

// Run the automation
captureDashboards()
  .then(() => {
    console.log('\n✨ SUCCESS! Check your dashboard-screenshots folder.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 FAILED:', error);
    process.exit(1);
  });
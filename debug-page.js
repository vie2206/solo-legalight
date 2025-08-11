const puppeteer = require('puppeteer');

async function debugPage() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();
  
  console.log('🔍 Loading page to debug...');
  await page.goto('http://localhost:3001?mode=screenshots', { 
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  await new Promise(resolve => setTimeout(resolve, 5000));

  // Get page content for debugging
  const pageContent = await page.evaluate(() => {
    return {
      title: document.title,
      url: window.location.href,
      buttons: Array.from(document.querySelectorAll('button')).map(btn => ({
        text: btn.textContent,
        innerHTML: btn.innerHTML,
        className: btn.className
      })),
      allText: document.body.textContent.substring(0, 500)
    };
  });

  console.log('📄 Page Debug Info:');
  console.log('Title:', pageContent.title);
  console.log('URL:', pageContent.url);
  console.log('Buttons found:', pageContent.buttons.length);
  
  pageContent.buttons.forEach((btn, index) => {
    console.log(`  Button ${index + 1}: "${btn.text.trim()}"`);
  });

  console.log('\n📝 Page text preview:');
  console.log(pageContent.allText);

  // Take a debug screenshot
  await page.screenshot({
    path: './debug-screenshot.png',
    fullPage: false,
    quality: 100
  });

  console.log('\n📸 Debug screenshot saved as debug-screenshot.png');

  await browser.close();
}

debugPage().catch(console.error);
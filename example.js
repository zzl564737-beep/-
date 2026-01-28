// web-visual-test.js
const { chromium } = require('playwright');
const percySnapshot = require('@percy/playwright');

(async () => {
  // 👇 替换为你想测试的网页 URL
  const TARGET_URL = 'https://sales-uat.chowtaifook.sz/salesapp-inventory/home';

  console.log(`🚀 开始视觉测试:  $ {TARGET_URL}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // 访问目标网页，等待网络空闲确保资源加载完成
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });

    // 拍摄 Percy 快照（关键步骤）
    await percySnapshot(page, 'Homepage');

    console.log('✅ 快照已捕获并准备上传到 Percy');
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  } finally {
    await browser.close();
  }
})();
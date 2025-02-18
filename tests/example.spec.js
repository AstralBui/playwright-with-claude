// tests/example.spec.js
const { test, expect } = require('@playwright/test');

test('Navigate to a page and analyze with Claude', async ({ page }) => {
  // Your test code here
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBeTruthy();
});

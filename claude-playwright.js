// claude-playwright.js
const { test, expect } = require('@playwright/test');
const { anthropic } = require('@anthropic-ai/sdk');

// Initialize Claude client
const claude = new anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

test('Run Claude AI with Playwright', async ({ page }) => {
  // Navigate to a website
  await page.goto('https://example.com');
  
  // Take a screenshot
  const screenshot = await page.screenshot({ path: 'screenshot.png' });
  
  // Convert screenshot to base64
  const base64Screenshot = screenshot.toString('base64');
  
  // Send the screenshot to Claude for analysis
  const message = await claude.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Please analyze this webpage screenshot and describe its content:'
          },
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/png',
              data: base64Screenshot
            }
          }
        ]
      }
    ]
  });
  
  // Log Claude's response
  console.log('Claude Analysis:', message.content);
  
  // You can also use Claude's response to make assertions
  expect(message.content.length).toBeGreaterThan(0);
});

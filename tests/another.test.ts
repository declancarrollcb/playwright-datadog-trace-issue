import { test, expect } from '@playwright/test';

const myTestDescriptor = 'DevGA'
test.beforeAll(async () => {
    // Just chilling here
    });

test(`${myTestDescriptor} Some other stuff`, async ({ page }) => {

    await test.step('Step 1', async () => {
        await page.goto('https://playwright.dev/');
    });

    await test.step('Step 2', async () => {
        
        await expect(page).toBeDefined();
    });
});

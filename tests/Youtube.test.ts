import { chromium } from 'playwright';
import {test} from "@playwright/test";

// async function watchShorts() {
//     const browser = await chromium.launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     // Open YouTube Shorts page
//     await page.goto('https://www.youtube.com/shorts/JMAxbp7sSMU');

//     // Wait for 30 seconds
//     for (let i = 0; i < 5; i++) {
//         console.log(`Watching for the ${i + 1}th time...`);
//         await page.waitForTimeout(30000); // Wait for 30 seconds
//     }

//     // Close the browser
//     await browser.close();
// }

// // Run the function
// watchShorts();


test("Register test_01", async ({page, baseURL}) => {
      

    // Open YouTube Shorts page
    await page.goto('https://www.youtube.com/shorts/JMAxbp7sSMU');

    // Wait for 30 seconds
    for (let i = 0; i < 5; i++) {
        console.log(`Watching for the ${i + 1}th time...`);
        await page.waitForTimeout(30000); // Wait for 30 seconds
    }
})

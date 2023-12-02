import { test, expect } from "@playwright/test"

test.describe("Tips & Tricks Section", () => {

    test("TestInfo Object", async ({ page }, testInfo) => {
        await page.goto("https://www.example.com")
        console.log(testInfo) 
        console.log(testInfo.expectedStatus)        
    })

    test.only("Skip Browser Annotation",async ({ page, browserName }) => {
        test.skip(browserName === "chromium", "Feature is not ready in Chrome browser")
        await page.goto("https://www.example.com")
        
    })

})
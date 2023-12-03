import { test, expect } from "@playwright/test"

test.describe("Tips & Tricks Section", () => {

    test("TestInfo Object", async ({ page }, testInfo) => {
        await page.goto("https://www.example.com")
        console.log(testInfo) 
        console.log(testInfo.expectedStatus)        
    })

    test("Skip Browser Annotation", async ({ page, browserName }) => {
        test.skip(browserName === "chromium", "Feature is not ready in Chrome browser")
        await page.goto("https://www.example.com")        
    })

    test("Fixme Annotation", async ({ page, browserName }) => {
        test.fixme(browserName === "chromium", "Test is not stable, needs revision")
        await page.goto("https://www.example.com")        
    })

    test("Retries", async ({ page }) => {
        await page.goto("https://www.example")  // invalid command        
    })

    const people = ['Mike', 'Judy', 'Peter', 'James', 'Alice']
    for(const name of people) {
        test.only(`Running test for ${name}`, async ({ page }) => {
            await page.goto("http://zero.webappsecurity.com/index.html")
            await page.fill("#searchTerm", `${name}`)
            await page.waitForTimeout(1000)        
        })
    }
})
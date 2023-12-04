import { test, expect } from "@playwright/test"
import { getRandomNumber, getRandomString } from "../../utils/data-helpers"

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
        test(`Running test for ${name}`, async ({ page }) => {
            await page.goto("http://zero.webappsecurity.com/index.html")
            await page.fill("#searchTerm", `${name}`)
            await page.waitForTimeout(1000)        
        })
    }

    test("Mouse Movement Simulation", async ({ page }) => {
        await page.goto("https://www.example.com")
        await page.mouse.move(0, 0)   
        await page.mouse.down()   
        await page.mouse.move(0, 100)   
        await page.mouse.up()   
    })

    test("Multiple Browser Tabs", async ({ browser }) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()
        await page1.goto("https://www.example.com")
        await page2.goto("https://www.example.com")
        await page3.goto("https://www.example.com")
        await page1.waitForTimeout(3000)
    })

    // 75. Device Emulation
    // npx playwright open --device="iPhone 11" wikipedia.org

    // 76. Generate PDF Files
    // npx playwright pdf https://example.com my-file.pdf

    // 77. Generate Customized Screenshots
    // npx playwright screenshot --device="iPhone 11" --color-scheme=dark --wait-for-timeout=3000 twitter.com twitter-iphone-image.png

    // 78. Emulate Browser Language & Timezone
    // npx playwright open --timezone="Europe/Rome" --lang="it-IT" google.com

    test("Random Number", async () => {
        let randomNumber = await getRandomNumber()
        console.log(randomNumber)        
    })

    test.only("Random String", async () => {
        let randomString = await getRandomString()
        console.log(randomString)        
    })
})
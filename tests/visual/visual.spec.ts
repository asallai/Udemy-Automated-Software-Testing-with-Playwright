import { test, expect } from "@playwright/test"

test.describe("Visual Regression Test Example", () => {
    test.only("Full Page Snapshot", async ({ page }) => {
        await page.goto("https://example.com")
        expect(await page.screenshot()).toMatchSnapshot("homepage.png")        
    })
})
import { test, expect } from "@playwright/test"

test.describe("Feedback Form", () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click("#feedback")
    })

    // Reset Feedback form
    test("Reset Feedback form",async ({ page }) => {
        await page.fill("#name", "user name")
        await page.fill("#email", "email@email.com")
        await page.fill("#subject", "subject text")
        await page.fill("#comment", "this is the comment text")
        await page.click("input[name='clear']")

        const nameInput = await page.locator("#name")
        const commentInput = await page.locator("#comment")
        await expect(nameInput).toBeEmpty()
        await expect(commentInput).toBeEmpty()        
    })

    // Submit feedback form
    test("Submit Feedback form",async ({ page }) => {
        await page.fill("#name", "user name")
        await page.fill("#email", "email@email.com")
        await page.fill("#subject", "subject text")
        await page.fill("#comment", "this is the comment text")
        await page.click("input[type='submit']")

        await page.waitForSelector("#feedback-title")        
    })
})
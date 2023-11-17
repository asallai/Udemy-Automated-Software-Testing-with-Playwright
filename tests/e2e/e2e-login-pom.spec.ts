import { test, expect} from "@playwright/test"
import { LoginPage } from "../../page-objects/LoginPage"

test.describe.only("Login / Logout Flow", () => {
    let loginPage: LoginPage
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.visit()
    })

    test("Positive scenario for login + logout", async ({ page }) => {
        await page.click("#signin_button")
        await loginPage.login('username', 'password')

        const accountSummaryTab = await page.locator("#account_summary_tab")
        await expect(accountSummaryTab).toBeVisible()

        await page.goto("http://zero.webappsecurity.com/logout.html")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    })

    test("Negative scenario for Login", async ({ page }) => {
        await page.click("#signin_button")
        await loginPage.login('invalid username', 'invalid password')
        await loginPage.assertErrorMessage()      
    })    
})
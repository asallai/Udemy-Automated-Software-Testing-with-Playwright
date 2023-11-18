import { test, expect } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { LoginPage } from "../../page-objects/LoginPage"

test.describe("New Payment", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        
        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login("username", "password")
    })
    
    test("Should send new payment", async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
        await page.click("#pay_bills_tab")
        await page.selectOption("#sp_payee", 'apple')
        await page.click("#sp_get_payee_details")
        await page.waitForSelector("#sp_payee_details")
        await page.selectOption("#sp_account", "6")
        await page.fill("#sp_amount", "500")
        await page.fill("#sp_date", '2023-11-15')
        await page.fill('#sp_description', 'some message')
        await page.click('#pay_saved_payees')

        const message = await page.locator('#alert_content > span')
        await expect(message).toBeVisible()
        await expect(message).toContainText('The payment was successfully submitted.')        
    })    
})
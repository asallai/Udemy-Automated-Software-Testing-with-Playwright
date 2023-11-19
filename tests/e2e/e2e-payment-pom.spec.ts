import { test, expect } from "@playwright/test"
import { NavigationBar } from "../../page-objects/components/NavigationBar"
import { HomePage } from "../../page-objects/HomePage"
import { LoginPage } from "../../page-objects/LoginPage"
import { PaymentPage } from "../../page-objects/PaymentPage"

test.describe("New Payment", () => {
    let navigationBar: NavigationBar
    let homePage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage

    test.beforeEach(async ({ page }) => {
        navigationBar = new NavigationBar(page)
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        paymentPage = new PaymentPage(page)
        
        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login("username", "password")
    })
    
    test("Should send new payment", async ({ page }) => {
        await navigationBar.clickOnTab("Pay Bills")
        await paymentPage.createPayment()
        await paymentPage.assertSuccessMessage()        
    })    
})
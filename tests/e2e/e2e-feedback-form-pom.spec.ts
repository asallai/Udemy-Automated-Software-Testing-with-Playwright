import { test } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { FeedbackPage } from "../../page-objects/FeedbackPage"

test.describe("Feedback Form", () => {
    let homePage: HomePage
    let feedbackPage: FeedbackPage
    
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page)
      feedbackPage = new FeedbackPage(page)

      await homePage.visit()
      await homePage.clickOnFeedbackLink()
    })

    // Reset Feedback form
    test("Reset Feedback form",async ({ page }) => {
        await feedbackPage.fillForm("username", "email@email.com", "subject text", "my comment")
        await feedbackPage.resetForm()
        await feedbackPage.assertReset()
    })

    // Submit feedback form
    test("Submit Feedback form",async ({ page }) => {
        await feedbackPage.fillForm("username", "email@email.com", "subject text", "my comment")
        await feedbackPage.submitForm()
        await feedbackPage.assertFeedbackFormSent()        
    })
})
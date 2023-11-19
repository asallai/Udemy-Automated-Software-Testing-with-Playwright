import { expect, Locator, Page } from "@playwright/test"

export class PaymentPage {
    readonly page: Page
    readonly payeeDropdown: Locator
    readonly payeeDetailsButton: Locator
    readonly payeeDetailsText: Locator
    readonly accountDropdown: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly messageText: Locator
    
    constructor(page: Page) {
        this.page = page
        this.payeeDropdown = page.locator("#sp_payee")
        this.payeeDetailsButton = page.locator("#sp_get_payee_details")
        this.payeeDetailsText = page.locator("#sp_payee_details")
        this.accountDropdown = page.locator("#sp_account")
        this.amountInput = page.locator("#sp_amount")
        this.dateInput = page.locator("#sp_date")
        this.descriptionInput = page.locator("#sp_description")
        this.submitPaymentButton = page.locator("#pay_saved_payees")
        this.messageText = page.locator("#alert_content > span")
    }
 
    async createPayment() {
        await this.payeeDropdown.selectOption("apple")
        await this.payeeDetailsButton.click()
        await expect(this.payeeDetailsText).toBeVisible()

        await this.accountDropdown.selectOption("6")
        await this.amountInput.fill("1000")
        await this.dateInput.fill("2023-11-19")
        await this.descriptionInput.fill("some text")
        await this.submitPaymentButton.click()
    }

    async assertSuccessMessage() {
        await expect(this.messageText).toBeVisible()
        await expect(this.messageText).toContainText("The payment was successfully submitted.")
    }
}
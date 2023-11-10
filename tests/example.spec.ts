import { test, expect } from '@playwright/test'

import { loadHomePage, assertTitle } from '../helpers'

test('Simple basic test', async ({ page }) => {
    await page.goto('https://example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test('Click on Element @myTag', async ({ page })  => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.skip('Selectors', async ({ page }) => {
    // text
    await page.click('text=some text')

    // CSS selectors
    await page.click('h1')
    await page.click('#id')
    await page.click('.class')
    
    // Only visible CSS selector
    await page.click('.submit-button:visible')
    
    // Combinations
    await page.click('h2 .first')

    // XPath
    await page.click('//button')
})

test.describe('My first test suite', () => {
    test('Working with Inputs @myTag', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        
        await page.fill('#user_login', 'incorrect username')
        await page.fill('#user_password', 'some password')
        await page.click('text=Sign in')
    
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')    
    })
    
    test('Assertions', async ({ page}) => {
        await page.goto('https://example.com')
    
        await expect(page).toHaveURL('https://example.com')
        await expect(page).toHaveTitle('Example Domain')
    
        const element = await page.locator('h1')
        await expect(element).toBeVisible
        await expect(element).toHaveText('Example Domain')
        await expect(element).toHaveCount(1)
    
        const nonExistingElement = await page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible
    })
})

test.describe('Hooks', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com/')          
    })

    test('Full page Screenshot', async ({ page }) => {
       // await page.goto('https://example.com/')    
        await page.screenshot({ path: 'screenshot.png', fullPage: true })    
    })
    
    test('Single element Screenshot', async ({ page }) => {
      //  await page.goto('https://example.com/')
        const element = await page.locator('h1')
        await element.screenshot({ path: 'single-element-screenshot.png' })    
    })    
})

test.only('Custom Helpers', async ({ page }) => {
    await loadHomePage(page)
    await page.pause()
    await assertTitle(page)    
})

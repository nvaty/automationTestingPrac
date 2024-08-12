### Ngx-Admin Angular 14 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Playwright.

The original repo is here: https://github.com/akveo/ngx-admin

notes --
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:58889/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.skip('locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
})


test.skip('locator syntax rules', async ({ page }) => {
    //by tag Name
    await page.locator('input').first().click()

    //by id
    await page.locator('#inputEmail1').first().click()

    //by class value
    await page.locator('.shape-rectangle').first().click()

    //by attribute
    await page.locator('[placeholder="Email"]').first().click()

    //by entire class value
    await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]').first().click()

    //by combining different selectors
    await page.locator('input[placeholder="Email"].shape-rectangle').first().click()

    //by Xpath
    await page.locator('//*[@id="inputEmail1"]').first().click()

    //by partial text match
    await page.locator(':text("Using")').click()

    //by exact text match
    await page.locator(':text-is("Using the Grid")').click()

})

test.skip('userFacingLocators', async ({ page }) => {
    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', { name: "Sign in" }).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Form without labels').click()
    await page.getByTitle('IoT Dashboard').click()
})

test.skip('locating child elements again', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card nb-radio :text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click()
})

test.skip('finding parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: "Basic form" }).getByRole('button', { name: "Submit" }).click()
    await page.locator('nb-card', { has: page.locator(':text-is("Basic form")') }).getByRole('button', { name: "Submit" }).click()
    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('button', { name: "Submit" }).click()
    await page.locator('nb-card').filter({ has: page.locator(':text-is("Basic form")') }).getByRole('button', { name: "Submit" }).click()

})

test.skip('reusing locators', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const emailField = basicForm.getByRole('textbox', { name: "Email" })

    await emailField.fill('n@n.com')
    await basicForm.getByRole('textbox', { name: "Password" }).fill('str0ngPa$sword')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()
    await expect(emailField).toHaveValue('n@n.com')

})

test.skip('extracting values from elements', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    const allRadioButtonText = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonText).toContain('Option 2')

    const emailField = basicForm.getByRole('textbox', { name: "Email" })
    await emailField.fill('test@test.com')
    const emailvalue = await emailField.inputValue()
    expect(emailvalue).toEqual('test@test.com')

    const attributeValue = await emailField.getAttribute('placeholder')
    expect(attributeValue).toEqual('Email')

})

test('assertions', async ({page}) => {
    const basicFormButton = page.locator('nb-card').filter({ hasText: "Basic form" }).locator('button')
    const buttonText = await basicFormButton.textContent()
    //general assertion
    expect(buttonText).toEqual('Submit')
    //locator assertion
    await expect(basicFormButton).toHaveValue('Submit')
    //soft assertion
    await expect.soft(basicFormButton).toHaveValue('Submit1')
    await basicFormButton.click()
})







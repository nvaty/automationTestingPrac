import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

/*test('user facing locators', async ({ page }) => {
    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', { name: "Sign in" }).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByTitle('IoT Dashboard').click()

})

test('locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
})

test('locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: "Password" }).click()
})
*/

test('locator syntax rules', async ({page}) => {
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


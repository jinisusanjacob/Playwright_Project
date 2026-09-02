const {test, expect} = require('@playwright/test')

test.beforeEach(async ({page}) =>
{
    await page.goto("https://www.demoblaze.com")
}
)

test('TC_01 Sign Up successfully', async ({page}) =>
{
   const username = `Jini_${Date.now()}`
   await page.locator('#signin2').click()
   await page.locator('#sign-username').fill(username)
   await page.locator('#sign-password').fill('Db123!!')
   page.on('dialog', async dialogok =>
   {
      await expect (dialogok.message()).toBe('Sign up successful.')
      await dialogok.accept()
   }
   )
   await page.getByRole('button', { name: 'Sign up' }).click()
   await expect(page).toHaveURL('https://www.demoblaze.com/')
   await page.pause()
}
)

test('TC_02 Close without signing up', async ({page}) =>
{
   await page.locator('#signin2').click()
   await page.locator('#sign-username').fill('jinisj')
   await page.locator('#sign-password').fill('Db123!!')
   await page.locator('//button[@class="btn btn-secondary"]').nth(1).click()
   await expect(page).toHaveURL('https://www.demoblaze.com/')
   await page.pause()
}
)

test('TC_03 Login with valid credentials', async ({page}) =>
{
   await page.locator('#login2').click()
   await page.locator('#loginusername').fill('jinisj')
   await page.locator('#loginpassword').fill('Db123!!')
   await page.getByRole('button', { name: 'Log in' }).click()
   await expect(page.locator('#nameofuser')).toContainText('jinisj')
   await page.pause()
}
)

test('TC_04 Login with invalid username', async ({page}) =>
{
   await page.locator('#login2').click()
   await page.locator('#loginusername').fill('00jinisj')
   await page.locator('#loginpassword').fill('Db123!!')
   page.on('dialog', async erruser =>
   {
      await expect(erruser.message()).toBe('User does not exist.')
      await erruser.accept()
   }
   )
   await page.getByRole('button', { name: 'Log in' }).click()
   await page.pause()
}
)

test('TC_05 Login with invalid password', async ({page}) =>
{
   await page.locator('#login2').click()
   await page.locator('#loginusername').fill('jinisj')
   await page.locator('#loginpassword').fill('0Db123!!')
   page.on('dialog', async errpassword =>
   {
      await expect(errpassword.message()).toBe('Wrong password.')
      await errpassword.accept()
   }
   )
   await page.getByRole('button', { name: 'Log in' }).click()
   await page.pause()
}
)

test('TC_06 Login with invalid username and password', async ({page}) =>
{
   await page.locator('#login2').click()
   await page.locator('#loginusername').fill('jjinisj')
   await page.locator('#loginpassword').fill('0Db123!!')
   page.on('dialog', async erruserpassword =>
   {
      await expect(erruserpassword.message()).toBe('User does not exist.')
      await erruserpassword.accept()
   }
   )
   await page.getByRole('button', { name: 'Log in' }).click()
   await page.pause()
}
)

test('TC_07 Add a product to cart', async ({page}) =>
{
   await page.locator('#login2').click()
   await page.locator('#loginusername').fill('jinisj')
   await page.locator('#loginpassword').fill('Db123!!')
   await page.getByRole('button', { name: 'Log in' }).click()
   await expect(page.locator('#nameofuser')).toContainText('jinisj')
   await page.pause()
   await page.locator('//a[@class="hrefch"]').nth(6).click()
   page.on('dialog', async cartAlert =>
   {
      await expect(cartAlert.message()).toBe('Product added.')
      await cartAlert.accept()
   }
   )
   await page.locator('//a[@class="btn btn-success btn-lg"]').click()
   await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=7#')
   await page.pause()
}
)

test('TC_08 Purchase a product under Phones category', async ({page}) =>
{
   await page.locator('#login2').click()
   await page.locator('#loginusername').fill('jinisj')
   await page.locator('#loginpassword').fill('Db123!!')
   await page.getByRole('button', { name: 'Log in' }).click()
   await expect(page.locator('#nameofuser')).toContainText('jinisj')
   await page.pause()
   await page.getByRole('link', { name: 'Phones' }).click()
   await page.getByRole('link', { name: 'Sony xperia z5'}).click()
   await page.pause()
   page.on('dialog', async phoneAlert =>
   {
      await expect(phoneAlert.message()).toBe('Product added.')
      await phoneAlert.accept()
   }
   )
   await page.locator('//a[@class="btn btn-success btn-lg"]').click()
   await page.pause()
   await page.locator('#cartur').click()
   const phone = await page.getByRole('cell', { name: 'Sony xperia z5' })
   await expect(phone).toContainText('xperia')
   await page.getByRole('button', { name: 'Place Order' }).click()
   await page.locator('#name').fill('Jini')
   await page.locator('#country').fill('India')
   await page.locator('#city').fill('Pathanamthitta')
   await page.locator('#card').fill('987654326543')
   await page.locator('#month').fill('01')
   await page.locator('#year').fill('2030')
   await page.getByRole('button', { name: 'Purchase' }).click()
   const confirmationMessage = await page.getByRole('heading', { name: 'Thank you for your purchase!' })
   await expect(confirmationMessage).toBeVisible()
   await page.pause()
   await page.getByRole('button', { name: 'OK' }).click()
   await page.pause()
}
)

test('TC_09 Purchase a product under Monitors category', async ({page}) =>
{
   await page.locator('#login2').click()
   await page.locator('#loginusername').fill('jinisj')
   await page.locator('#loginpassword').fill('Db123!!')
   await page.getByRole('button', { name: 'Log in' }).click()
   await expect(page.locator('#nameofuser')).toContainText('jinisj')
   await page.pause()
   await page.getByRole('link', { name: 'Monitors' }).click()
   await page.getByRole('link', { name: 'ASUS Full HD'}).click()
   await page.pause() 
   page.on('dialog', async monitorAlert =>
   {
      await expect(monitorAlert.message()).toBe('Product added.')
      await monitorAlert.accept()
   }
   )
   await page.locator('//a[@class="btn btn-success btn-lg"]').click()
   await page.pause()
   await page.locator('#cartur').click()
   const monitor = await page.getByRole('cell', { name: 'ASUS Full HD' })
   await expect(monitor).toContainText('ASUS')
   await page.getByRole('button', { name: 'Place Order' }).click()
   await page.locator('#name').fill('Jini')
   await page.locator('#country').fill('India')
   await page.locator('#city').fill('Pathanamthitta')
   await page.locator('#card').fill('987654326543')
   await page.locator('#month').fill('01')
   await page.locator('#year').fill('2030')
   await page.getByRole('button', { name: 'Purchase' }).click()
   const confirmationMessage = await page.getByRole('heading', { name: 'Thank you for your purchase!' })
   await expect(confirmationMessage).toBeVisible()
   await page.pause()
   await page.getByRole('button', { name: 'OK' }).click()
   await page.pause()
}
)

test('TC_10 Login and logout', async ({page}) =>
{
   await page.locator('#login2').click()
   await page.locator('#loginusername').fill('jinisj')
   await page.locator('#loginpassword').fill('Db123!!')
   await page.getByRole('button', { name: 'Log in' }).click()
   await expect(page.locator('#nameofuser')).toContainText('jinisj')
   await page.pause()
   await page.locator('#logout2').click()
   await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
   await expect(page.locator('#login2')).toBeVisible()
   await page.pause()
}
)
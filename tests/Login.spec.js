const {test, expect} = require('@playwright/test')
const validLoginData = require('../test-data/login.json')
const invalidLoginData = require('../test-data/invalidLogin.json')
const Login = require('../pages/LoginPage')

test.beforeEach(async ({page}) =>
{
    await page.goto("https://www.demoblaze.com")
}
)

test('TC_03 Login with valid credentials', async ({page}) =>
{
   const objectLogin = new Login(page)
   await objectLogin.clickLogin()
   await objectLogin.enterLoginUsername(validLoginData.username)
   await objectLogin.enterLoginPassword(validLoginData.password)
   const objectPlaceorder = await objectLogin.login()
   await expect(page.locator('#nameofuser')).toContainText('jinisj')
   await page.pause()
}
)

test('TC_04 Login with invalid username', async ({page}) =>
{
   const objectLogin = new Login(page)
   await objectLogin.clickLogin()
   await objectLogin.enterLoginUsername(invalidLoginData[0].username)
   await objectLogin.enterLoginPassword(invalidLoginData[0].password)
   page.on('dialog', async erruser =>
   {
      await expect(erruser.message()).toBe('User does not exist.')
      await erruser.accept()
   }
   )
   await objectLogin.login()
   await page.pause()
}
)

test('TC_05 Login with invalid password', async ({page}) =>
{
   const objectLogin = new Login(page)
   await objectLogin.clickLogin()
   await objectLogin.enterLoginUsername(invalidLoginData[1].username)
   await objectLogin.enterLoginPassword(invalidLoginData[1].password)
   page.on('dialog', async errpassword =>
   {
      await expect(errpassword.message()).toBe('Wrong password.')
      await errpassword.accept()
   }
   )
   await objectLogin.login()
   await page.pause()
}
)

test('TC_06 Login with invalid username and password', async ({page}) =>
   {
   const objectLogin = new Login(page)
   await objectLogin.clickLogin()
   await objectLogin.enterLoginUsername(invalidLoginData[2].username)
   await objectLogin.enterLoginPassword(invalidLoginData[2].password)
   page.on('dialog', async erruserpassword =>
   {
      await expect(erruserpassword.message()).toBe('User does not exist.')
      await erruserpassword.accept()
   }
   )
   await objectLogin.login()
   await page.pause()
}
)


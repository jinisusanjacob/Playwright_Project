const {test, expect} = require('@playwright/test')
const validLoginData = require('../test-data/login.json')
const Login = require('../pages/LoginPage')
const Logout = require('../pages/LogoutPage')

test('TC_10 Login and logout', async ({page}) =>
{
   const objectLogin = new Login(page)
   await page.goto('https://www.demoblaze.com')
   await objectLogin.clickLogin()
   await objectLogin.enterLoginUsername(validLoginData.username)
   await objectLogin.enterLoginPassword(validLoginData.password)
   const objectPlaceOrder = await objectLogin.login()
   const usernameElement = page.locator('#nameofuser')
   await usernameElement.waitFor({ state: 'visible' })
   await expect(usernameElement).toContainText('jinisj')
   // await page.pause()
   
   const objectLogout = new Logout(page)
   await objectLogout.clickLogout()
   //await objectPlaceOrder.clickLogout()
   await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
   await expect(page.locator('#login2')).toBeVisible()
   // await page.pause()
}
)
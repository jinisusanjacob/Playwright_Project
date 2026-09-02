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
   await expect(page.locator('#nameofuser')).toContainText('jinisj')
   await page.pause()
   
   const objectLogout = new Logout(page)
   await objectLogout.clickLogout()
   //await objectPlaceOrder.clickLogout()
   await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
   await expect(page.locator('#login2')).toBeVisible()
   await page.pause()
}
)
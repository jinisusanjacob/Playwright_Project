const {test, expect} = require('@playwright/test')
const validLoginData = require('../test-data/login.json')
const Login = require('../pages/LoginPage')
const PlaceOrder = require('../pages/PlaceOrderPage')

test.beforeEach(async ({page}) =>
{
    await page.goto("https://www.demoblaze.com")
}
)

test('TC_07 Add a product to cart', async ({page}) =>
{
   const objectLogin = new Login(page)
   await objectLogin.clickLogin()
   await objectLogin.enterLoginUsername(validLoginData.username)
   await objectLogin.enterLoginPassword(validLoginData.password)
   const objectPlaceOrder = await objectLogin.login()
   const usernameElement = page.locator('#nameofuser')
   await usernameElement.waitFor({ state: 'visible' })
   await expect(usernameElement).toContainText('jinisj')
   // await page.pause()
   await objectPlaceOrder.selectProduct('Sony xperia z5')
   page.on('dialog', async cartAlert =>
   {
      await expect(cartAlert.message()).toBe('Product added.')
      await cartAlert.accept()
   }
   )
   await objectPlaceOrder.addProductToCart()
   await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=6#')
   // await page.pause()
}
) 

test('TC_08 Purchase a product under Phones category', async ({page}) =>
{
   const objectLogin = new Login(page)
   await objectLogin.clickLogin()
   await objectLogin.enterLoginUsername(validLoginData.username)
   await objectLogin.enterLoginPassword(validLoginData.password)
   const objectPlaceOrder = await objectLogin.login()
   const usernameElement = page.locator('#nameofuser')
   await usernameElement.waitFor({ state: 'visible' })
   await expect(usernameElement).toContainText('jinisj')
   // await page.pause()
   await objectPlaceOrder.selectCategories('Phones')
   await objectPlaceOrder.selectProduct('Sony xperia z5')
   // await page.pause()
   page.on('dialog', async phoneAlert =>
   {
      await expect(phoneAlert.message()).toBe('Product added.')
      await phoneAlert.accept()
   }
   )
   await objectPlaceOrder.addProductToCart()
   await objectPlaceOrder.clickCartIcon()
   // await page.pause()
   // const phone = await page.getByRole('cell', { name: 'Sony xperia z5' })
   // await expect(phone).toContainText('xperia')
   await expect(page).toHaveURL('https://www.demoblaze.com/cart.html')
   await objectPlaceOrder.clickPlaceOrder()
   await objectPlaceOrder.enterDetails()
   await objectPlaceOrder.clickPurchaseButton()
   const confirmationMessage = await page.getByRole('heading', { name: 'Thank you for your purchase!' })
   await expect(confirmationMessage).toBeVisible()
   // await page.pause()
   await objectPlaceOrder.confirmSuccessOrder()
   // await page.pause()
}
)

test('TC_09 Purchase a product under Monitors category', async ({page}) =>
{
   const objectLogin = new Login(page)
   await objectLogin.clickLogin()
   await objectLogin.enterLoginUsername(validLoginData.username)
   await objectLogin.enterLoginPassword(validLoginData.password)
   const objectPlaceOrder = await objectLogin.login()
   const usernameElement = page.locator('#nameofuser')
   await usernameElement.waitFor({ state: 'visible' })
   await expect(usernameElement).toContainText('jinisj')
   // await page.pause()
   await objectPlaceOrder.selectCategories('Monitors')
   await objectPlaceOrder.selectProduct('ASUS Full HD')
   // await page.pause()
   page.on('dialog', async monitorAlert =>
   {
      await expect(monitorAlert.message()).toBe('Product added.')
      await monitorAlert.accept()
   }
   )
   await objectPlaceOrder.addProductToCart()
   await objectPlaceOrder.clickCartIcon()
   // await page.pause()
   // const monitor = await page.getByRole('cell', { name: 'ASUS Full HD' })
   // await expect(monitor).toContainText('ASUS')
   await expect(page).toHaveURL('https://www.demoblaze.com/cart.html')
   await objectPlaceOrder.clickPlaceOrder()
   await objectPlaceOrder.enterDetails()
   await objectPlaceOrder.clickPurchaseButton()
   const confirmationMessage = await page.getByRole('heading', { name: 'Thank you for your purchase!' })
   await expect(confirmationMessage).toBeVisible()
   // await page.pause()
   await objectPlaceOrder.confirmSuccessOrder()
   // await page.pause()
}
)

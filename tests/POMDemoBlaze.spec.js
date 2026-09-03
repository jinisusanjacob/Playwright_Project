const {test, expect} = require('@playwright/test')
const Homepage = require('../testpages/TestHomepage')
const validUserDetails = require('../test-data/login.json')
const invalidUserDetails = require('../test-data/invalidLogin.json')

test.beforeEach(async ({page}) =>
{
    await page.goto("https://www.demoblaze.com")
}
)

test('TC_01 Sign Up successfully', async ({page}) =>
{
   const signupUser = `Jini_${Date.now()}`
   const signupPass = 'Jini' + Date.now()
   const objectHomepage = new Homepage(page)
   await objectHomepage.clickSignUp()
   await objectHomepage.enterSignupUsername(signupUser)
   await objectHomepage.enterSignupPassword(signupPass)
//    await page.pause()
   
   page.on('dialog', async dialogok =>
   {
      await expect (dialogok.message()).toBe('Sign up successful.')
      await dialogok.accept()
   }
   )
   await objectHomepage.Signup()
   await expect(page).toHaveURL('https://www.demoblaze.com/')
//    await page.pause()
}
)

test('TC_02 Close without signing up', async ({page}) =>
{
   const signupUser = `Jini_${Date.now()}`
   const signupPass = 'Jini' + Date.now()
   const objectHomepage = new Homepage(page)
   await objectHomepage.clickSignUp()
   await objectHomepage.enterSignupUsername(signupUser)
   await objectHomepage.enterSignupPassword(signupPass)
//    await page.pause()
   await objectHomepage.closeSignup()
   await expect(page).toHaveURL('https://www.demoblaze.com/')
//    await page.pause()
}
)

test('TC_03 Login with valid credentials', async ({page}) =>
{
   const objectHomepage = new Homepage(page)
   await objectHomepage.clickLogin()
   await objectHomepage.enterLoginUsername(validUserDetails.username)
   await objectHomepage.enterLoginPassword(validUserDetails.password)
//    await page.pause()
   await objectHomepage.login()
   
   await expect(page.locator('#nameofuser')).toContainText('jinisj')
//    await page.pause()
}
)

test('TC_04 Login with invalid username', async ({page}) =>
{
   const objectHomepage = new Homepage(page)
   await objectHomepage.clickLogin()
   await objectHomepage.enterLoginUsername(invalidUserDetails[0].username)
   await objectHomepage.enterLoginPassword(invalidUserDetails[0].password)
//    await page.pause()
   page.on('dialog', async erruser =>
   {
      await expect(erruser.message()).toBe('User does not exist.')
      await erruser.accept()
   }
   )
   await objectHomepage.login()
//    await page.pause()
}
)

test('TC_05 Login with invalid password', async ({page}) =>
{
   const objectHomepage = new Homepage(page)
   await objectHomepage.clickLogin()
   await objectHomepage.enterLoginUsername(invalidUserDetails[1].username)
   await objectHomepage.enterLoginPassword(invalidUserDetails[1].password)
//    await page.pause()
   page.on('dialog', async errpassword =>
   {
      await expect(errpassword.message()).toBe('Wrong password.')
      await errpassword.accept()
   }
   )
   await objectHomepage.login()
//    await page.pause()
}
)

test('TC_06 Login with invalid username and password', async ({page}) =>
{
   const objectHomepage = new Homepage(page)
   await objectHomepage.clickLogin()
   await objectHomepage.enterLoginUsername(invalidUserDetails[2].username)
   await objectHomepage.enterLoginPassword(invalidUserDetails[2].password)
//    await page.pause()
   page.on('dialog', async erruserpassword =>
   {
      await expect(erruserpassword.message()).toBe('User does not exist.')
      await erruserpassword.accept()
   }
   )
   await objectHomepage.login()
//    await page.pause()
}
)

test('TC_07 Add a product to cart', async ({page}) =>
{
   const objectHomepage = new Homepage(page)
   await objectHomepage.clickLogin()
   await objectHomepage.enterLoginUsername(validUserDetails.username)
   await objectHomepage.enterLoginPassword(validUserDetails.password)
//    await page.pause()
   await objectHomepage.login()
   await expect(page.locator('#nameofuser')).toContainText('jinisj')
//    await page.pause()
   const objectProductSelectedPage = await objectHomepage.selectProduct('Sony xperia z5')

   page.on('dialog', async cartAlert =>
   {
      await expect(cartAlert.message()).toBe('Product added.')
      await cartAlert.accept()
   }
   )
   await objectProductSelectedPage.addProductToCart()
   await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=6#')
   const objectPlaceorderPage = await objectProductSelectedPage.clickCartIcon() 
   await objectPlaceorderPage.deleteProduct()
//    await page.pause()
}
)

test('TC_08 Purchase a product under Phones category', async ({page}) =>
{
   const objectHomepage = new Homepage(page)
   await objectHomepage.clickLogin()
   await objectHomepage.enterLoginUsername(validUserDetails.username)
   await objectHomepage.enterLoginPassword(validUserDetails.password)
//    await page.pause()
   await objectHomepage.login()
   await expect(page.locator('#nameofuser')).toContainText('jinisj')
//    await page.pause()
   await objectHomepage.selectCategories('Phones')
   const objectproductSelectedPage = await objectHomepage.selectProduct('Sony xperia z5')
//    await page.pause()
   page.on('dialog', async phoneAlert =>
   {
      await expect(phoneAlert.message()).toBe('Product added.')
      await phoneAlert.accept()
   }
   )
   await objectproductSelectedPage.addProductToCart()
   const objectPlaceorderPage = await objectproductSelectedPage.clickCartIcon()
   // const phone = await page.getByRole('cell', { name: 'Sony xperia z5' })
   // await expect(phone).toContainText('xperia')
   await expect(page).toHaveURL('https://www.demoblaze.com/cart.html')
   await objectPlaceorderPage.clickPlaceOrder()
   await objectPlaceorderPage.enterDetails()
   await objectPlaceorderPage.clickPurchaseButton()
   const confirmationMessage = await page.getByRole('heading', { name: 'Thank you for your purchase!' })
   await expect(confirmationMessage).toBeVisible()
//    await page.pause()
   await objectPlaceorderPage.confirmSuccessOrder()
//    await page.pause()
}
)

test('TC_09 Purchase a product under Monitors category', async ({page}) =>
{
   const objectHomepage = new Homepage(page)
   await objectHomepage.clickLogin()
   await objectHomepage.enterLoginUsername(validUserDetails.username)
   await objectHomepage.enterLoginPassword(validUserDetails.password)
//    await page.pause()
   await objectHomepage.login()
   await expect(page.locator('#nameofuser')).toContainText('jinisj')
//    await page.pause()
   await objectHomepage.selectCategories('Monitors')
   const objectproductSelectedPage = await objectHomepage.selectProduct('ASUS Full HD')
//    await page.pause()
   page.on('dialog', async monitorAlert =>
   {
      await expect(monitorAlert.message()).toBe('Product added.')
      await monitorAlert.accept()
   }
   )
   await objectproductSelectedPage.addProductToCart()
   const objectPlaceorderPage = await objectproductSelectedPage.clickCartIcon()
   // const monitor = await page.getByRole('cell', { name: 'ASUS Full HD' })
   // await expect(monitor).toContainText('ASUS')
   await expect(page).toHaveURL('https://www.demoblaze.com/cart.html')
   await objectPlaceorderPage.clickPlaceOrder()
   await objectPlaceorderPage.enterDetails()
   await objectPlaceorderPage.clickPurchaseButton()
   const confirmationMessage = await page.getByRole('heading', { name: 'Thank you for your purchase!' })
   await expect(confirmationMessage).toBeVisible()
//    await page.pause()
   await objectPlaceorderPage.confirmSuccessOrder()
//    await page.pause()
}
)

test('TC_10 Login and logout', async ({page}) =>
{
   const objectHomepage = new Homepage(page)
   await objectHomepage.clickLogin()
   await objectHomepage.enterLoginUsername(validUserDetails.username)
   await objectHomepage.enterLoginPassword(validUserDetails.password)
//    await page.pause()
   await objectHomepage.login()
   await expect(page.locator('#nameofuser')).toContainText('jinisj')
//    await page.pause()
   await objectHomepage.clickLogout()
   await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
   await expect(page.locator('#login2')).toBeVisible()
//    await page.pause()
}
)
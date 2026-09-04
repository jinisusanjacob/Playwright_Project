const {test, expect} = require('@playwright/test')
const Signup = require('../pages/SignupPage')
const {faker} = require('@faker-js/faker')

test.beforeEach(async ({page}) =>
{
    await page.goto("https://www.demoblaze.com")
}
)

test('TC_01 Sign Up successfully', async ({page}) =>
{
   const objectSignup = new Signup(page)
   await objectSignup.clickSignUp()
   // const signupUser = `Jini_${Date.now()}`
   const signupUser = 'user' + Date.now()
   const signupPass = 'pass' + Date.now() 
   console.log(signupUser, signupPass)
   await objectSignup.enterSignupUsername(signupUser)
   await objectSignup.enterSignupPassword(signupPass)
   
   page.on('dialog', async dialogok =>
   {
      await expect (dialogok.message()).toBe('Sign up successful.')
      await dialogok.accept()
   }
   )

   await objectSignup.signup()
   await expect(page).toHaveURL('https://www.demoblaze.com/')
   // await page.pause()
}
)

test('TC_02 Close without signing up', async ({page}) =>
{
   const objectSignup = new Signup(page)
   await objectSignup.clickSignUp()
   const signupUser = faker.internet.username() //generate random data using faker library
   const signupPass = faker.internet.password(
      {length: 10}
   )
   console.log(signupUser, signupPass)
   await objectSignup.enterSignupUsername(signupUser)
   await objectSignup.enterSignupPassword(signupPass)
   await objectSignup.closeSignup()
   await expect(page).toHaveURL('https://www.demoblaze.com/')
   // await page.pause()
}
)
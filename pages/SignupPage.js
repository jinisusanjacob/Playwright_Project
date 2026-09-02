class Signup
{
    constructor(page)
    {
        this.page = page
        this.selectSignup = page.locator('#signin2')
        this.signupUsername = page.locator('#sign-username')
        this.signupPassword = page.locator('#sign-password')
        this.signupButton = page.getByRole('button', { name: 'Sign up' })
        this.signupCloseButton = page.locator('//button[@class="btn btn-secondary"]').nth(1)
    }
    async navigateToUrl()
    {
       await this.page.goto("https://www.demoblaze.com")
       return this
    }
    async clickSignUp()
    {
       await this.selectSignup.click()
       return this
    }
    async enterSignupUsername(signupUser)
    {
       await this.signupUsername.fill(signupUser)
       return this 
    }
    async enterSignupPassword(signupPass)
    {
       await this.signupPassword.fill(signupPass) 
       return this 
    }
    async signup()
    {
       await this.signupButton.click() 
       return this
    }
    async closeSignup()
    {
       await this.signupCloseButton.click()
       return this
    }
}
module.exports = Signup
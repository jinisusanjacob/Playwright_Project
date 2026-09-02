const ProductPage = require("./TestProductPage")

class Homepage
{
    constructor(page)
    {
        this.page = page
        this.selectSignup = page.locator('#signin2')
        this.signupUsername = page.locator('#sign-username')
        this.signupPassword = page.locator('#sign-password')
        this.signupButton = page.getByRole('button', { name: 'Sign up' })
        this.signupCloseButton = page.locator('//button[@class="btn btn-secondary"]').nth(1)
        this.selectLogin = page.locator('#login2')
        this.loginUsername = page.locator('#loginusername')
        this.loginPassword = page.locator('#loginpassword')
        this.loginButton = page.getByRole('button', { name: 'Log in' })
        this.logoutButton = page.locator('#logout2')
        this.categorySelection = (selectedCategory) => page.getByRole('link', { name: selectedCategory })
        this.productSelection = (selectedProduct) => page.getByRole('link', { name: selectedProduct })
    }
    async navigateToUrl()
    {
       await this.page.goto("https://www.demoblaze.com")
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
    async Signup()
    {
       await this.signupButton.click() 
       return this
    }
    async closeSignup()
    {
       await this.signupCloseButton.click()
       return this
    }
    async clickLogin()
    {
       await this.selectLogin.click()
       return this
    }
    async enterLoginUsername(loginUser)
    {
       await this.loginUsername.fill(loginUser)
       return this
    }
    async enterLoginPassword(loginPass)
    {
       await this.loginPassword.fill(loginPass)
       return this
    }
    async login()
    {
       await this.loginButton.click()
       return this
    }
    async clickLogout()
    {
       await this.logoutButton.click()
       return this
    }
    async selectCategories(selectedCategory)
    {
       await this.categorySelection(selectedCategory).click()
       return this
    }
    async selectProduct(selectedProduct)
    {
       await this.productSelection(selectedProduct).click()
       return new ProductPage(this.page)
    }
}
module.exports = Homepage
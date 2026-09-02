const PlaceOrder = require("./PlaceOrderPage")

class Login
{
    constructor(page) 
    {
        this.page = page
        this.selectLogin = page.locator('#login2')
        this.loginUsername = page.locator('#loginusername')
        this.loginPassword = page.locator('#loginpassword')
        this.loginButton = page.getByRole('button', { name: 'Log in' })
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
       return new PlaceOrder(this.page)
    }
}
module.exports = Login
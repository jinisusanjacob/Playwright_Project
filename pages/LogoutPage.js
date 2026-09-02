class Logout
{
    constructor(page)
    {
        this.page = page
        this.logoutButton = page.locator('#logout2')
    }
    async clickLogout() 
    {
       await this.logoutButton.click()
    } 
}
module.exports = Logout
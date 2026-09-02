class PlaceOrder
{
    constructor(page)
    {
        this.page = page
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' })
        this.nameField = page.locator('#name')
        this.countryField = page.locator('#country')
        this.cityField = page.locator('#city')
        this.creditcardField = page.locator('#card')
        this.monthField = page.locator('#month')
        this.yearField = page.locator('#year')
        this.purchaseButton = page.getByRole('button', { name: 'Purchase' })
        this.okConfirmationButton = page.getByRole('button', { name: 'OK' })
        this.deleteIcon = page.getByRole('link', { name: 'Delete' })

    }
    async clickPlaceOrder()
    {
        await this.placeOrderButton.click() 
        return this
    }
    async enterDetails()
    {
       await this.nameField.fill('Jini') 
       await this.countryField.fill('India')
       await this.cityField.fill('Pathanamthitta')
       await this.creditcardField.fill('987654326543')
       await this.monthField.fill('01')
       await this.yearField.fill('2030')
       return this
    }
    async clickPurchaseButton()
    {
       await this.purchaseButton.click()
       return this
    }
    async confirmSuccessOrder()
    {
       await this.okConfirmationButton.click()
       return this
    }
    async deleteProduct()
    {
      await this.deleteIcon.click()
      return this
    } 
}
module.exports = PlaceOrder
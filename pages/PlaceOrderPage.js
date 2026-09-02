const Logout = require("./LogoutPage")

class PlaceOrder
{
    constructor(page)
    {
        this.page = page

        this.deleteIcons = page.getByRole('link', { name: 'Delete' })

        this.category = (selectedCategory) => page.getByRole('link', { name: selectedCategory })
        this.product = (selectedProduct) => page.getByRole('link', { name: selectedProduct})
        this.addToCartButton = page.locator('//a[@class="btn btn-success btn-lg"]')
        this.cartIcon = page.locator('#cartur')
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' })
        this.nameField = page.locator('#name')
        this.countryField = page.locator('#country')
        this.cityField = page.locator('#city')
        this.creditcardField = page.locator('#card')
        this.monthField = page.locator('#month')
        this.yearField = page.locator('#year')
        this.purchaseButton = page.getByRole('button', { name: 'Purchase' })
        this.okConfirmationButton = page.getByRole('button', { name: 'OK' })
    }

    async selectCategories(selectedCategory)
    {
       await this.category(selectedCategory).click()
       return this
    }
    async selectProduct(selectedProduct)
    {
       await this.product(selectedProduct).click()
       return this
    }

    // async selectProduct(product)
    // {
    //    await this.page.locator('//a[text()="${product}"]').click()
    //    return this
    // }


    async addProductToCart()
    {
        await this.addToCartButton.click()
        return this
    }
    async clickCartIcon()
    {
        await this.cartIcon.click()
        return this
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
       return new Logout(this.page)
    }
}
module.exports = PlaceOrder
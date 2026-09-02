const PlaceOrder = require("./TestPlaceOrderPage")

class ProductPage
{
    constructor(page)
    {
        this.page = page
        this.addToCartButton = page.locator('//a[@class="btn btn-success btn-lg"]')
        this.cartIcon = page.locator('#cartur')
    }
    async addProductToCart()
    {
        await this.addToCartButton.click()
        return this
    }
    async clickCartIcon()
    { 
        await this.cartIcon.click()
        return new PlaceOrder(this.page)
    }
}
module.exports = ProductPage
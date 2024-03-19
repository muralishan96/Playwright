import { Page } from "@playwright/test";

export default class SpecialHotPage{
    constructor (public page: Page){

    }


    async addProductToCart(){
        await this.page.hover("//div[@class='image']/a",{
            strict: false
        });
        await this.page.locator("(//button[@title='Add to Cart'])").nth(0).click();
    }
    //(//button[@title='Add to Cart']//i)[1]
    //(//img[@class='lazy-load'])[1]

    async isToastVisible(){
        const toast =  this.page.locator("//a[.='View Cart ']");
        await toast.waitFor({state: "visible"});
        return toast;
    }
}

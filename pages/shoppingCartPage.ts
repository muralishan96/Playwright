import { Page } from "playwright/test";

export default class shoppingcart{
    private page: Page
    constructor(page: Page){
        this.page = page;
    }
}
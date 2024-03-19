import { Page } from "@playwright/test";
import { allure } from "allure-playwright";

export default class LoginPage{
    constructor (public page: Page ){

    }

    async login(email: string , password: string){
        try{
            await allure.step("Login",async () => {
                await this.enterEmail(email);
                await this.enterLoginPassword(password);
                await this.clickLogin();            
            });
        } catch (error: any) {
            console.error('An error occurred:', error.message);
        }
    }
    async enterEmail(emailadress : string){
        await this.page.locator("#input-email").fill(emailadress);
    }

    async enterLoginPassword(password : string){
        await this.page.locator("#input-password").fill(password);
    }

    async clickLogin(){
            await this.page.click("//input[@type='submit']");
    }
}
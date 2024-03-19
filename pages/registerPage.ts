import { Page } from "@playwright/test";
import { allure } from "allure-playwright";

export default class RegisterPage{

    constructor(public page: Page){

    }
    async enterFirstname(firstanme: string){
        allure.logStep("Enter the FirstName")
        await this.page.locator('#input-firstname').type(firstanme);
    }

    async enterLastName(lastname: string){
        allure.logStep("Enter the LastName")
        await this.page.locator('#input-lastname').fill(lastname);
    }

    async enterEmail(email: string){
        allure.logStep("Enter the Email")
        await this.page.locator('#input-email').fill(email);
    }

    async enterTelephone(phoneno: string){
        await this.page.locator('#input-telephone').fill(phoneno);
    }

    async enterPassword(password: string){
        await this.page.locator('#input-password').fill(password)
    }

    async enterConfirmPassword(password: string){
        await this.page.locator('#input-confirm').fill(password)
    }

    async isSubscribeCHecked(){
        return await this.page.locator('#input-newsletter-no');
    }

    async clickTermsconditon(){
        await this.page.click("//label[@for='input-agree']");
    }
    async clickContinuetoRegister(){
        // await Promise.all([
        //     this.page.waitForNavigation({waitUntil:"networkidle"}),
        //     this.page.click("//input[value='Continue']")
        // ]);
        
        await this.page.click("//input[@type='submit']");
    }
}
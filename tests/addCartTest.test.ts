import {expect,test} from "@playwright/test";
import LoginPage from "../pages/loginPage";
import SpecialHotPage from "../pages/specialHotPage";
import Homepage from "../pages/homePage";
import WebUtils from "../Utils/WebUtils";
import * as testData from '../testdata/testdata.json';
import { allure } from "allure-playwright";

const userData = testData;

test("Add to cart test_02",async ({page, baseURL}) => {
    const login1 = new LoginPage(page);
    const homepage = new Homepage(page);
    const special = new SpecialHotPage(page);
    await page.goto(`${baseURL}route=account/account`);
    await allure.step("Step 1: Add cart", async () => {
        await allure.step("Click Special Hot", async () => {
            await homepage.clickMenuByRole('Special Hot');
        });
        await allure.step("Add to Cart Step", async () => {
            try{
                allure.logStep('Choose Desktop');
                await homepage.chooseMenu("Desktops (75)");
                await special.addProductToCart();
                allure.logStep('Verify Toast');
                const isCartVisible = await special.isToastVisible();
                expect(isCartVisible).toBeVisible();
            }catch (error: any){
                console.error('An error occurred:', error.message);
            }
        });
      });
})
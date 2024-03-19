import { expect, test } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import WebUtils from "../Utils/WebUtils";
import * as testData from '../testdata/testdata.json';
import { allure } from "allure-playwright";

const userData = testData;
const cartIcon = "(//div[@class='cart-icon']//div)[1]";
const newAddress= "//label[@for='input-payment-address-new']";

test("Cart product verify", async ({ page, baseURL,browser   }) => {
    const webUtils = new WebUtils(page);

    await page.goto(`${baseURL}route=account/account`);
    // await login1.login(userData.email, userData.password);
    await webUtils.waitForSomeTime(page, 2000);
    await allure.step("Verify My Account Page Data", async () => {
        await webUtils.isElementVisible('link', 'Edit your account');
        await webUtils.isElementVisible('link', 'Change your password');
        await webUtils.isElementVisible('link', 'Modify your address book');
        await webUtils.isElementVisible('link', 'Modify your wish list');
        await webUtils.isElementVisible('link', 'Subscribe / unsubscribe to');
        });    

    await allure.step("Checkout and Fill New Address", async () => {
        await webUtils.clickLocator(cartIcon);
        await webUtils.clickButton("Checkout");
        // await page.locator('#payment-address').getByText('I want to use a new address').click();
        await webUtils.clickElementById(page,newAddress);
        const a = await page.frames();
        console.log(a)
        
        allure.logStep('Fill Address Details');
        const firstNameLocator = await webUtils.locateFormField('First Name*');
        await webUtils.fillFormField(firstNameLocator, 'Murali');

        const lastNameLocator = await webUtils.locateFormField('Last Name*');
        await webUtils.fillFormField(lastNameLocator, 'Shan');

        const address1Locator = await webUtils.locateFormField('Address 1*');
        await webUtils.fillFormField(address1Locator, '123');

        const address2Locator = await webUtils.locateFormField('Address 2');
        await webUtils.fillFormField(address2Locator, 'localAddress');

        const cityLocator = await webUtils.locateFormField('City*');
        await webUtils.fillFormField(cityLocator, 'Trichy');

        await webUtils.selectOptionByText(page ,'#input-payment-country','India' );
        await webUtils.selectOptionByText(page,'#input-payment-zone', 'Tamil Nadu')
        await page.getByText('I have read and agree to the Terms & Conditions').click({ timeout: 60000 });
        await webUtils.clickButton('Continue');

        const newContext = await browser.newContext(); 
        const page1 = await newContext.newPage();
        await page1.goto(`${baseURL}route=account/account`);
        const page2 = await newContext.newPage();
        await page2.goto(`${baseURL}route=extension/maza/checkout/confirm`, { timeout: 100000 });
        await expect(page2.locator('h1')).toContainText('Confirm Order');
        await newContext.close();
    });
})
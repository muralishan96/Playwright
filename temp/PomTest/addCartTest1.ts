import {expect,test} from "@playwright/test";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import SpecialHotPage from "../pages/specialHotPage";
import Homepage from "../pages/homePage";
import WebUtils from "../Utils/WebUtils";
// import test from "node:test";

test("Register test_01", async ({page, baseURL}) => {
    const register = new RegisterPage(page);
    console.log(baseURL);
    await page.goto(`${baseURL}route=account/register`);
    await register.enterFirstname("Murali");
    await register.enterLastName("Shan");
    await register.enterEmail(WebUtils.username);
    await register.enterTelephone(WebUtils.telephone);
    await register.enterPassword(WebUtils.password);
    await register.enterConfirmPassword(WebUtils.password);
    // expect(register.isSubscribeCHecked()).toBeChecked();
    await register.clickTermsconditon();
    // await page.runStep('Step 1: Navigate to the page', async () => {
    //     await test.runStep('Step 5: Click login button', async () => {
    //     // Additional actions if needed
    // });
    // });
    await register.clickContinuetoRegister();
    
})

test("Login test_02", async ({page, baseURL}) => {
    const login = new LoginPage(page);
    await page.goto(`${baseURL}route=account/login`);
    await login.enterEmail(WebUtils.username);
    // test.addStep('Entered email: your-email@example.com');
    await login.enterLoginPassword(WebUtils.password);
    await login.clickLogin();
    expect(await page.title()).toBe("My Account");
})


test("Add to cart test_03",async ({page, baseURL}) => {
    const login1 = new LoginPage(page);
    const homepage = new Homepage(page);
    const special = new SpecialHotPage(page);
    await page.goto(`${baseURL}route=account/login`);
    await login1.login(WebUtils.username,WebUtils.password);
    await homepage.clickInSpacialHotMenu();
    await homepage.clickDesktopMenu();
    await special.addFirstProductToCart();
    const isCartVisible = await special.isToastVisible();
    expect(isCartVisible).toBeVisible();


})
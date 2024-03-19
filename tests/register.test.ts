import {test} from "@playwright/test";
import RegisterPage from "../pages/registerPage";
import * as testData from '../testdata/testdata.json';

const userData = testData;
test("Register test_01", async ({page, baseURL}) => {
    const register = new RegisterPage(page);
    console.log(baseURL);
    await page.goto(`${baseURL}route=account/register`);
    await register.enterFirstname(userData.FirstName);
    await register.enterLastName(userData.LastName);
    await register.enterEmail(userData.email);
    await register.enterTelephone(userData.telephone);
    await register.enterPassword(userData.password);
    await register.enterConfirmPassword(userData.password);
    await register.clickTermsconditon();
    await register.clickContinuetoRegister();    
})
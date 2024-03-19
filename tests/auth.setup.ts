import { test as setup, expect } from '@playwright/test';
import LoginPage from "../pages/loginPage";
import * as testData from '../testdata/testdata.json';

const authFile = 'temp/playwright/.auth/user.json';
const userData = testData;
setup('authenticate', async ({ page }) => {
    const login1 = new LoginPage(page);
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
  await login1.login(userData.email,userData.password);
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/account');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
import { Page,Locator } from "@playwright/test";

export default class Homepage{
    private page: Page;
    constructor(page: Page){
        this.page = page;
    }

    async clickMenuByRole(menuName: string): Promise<void> {
        await this.page.getByRole('link', { name: menuName, exact: true }).click();
    }

    async chooseMenu(menu: string){
        await this.page.getByRole('link', { name: menu }).click();
    }

}
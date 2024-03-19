import { Locator, Page } from "@playwright/test";
import { allure } from "allure-playwright";


export default class WebUtils{
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    public static username: string = "murali1@gmail.com";
    public static password: string = "Murali@123";
    public static telephone: string = "123456788";

    async locateFormField(fieldName: string): Promise<Locator | null> {
        const fieldLocator = await this.page.getByRole('textbox', { name: fieldName });
        return fieldLocator;
    }

    async fillFormField(fieldLocator: Locator | null, value: string): Promise<void> {
        if (fieldLocator) {
            await fieldLocator.fill(value);
        } else {
            console.error('Field locator is null');
            // Handle the absence of the field locator in a specific way here
        }
    }

    async clickButton(buttonName: string): Promise<void> {
        const buttonLocator = await this.page.getByRole('button', { name: buttonName });
        if (buttonLocator) {
            await buttonLocator.click();
        } else {
            console.error('Button locator is null');
            // Handle the absence of the button locator in a specific way here
        }
    }
    async selectOptionByText(page: Page, dropdownXPath: string, optionText: string): Promise<void> {
        const dropdown = await page.locator(dropdownXPath);    
        await dropdown.selectOption({ label: optionText });
    }

    async clickElementById(page: Page, elementId: string): Promise<void> {
        // Locate the element by its ID
        const element = await page.locator(`${elementId}`);
        console.log(element)
    
        // Click on the element
        await element.click();
    }
    async clickLocator(selector: string): Promise<void> {
        const elementLocator = await this.page.locator(selector);
        if (elementLocator) {
            await elementLocator.click();
        } else {
            console.error('Element locator is null');
            // Handle the absence of the element locator in a specific way here
        }
    }
    async isElementVisible(role: string, name: string): Promise<boolean> {
        try {
            allure.logStep('Check Elemet visible or not');
            const element = await this.page.locator(`[role="${role}"][name="${name}"]`);
            return await element.isVisible();
        } catch (error) {
            console.error(`Element with role "${role}" and name "${name}" is not visible.`);
            return false;
        }
    }
    async clickElementByRole(role: string, name: string): Promise<void> {
        try {
            await this.page.click(`[role="${role}"][name="${name}"]`);
        } catch (error) {
            console.error(`Failed to click element with role "${role}" and name "${name}".`);
            throw error;
        }
    }

    async waitForSomeTime(page: Page, milliseconds: number): Promise<void> {
        await page.waitForTimeout(milliseconds);
    }

    async clickElement(selectorOrId: string, type: 'locator' | 'id' | 'role', name?: string): Promise<void> {
        let element: Locator | null;
        
        switch (type) {
            case 'locator':
                element = await this.page.locator(selectorOrId);
                break;
            case 'id':
                element = await this.page.locator(`#${selectorOrId}`);
                break;
            case 'role':
                element = await this.page.locator(`[role="${selectorOrId}"][name="${name}"]`);
                break;
            default:
                throw new Error('Invalid element type provided.');
        }

        if (element) {
            await element.click();
        } else {
            console.error('Element locator is null');
            // Handle the absence of the element locator in a specific way here
        }
    }
}
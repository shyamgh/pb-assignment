import { expect, Page, Locator } from "@playwright/test";

const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('config/' + process.env.LOCALE + '-data.properties'); 

export class BasePage {
    
    protected page: Page;
    readonly url: string;
    readonly pageTitle: RegExp;
    readonly signInXpath: string;
    readonly acceptHandlerXpath: string;
    readonly locale: string | undefined;

    constructor() {
        this.url = properties.get("url");
        this.pageTitle = new RegExp('.*PAYBACK.*');
        this.signInXpath = `//*[@class='pb-navigation']//li/a[@href='/${properties.get("signin")}']`;
        this.acceptHandlerXpath = '#onetrust-accept-btn-handler';
        this.locale = process.env.LOCALE;
    }

    getProperties(){
        return properties;
    }

    getLocale() {
        return this.locale;
    }
    
    async launchApp() {
        await this.page.goto(this.url);
        if (await this.page.isVisible(this.acceptHandlerXpath))
            this.page.locator(this.acceptHandlerXpath).click();
    }

    async verifyHomePageTitle(pageTitle) {
        await expect(this.page).toHaveTitle(pageTitle);
    }

    async verifyTextContents(xpath: string, expectedText) {
        await expect(this.page.locator(xpath)).toContainText(expectedText);
    }
}
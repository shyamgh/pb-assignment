import { expect, Locator, Page, FullConfig } from '@playwright/test';

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config/'+process.env.LOCALE+'-data.properties');

// const url = 'https://www.payback.at';
// const pageTitle: RegExp = new RegExp('.*PAYBACK.*');
// const acceptHandlerXpath = '#onetrust-accept-btn-handler';
// const signInXpath = "//*[@class='pb-navigation']//li/a[@href='/anmelden']";

const url = properties.get("url");
const pageTitle: RegExp = new RegExp('.*PAYBACK.*');
const acceptHandlerXpath = '#onetrust-accept-btn-handler';
const signInXpath = `//*[@class='pb-navigation']//li/a[@href='/${properties.get("signin")}']`;


export class PaybackHomePage {
    readonly page: Page;
    readonly signInBtn: Locator;
    readonly firstCard: Locator;
    readonly continueStep1Btn: Locator;
    readonly email: Locator;


    constructor(page: Page) {
        this.page = page;
        this.signInBtn = this.page.locator(signInXpath);
    }

    async launchApp(){
        await this.page.goto(url);
        if (await this.page.isVisible(acceptHandlerXpath))
            this.page.locator(acceptHandlerXpath).click();
    }

    async verifyHomePageTitle(pageTitle){
        await expect(this.page).toHaveTitle(pageTitle);
    }

    async signIn(){        
        await this.signInBtn.click();
        if(process.env.LOCALE == 'it'){
            await expect(this.page.locator("//a[text()='Iscriviti con la sola carta fedeltà ']")).toBeVisible();
            await this.page.locator("//a[text()='Iscriviti con la sola carta fedeltà ']").click();
        }
    }
}
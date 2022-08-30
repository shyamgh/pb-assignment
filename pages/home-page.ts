import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class PaybackHomePage extends BasePage {

    readonly signInBtn: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        this.signInBtn = this.page.locator(this.signInXpath);
    }

    async signIn(){        
        await this.signInBtn.click();

        // below extra steps required for Italian locale website
        if(this.getLocale() == 'it'){
            await expect(this.page.locator("//a[text()='Iscriviti con la sola carta fedeltà ']")).toBeVisible();
            await this.page.locator("//a[text()='Iscriviti con la sola carta fedeltà ']").click();
        }
    }
}
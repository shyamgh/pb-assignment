import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

const prop = new BasePage().getProperties();
const cardPickerXpath = `//label[text()='${prop.get('requestNewPaybackCard')}']/span[@class='pb-radio__icon']`;
const firstCardXpath = "//div[@class='swiper-slide pb-card-picker__cards swiper-slide-active']//div[@data-cardindex='0']";
const continueStep1BtnCss = `//div[@data-step='1']//span[text()='${prop.get('further')}']`;
const emailCss = "#email";
const pinCss = "#pin";
const continueStep2BtnCss = `//div[@data-step='2']//span[text()='${prop.get('continue')}']`;
const salutationCss = "#salutation";
const firstNameCss = "#firstName";
const lastNameCss = "#lastName";
const birthdayXpath = `//input[@name='birthday']`;
const bDayCss = "//div[@class='pb-input-dob__input-wrapper']//input[1]"
const bMonthCss = "//div[@class='pb-input-dob__input-wrapper']//input[2]"
const bYearCss = "//div[@class='pb-input-dob__input-wrapper']//input[3]"
const streetCss = "#street";
const floorCss = "#floor";
const houseNoCss = "#houseNumber"
const zipcodeCss = "#zipCode";
const cityCss = "#city";
const countryCss = "#country";
const continueStep3BtnCss = `//div[@data-step='3']//div[contains(text(),'${prop.get('laststep')}')]`;
const personalDataOverviewBlockCss = "(//*[@id='signup']//div[contains(@class,'pb-sign-up-block-overview')])[3]"

export class PaybackRegistrationPage extends BasePage {

    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
    }

    get cardPickerRadio() { return this.page.locator(cardPickerXpath); }
    get firstCard() { return this.page.locator(firstCardXpath); }
    get continueStep1Btn() { return this.page.locator(continueStep1BtnCss); }
    get email() { return this.page.locator(emailCss); }
    get pin() { return this.page.locator(pinCss); }
    get continueStep2Btn() { return this.page.locator(continueStep2BtnCss); }
    get salutation() { return this.page.locator(salutationCss); }
    get firstName() { return this.page.locator(firstNameCss); }
    get lastName() { return this.page.locator(lastNameCss); }
    get birthday() { return this.page.locator(birthdayXpath); }
    get bday() { return this.page.locator(bDayCss); }
    get bmonth() { return this.page.locator(bMonthCss); }
    get byear() { return this.page.locator(bYearCss); }
    get street() { return this.page.locator(streetCss); }
    get floor() { return this.page.locator(floorCss); }
    get houseno() { return this.page.locator(houseNoCss); }
    get zip() { return this.page.locator(zipcodeCss); }
    get city() { return this.page.locator(cityCss); }
    get country() { return this.page.locator(countryCss); }
    get continueStep3Btn() { return this.page.locator(continueStep3BtnCss); }
    get personalDataOverviewBlock() { return this.page.locator(personalDataOverviewBlockCss); }

    async selectNewCard() {
        await this.cardPickerRadio.click();
        await expect(this.firstCard).toBeVisible();
    }

    async selectFirstCardAndContinue() {
        await this.firstCard.click();
        await this.continueStep1Btn.click();
        await expect(this.email).toBeVisible();
    }

    getFirstCardId() {
        return this.firstCard.getAttribute('data-id');
    }

    async enterAccessDataAndContinue(email, pin) {
        await this.email.fill(email)
        await this.pin.fill(pin);
        await this.continueStep2Btn.click();
        await expect(this.salutation).toBeVisible();
    }

    async verifyPersonalDataFields() {
        // TODO
    }

    async enterPersonalDataAndContinue(salute, fName, lName, day, month, year, street, flr, zip, city, country) {
        await this.salutation.selectOption({ label: salute });
        await this.firstName.fill(fName);
        await this.lastName.fill(lName);
        await this.birthday.click();
        await this.bday.fill(day);
        await this.bmonth.fill(month);
        await this.byear.fill(year);
        await this.street.fill(street);
        await this.zip.fill(zip);
        await this.city.fill(city)

        if (this.getLocale() == 'at') { // this is applicable for German website 
            await this.floor.fill(flr);
            await this.country.selectOption(country)
        }
        else if (this.getLocale() == 'it') { // this is applicable for Italian website 
            await this.houseno.fill(flr);
        }

        await this.continueStep3Btn.click();
    }

    async verifyPersonalDataDisplayed(salute, fName, lName, day, month, year, street, floor, zip, city, country) {

        if (this.getLocale() == 'at') {
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[2]/div[2]', salute);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[3]/div[2]', fName);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[4]/div[2]', lName);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[5]/div[2]', day + '.' + month + '.' + year);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[7]/div[2]', street);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[8]/div[2]', floor);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[9]/div[2]', zip);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[10]/div[2]', city);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[11]/div[2]', country);
        }
        else if (this.getLocale() == 'it') {
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[1]/div[2]', salute);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[2]/div[2]', fName);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[3]/div[2]', lName);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[4]/div[2]', day + '.' + month + '.' + year);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[6]/div[2]', street);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[7]/div[2]', floor);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[8]/div[2]', zip);
            await this.verifyTextContents(personalDataOverviewBlockCss + '/div[10]/div[2]', city);
        }
        
    }

    verifyFieldAttr(field: Locator, map: Record<string, string>) {
        var flag: boolean = true
        for (const key in map) {
            expect(field).toHaveAttribute(key, map[key]);
        }
    }
}
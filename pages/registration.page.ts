import { expect, Locator, Page } from '@playwright/test';

const cardPickerXpath = "//label[text()='Noch keine PAYBACK Karte? Neue Karte auswählen.']/span[@class='pb-radio__icon']";
const firstCardXpath = "//div[@class='swiper-slide pb-card-picker__cards swiper-slide-active']//div[@data-cardindex='0']";
const continueStep1BtnCss = "//div[@data-step='1']//span[text()='Weiter']";
const emailCss = "#email";
const pinCss = "#pin";
const continueStep2BtnCss = "//div[@data-step='2']//span[text()='Weiter']";
const salutationCss = "#salutation";
const firstNameCss = "#firstName";
const lastNameCss = "#lastName";
const birthdayXpath = "//input[@name='birthday']";
const bDayCss = "//div[@class='pb-input-dob__input-wrapper']//input[1]"
const bMonthCss = "//div[@class='pb-input-dob__input-wrapper']//input[2]"
const bYearCss = "//div[@class='pb-input-dob__input-wrapper']//input[3]"
const streetCss = "#street";
const floorCss = "#floor";
const zipcodeCss = "#zipCode";
const cityCss = "#city";
const countryCss = "#country";
const continueStep3BtnCss = "//div[@data-step='3']//div[contains(text(),'Nur noch ein Schritt')]";

export class PaybackRegistrationPage {
    readonly page: Page;
    readonly cardPickerRadio: Locator;
    readonly firstCard: Locator;
    readonly continueStep1Btn: Locator;
    readonly email: Locator;
    readonly pin: Locator;
    readonly continueStep2Btn: Locator;
    readonly salutation: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly birthday: Locator;
    readonly bday: Locator;
    readonly bmonth: Locator;
    readonly byear: Locator;
    readonly street: Locator;
    readonly floor: Locator;
    readonly zip: Locator;
    readonly city: Locator;
    readonly country: Locator;
    readonly continueStep3Btn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardPickerRadio = page.locator(cardPickerXpath);
        this.firstCard = page.locator(firstCardXpath);
        this.continueStep1Btn = page.locator(continueStep1BtnCss);
        this.email = page.locator(emailCss);
        this.pin = page.locator(pinCss);
        this.continueStep2Btn = page.locator(continueStep2BtnCss);
        this.salutation = page.locator(salutationCss);
        this.firstName = page.locator(firstNameCss);
        this.lastName = page.locator(lastNameCss);
        this.birthday = page.locator(birthdayXpath);
        this.bday = page.locator(bDayCss);
        this.bmonth = page.locator(bMonthCss);
        this.byear = page.locator(bYearCss);
        this.street = page.locator(streetCss);
        this.floor = page.locator(floorCss);
        this.zip = page.locator(zipcodeCss);
        this.city = page.locator(cityCss);
        this.country = page.locator(countryCss);
        this.continueStep3Btn = page.locator(continueStep3BtnCss);
    }

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
        await this.salutation.selectOption({ value: salute });
        await this.firstName.fill(fName);
        await this.lastName.fill(lName);
        await this.birthday.click();
        await this.bday.fill(day);
        await this.bmonth.fill(month);
        await this.byear.fill(year);
        await this.street.fill(street);
        await this.floor.fill(flr);
        await this.zip.fill(zip);
        await this.city.fill(city)
        await this.country.selectOption(country)
        await this.continueStep3Btn.click();
    }

    async verifyPersonalDataDisplayed(salute, fName, lName, day, month, year, street, flr, zip, city, country) {
        // TODO
    }

    verifyFieldAttr(field: Locator, map: Record<string, string>) {
        var flag: boolean = true
        for (const key in map) {
            expect(field).toHaveAttribute(key, map[key]);
    }
}
}
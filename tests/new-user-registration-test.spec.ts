import { test, expect, Locator } from '@playwright/test';
import { PaybackRegistrationPage } from '../pages/registration.page';

test('Payback new user card registration test', async ({ page }) => {

    const url = 'https://www.payback.at';
    const pageTitle : RegExp = new RegExp('.*PAYBACK.*');
    const acceptHandlerXpath = '#onetrust-accept-btn-handler';
    const signInXpath = "//*[@class='pb-navigation']//li/a[@href='/anmelden']";
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

    var testData = {
        'testEmail': 'testemail1@gmail.com',
        'testPin': '1234',
        'salutation': '2',
        'firstName': 'testFirstName',
        'lastName': 'testLastName',
        'bday': '01',
        'bmonth': '10',
        'byear': '1885',
        'street': 'testStreet',
        'floor': 'testFloor',
        'zip': '12345689',
        'city': 'testCity',
        'country': 'de'
    };

    await page.goto(url);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(pageTitle);

    // go to 'sign in'
    if (await page.isVisible(acceptHandlerXpath))
        page.locator(acceptHandlerXpath).click();
    
    const signIn = page.locator(signInXpath); // 
    await signIn.click();

    const paybackRegistrationPage = new PaybackRegistrationPage(page);
    
    // pick first card and continue
    // const cardPicker = page.locator(cardPickerXpath);
    // await cardPicker.click();
    // const firstCard = page.locator(firstCardXpath);
    // testData['selectedCard'] = firstCard.getAttribute('data-id')
    // await firstCard.click();
    // const continueStep1 = page.locator(continueStep1BtnCss);
    // await continueStep1.click();

    await paybackRegistrationPage.selectNewCard();
    testData['selectedCard'] = paybackRegistrationPage.getFirstCardId();
    await paybackRegistrationPage.selectFirstCardAndContinue();


    // var err1 : string = "Bitte geben Sie Ihre E-Mail-Adresse ein (inkl. @)";
    // var regEx1: string = "\/^([a-zA-Z0-9\\.\\_\\-]+)@([a-zA-Z0-9\\.\\-]+\\.[A-Za-z][A-Za-z]+)$\/";
    // const data1: Record<string, string> = {
    //     'data-validation': `{"errorMsg":${err1},"regEx":${regEx1}}`,
    //     'type': 'email'
    // };
    // verifyFieldAttr(email, data1);

    // var err2: string = "Bitte geben Sie einen 4-stelligen (0-9) PIN ein";
    // var regEx2: string = "\/^\\d+$\/";
    // const data2: Record<string, string> = {
    //     'data-validation': `{"errorMsg":${err2},"regEx":${regEx2}}`,
    //     'minlength': '4',
    //     'maxlength': '4'
    // }
    // verifyFieldAttr(pin, data2)

    // enter access data
    // const email = page.locator(emailCss);
    // const pin = page.locator(pinCss);
    // await email.fill(testData.testEmail);
    // pin.fill(testData['testPin']);
    // const continueStep2 = page.locator(continueStep2BtnCss);
    // await continueStep2.click();
    await paybackRegistrationPage.enterAccessDataAndContinue(testData.testEmail, testData.testPin);

    // enter personal data
    // const salutation = page.locator(salutationCss);
    // const firstName = page.locator(firstNameCss);
    // const lastName = page.locator(lastNameCss);
    // const birthday = page.locator(birthdayXpath);
    // const bday = page.locator(bDayCss);
    // const bmonth = page.locator(bMonthCss);
    // const byear = page.locator(bYearCss);
    // const street = page.locator(streetCss);
    // const floor = page.locator(floorCss);
    // const zipcode = page.locator(zipcodeCss);
    // const city = page.locator(cityCss);
    // const country = page.locator(countryCss)
    // const continueStep3 = page.locator(continueStep3BtnCss)
    // await salutation.selectOption({value: testData.salutation});
    // await firstName.fill(testData.firstName);
    // await lastName.fill(testData.lastName);
    // await birthday.click();
    // await bday.fill(testData.bday);
    // await bmonth.fill(testData.bmonth);
    // await byear.fill(testData.byear);
    // await street.fill(testData.street);
    // await floor.fill(testData.floor);
    // await zipcode.fill(testData.zip);
    // await city.fill(testData.city)
    // await country.selectOption(testData.country)
    // await continueStep3.click();
    await paybackRegistrationPage.verifyPersonalDataFields();
    await paybackRegistrationPage.enterPersonalDataAndContinue(testData.salutation, testData.firstName, testData.lastName,
        testData.bday, testData.bmonth, testData.byear,testData.street, testData.floor, testData.zip, testData.city, testData.country);

    // validate personal data entered is displayed
    await paybackRegistrationPage.verifyPersonalDataDisplayed(testData.salutation, testData.firstName, testData.lastName,
        testData.bday, testData.bmonth, testData.byear, testData.street, testData.floor, testData.zip, testData.city, testData.country);

});

function verifyFieldAttr(field: Locator, map : Record<string,string>){
    var flag : boolean = true
    for (const key in map){
        expect(field).toHaveAttribute(key, map[key]);
    }
}
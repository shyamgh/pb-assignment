import { test, expect, Locator } from '@playwright/test';
import { BasePage } from '../pages/base-page';
import { PaybackHomePage } from '../pages/home-page';
import { PaybackRegistrationPage } from '../pages/registration.page';

test('Payback new user card registration test', async ({ page }) => {

    const pageTitle: RegExp = new RegExp('.*PAYBACK.*');

    var testData = {
        'testEmail': 'testemail1@gmail.com',
        'testPin': '1234',
        'salutation': new BasePage().getProperties().get('mr'),
        'firstName': 'testFirstName',
        'lastName': 'testLastName',
        'bday': '01',
        'bmonth': '10',
        'byear': '1885',
        'street': 'testStreet',
        'floor': 'testFloor',
        'zip': new BasePage().getLocale() == 'at' ? '12345689': '12345',
        'city': 'testCity',
        'country': 'de'
    };

    // launch payback website and click sign in
    const paybackHomePage = new PaybackHomePage(page)
    await paybackHomePage.launchApp()
    await paybackHomePage.verifyHomePageTitle(pageTitle);
    await paybackHomePage.signIn();

    // go to new user registration and select first card
    const paybackRegistrationPage = new PaybackRegistrationPage(page);
    await paybackRegistrationPage.selectNewCard();
    testData['selectedCard'] = paybackRegistrationPage.getFirstCardId();
    await paybackRegistrationPage.selectFirstCardAndContinue();

    // enter required access data
    await paybackRegistrationPage.enterAccessDataAndContinue(testData.testEmail, testData.testPin);

    // personal data field validation
    await paybackRegistrationPage.verifyPersonalDataFields();

    // enter personal data
    await paybackRegistrationPage.enterPersonalDataAndContinue(testData.salutation, testData.firstName, testData.lastName,
        testData.bday, testData.bmonth, testData.byear,testData.street, testData.floor, testData.zip, testData.city, testData.country);

    // validate personal data entered is displayed
    if (testData.country = 'de'){
        testData.country = 'Deutschland'
    }

    await paybackRegistrationPage.verifyPersonalDataDisplayed(testData.salutation, testData.firstName, testData.lastName,
        testData.bday, testData.bmonth, testData.byear, testData.street, testData.floor, testData.zip, testData.city, testData.country);

});

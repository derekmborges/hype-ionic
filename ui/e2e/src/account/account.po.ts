import { browser, element, by } from "protractor";

export class AccountPage {

    navigateTo() {
        return browser.get('/tabs/tab4')
    }

    getPageTitleText() {
        return element(by.id('account-header')).getText()
    }

    logout() {
        element(by.id('account-logout')).click()
    }

}
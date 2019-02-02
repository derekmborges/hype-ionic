import { browser, element, by } from "protractor"

export class LoginPage {

    private correctCredentials = {
        email: 'db@gmail.com',
        password: 'hello'
    }

    navigateTo() {
        return browser.get('/login')
    }

    getPageTitle() {
        return element(by.id('login-header')).getText()
    }

    fillCredentials(creds: any = this.correctCredentials) {
        element(by.css('[name="ion-input-0"]')).sendKeys(creds.email)
        element(by.css('[name="ion-input-1"]')).sendKeys(creds.password)
        element(by.id('login-submit')).click()
    }
}
import { element, by } from 'protractor'

export class RegisterPage {

    private registerFields = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@gmail.com',
        password: 'password12345'
    }

    getPageTitle() {
        return element(by.id('register-header')).getText()
    }

    register(fields: any = this.registerFields) {
        element(by.css('[name="ion-input-2"]')).sendKeys(fields.firstName)
        element(by.css('[name="ion-input-3"]')).sendKeys(fields.lastName)
        element(by.css('[name="ion-input-4"]')).sendKeys(fields.email)
        element(by.css('[name="ion-input-5"]')).sendKeys(fields.email)
        element(by.css('[name="ion-input-6"]')).sendKeys(fields.password)
        element(by.css('[name="ion-input-7"]')).sendKeys(fields.password)
        element(by.id('register-submit')).click()
        expect(this.alertMessage()).toEqual('Success!')
        element(by.className('alert-button')).click()
    }

    alertMessage() {
        return element(by.className('alert-message')).getText()
    }

    goToLogin() {
        element(by.id('back-to-login')).click()
    }

}
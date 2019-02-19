import { browser, element, by } from 'protractor'

export class TransactionsPage {

    navigateTo() {
        return browser.get('/tabs/tab2')
    }

    getPageTitle() {
        return element(by.id('transactions-header')).getText()
    }

    addNewTransaction() {
        this.openNewTransactionModal()
        element(by.css('[name="ion-input-0"]')).sendKeys('1')
        this.selectDate('purchase-date')
        // purchase amount
        element(by.id('toggle-sold')).click()
        this.selectDate('sold-date')
        // sold amount
        element(by.id('save-transaction')).click()
    }

    private openNewTransactionModal() {
        element(by.id('add-transaction')).click()
        expect(element(by.id('transaction-details-header'))).toEqual('Transaction Details')
    }

    private selectDate(id: string) {
        element(by.id(id)).click()
        element(by.buttonText('Done')).click()
    }

}
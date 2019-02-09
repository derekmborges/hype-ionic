import { browser, element, by } from "protractor";

export class Tabs {

    clickAccountTab() {
        element(by.id('tab-button-tab4')).click()
    }

}
import { AccountPage } from "./pages/account.po";
import { LoginPage } from "./pages/login.po";
import { AppPage } from "./pages/app.po";
import { Tabs } from "./pages/tabs.po";
import { browser } from "protractor";

describe('Account Page', () => {
    let page: AccountPage
    let appPage: AppPage
    let loginPage: LoginPage
    let tabs: Tabs

    beforeEach(() => {
        page = new AccountPage()
        appPage = new AppPage()
        loginPage = new LoginPage()
        tabs = new Tabs()
    })

    afterEach(() => {
        appPage.restart()
    })

    it('redirects back to the login screen upon logout', () => {
        appPage.navigateTo()
        expect(loginPage.getPageTitle()).toEqual('Login')
        loginPage.fillCredentials()

        tabs.clickAccountTab()
        expect(page.getPageTitleText()).toEqual('Account')
        page.logout()

        expect(loginPage.getPageTitle()).toEqual('Login')
    })

})
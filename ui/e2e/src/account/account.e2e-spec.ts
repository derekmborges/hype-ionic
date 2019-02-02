import { AccountPage } from "./account.po";
import { LoginPage } from "../login/login.po";
import { AppPage } from "../app.po";
import { Tabs } from "../tabs.po";

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

    it('redirects back to the login page when user clicks logout', () => {
        appPage.navigateTo()
        loginPage.fillCredentials()

        tabs.clickAccountTab()
        expect(page.getPageTitleText()).toEqual('Account')
        page.logout()
        expect(loginPage.getPageTitle()).toEqual('Login')
    })

})
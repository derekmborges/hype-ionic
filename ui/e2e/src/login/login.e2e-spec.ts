import { LoginPage } from "./login.po";
import { DashboardPage } from "../dashboard/dashboard.po";
import { browser, element, by } from "protractor";

describe('Login Page', () => {
    let page: LoginPage
    let dashboardPage: DashboardPage

    beforeEach(() => {
        page = new LoginPage()
        dashboardPage = new DashboardPage
    })

    it('displays error toast when incorrect credentials entered', () => {
        page.navigateTo()
        page.fillCredentials({
            email: 'db@gmail.com',
            password: 'wrongpassword'
        })
        browser.waitForAngular()
        expect(page.errorToastText()).toEqual('Incorrect email or password')
    })

    it('when login is successful, user shoud be redirected to the default tab', () => {
        page.navigateTo()
        page.fillCredentials()
        expect(dashboardPage.getPageTitleText()).toEqual('Dashboard')
    })
})
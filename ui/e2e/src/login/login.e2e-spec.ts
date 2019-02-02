import { LoginPage } from "./login.po";
import { DashboardPage } from "../dashboard/dashboard.po";

describe('Login Page', () => {
    let page: LoginPage
    let dashboardPage: DashboardPage

    beforeEach(() => {
        page = new LoginPage()
        dashboardPage = new DashboardPage
    })

    it('when login is successful, user shoud be redirected to the default tab', () => {
        page.navigateTo()
        page.fillCredentials()
        expect(dashboardPage.getPageTitleText()).toEqual('Dashboard')
    })
})
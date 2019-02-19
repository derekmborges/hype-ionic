import { TransactionsPage } from "./pages/transactions.po";
import { AppPage } from "./pages/app.po";
import { LoginPage } from "./pages/login.po";
import { DashboardPage } from "./pages/dashboard.po";
import { Tabs } from "./pages/tabs.po";

describe('Transactions', () => {
    let page: TransactionsPage
    let appPage: AppPage
    let loginPage: LoginPage
    let dashboardPage: DashboardPage
    let tabs: Tabs

    beforeEach(() => {
        appPage = new AppPage()
        loginPage = new LoginPage()
        page = new TransactionsPage()
        dashboardPage = new DashboardPage()
        tabs = new Tabs()
    })

    // it('lets user add a transaction', () => {
    //     appPage.navigateTo()
    //     loginPage.fillCredentials()
    //     expect(dashboardPage.getPageTitleText()).toEqual('Dashboard')

    //     tabs.clickTransactionsTab()
    //     expect(page.getPageTitle()).toEqual('Transactions')
    //     page.addNewTransaction()

    //     // check it's in the list
    // })

})
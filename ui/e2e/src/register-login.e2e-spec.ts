import { LoginPage } from './pages/login.po'
import { DashboardPage } from './pages/dashboard.po'
import { RegisterPage } from './pages/register.po'
import { AccountPage } from './pages/account.po'
import { Tabs } from './pages/tabs.po'
import { AppPage } from './pages/app.po'
import {browser} from 'protractor'

describe('Register/Login/Logout', () => {
    let appPage: AppPage
    let loginPage: LoginPage
    let registerPage: RegisterPage
    let dashboardPage: DashboardPage
    let accountPage: AccountPage
    let tabs: Tabs

    const rand = Math.floor(Math.random() * 999999)
    const user = {
        firstName: 'Billybob',
        lastName: 'Joe',
        email: `billyjoe${rand}@gmail.com`,
        password: rand
    }

    beforeEach(() => {
        appPage = new AppPage()
        loginPage = new LoginPage()
        registerPage = new RegisterPage()
        dashboardPage = new DashboardPage()
        accountPage = new AccountPage()
        tabs = new Tabs()
    })

    afterEach(() => {
        appPage.restart()
    })

    it('allows user to register, login, and logout', () => {
        appPage.navigateTo()
        expect(loginPage.getPageTitle()).toEqual('Login')

        loginPage.goToSignup()
        expect(registerPage.getPageTitle()).toEqual('Signup')

        registerPage.register(user)
        registerPage.goToLogin()
        expect(loginPage.getPageTitle()).toEqual('Login')

        loginPage.fillCredentials({email: user.email, password: user.password})
        expect(dashboardPage.getPageTitleText()).toEqual('Dashboard')

        tabs.clickAccountTab()
        expect(accountPage.getPageTitleText()).toEqual('Account')
        accountPage.logout()
        expect(loginPage.getPageTitle()).toEqual('Login')
    })
})
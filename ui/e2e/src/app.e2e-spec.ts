import { AppPage } from './app.po'
import { LoginPage } from './login/login.po'

describe('Home Page', () => {
  let page: AppPage
  let loginPage: LoginPage

  beforeEach(() => {
    page = new AppPage()
    loginPage = new LoginPage()
  })

  it('should display login page upon opening of the app', () => {
    page.navigateTo()

    expect(loginPage.getPageTitle()).toEqual('Login')
  })
})

import { browser, by, element } from 'protractor';

export class AppPage {

  restart() {
    browser.restart()
    browser.driver.manage().window().setSize(350, 700)
  }

  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return element(by.css('ion-title')).getText();
  }
}

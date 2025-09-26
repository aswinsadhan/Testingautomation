import { Page, Locator, expect } from '@playwright/test';
import testdata from '../Data/testdata.json';
import customs from './customfunct';

export default class Login {
  readonly page: Page;
  readonly Accp: Locator;
  readonly usernm: Locator;
  readonly passw: Locator;
  readonly loginb: Locator;
  readonly homecon: Locator;
  readonly logermesg1: Locator;
  readonly logout: Locator;
  readonly logermesgp2:Locator;
  readonly menushop:Locator;

  constructor(page: Page) {
    this.page = page;
    this.Accp = page.locator('//a[text()="My Account"]');
    this.usernm = page.locator('//input[@name="username"]');
    this.passw = page.locator('//input[@id="password"]');
    this.loginb = page.locator('//input[@name="login"]');
    this.homecon = page.locator('//div[@class="woocommerce-MyAccount-content"]');
    this.logermesg1 = page.locator('//ul[contains(@class,"woocommerce-error")]/li');
    this.logout = page.locator('//a[text()="Logout"]');
    this.logermesgp2=page.locator('//ul[contains(@class,"woocommerce-error")]/li');
    this.menushop = page.locator('//a[text()="Shop"]');
  }
  

 //to login using valid credentials
  async login(user: { email: string; password: string }) {
    await this.usernm.fill(user.email);
    await this.passw.fill(user.password);
    await this.loginb.click();
    await this.logout.click();
  }


//login using invalid credentials
  async invalidusernamelogin()
  {
    await this.usernm.fill(testdata.wcred.username);
    await this.passw.fill(testdata.wcred.password);
    await this.loginb.click();
  }

 //login using without entering username
  async emptyusernamelogin()
  {
    await this.passw.fill(testdata.wcred.password);
    await this.loginb.click();
  }
  //login using without entering password
  async emptypasswordlogin()
  {
    await this.usernm.fill(testdata.wcred.username);
    await this.loginb.click();
  }
  //login using empty credentials
  async emptycredlogin()
  {
   await this.loginb.click();
  }

  //checks if the password is masked after entering
  async passwordismasked()
  {
    await this.usernm.fill(testdata.wcred.username);
    await this.passw.fill(testdata.wcred.password);
    await this.loginb.click();
  }

  //checks if the login can handle casesensitivity
  //trying to login by converting the creds into lowercase
  async casesensitivecheck()
  {
    await this.usernm.fill((testdata.wcred.username).toLowerCase());
    await this.passw.fill((testdata.wcred.password).toLowerCase());
    await this.loginb.click();  
  }

async loginCB(email: string, password: string) {
  const cust = new customs(this.page);
  await this.Accp.click();
  await this.usernm.fill('eee@gmail.com');
  await this.passw.fill('Aa@12345asd12');
  await this.loginb.click();
  await this.homecon.waitFor({ state: 'visible' });
}

  async Loginshopmenu()
  {
    await this.menushop.click();

  }

}
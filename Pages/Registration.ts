import { Page, Locator,expect } from '@playwright/test';


export default class Registration
{

    readonly page:Page
    readonly Accp:Locator
    readonly Regem:Locator
    readonly regpwd:Locator
    readonly Regb:Locator
    readonly homecon:Locator
    readonly errmes:Locator
    readonly reghead:Locator

    constructor(page:Page)
    {
         this.page=page;
         this.page=page;
         this.Accp=page.locator('//a[text()="My Account"]')
         this.Regem=page.locator('//input[@id="reg_email"]')
         this.regpwd=page.locator('//input[@id="reg_password"]')
         this.Regb=page.locator('//input[@name="register"]')
         this.homecon=page.locator('//div[@class="woocommerce-MyAccount-content"]')
         this.errmes=page.locator('ul.woocommerce-error li')
         this.reghead=page.locator('//h2[text()="Register"]')
 
    }
 

    //function to launch the website
    async launchwebsite(){
            await this.page.goto("https://practice.automationtesting.in/");

        }

    //navigation to accountspage
    async gotoaccountspage()
    {
        await this.Accp.click();

    }

    //registeration using valid email and password
    async userregistration(email:string,pwd:string)
    {
    await this.Regem.fill(email);
    await this.regpwd.fill(pwd);
    await this.Regb.click();
    const username = email.split('@')[0];
    }


    //registration using invalid email address format
    async invalidemailregistration()
    {
    await this.Regem.fill("aa");
    await this.regpwd.fill("dddzxda12@123213");
    await this.Regb.click();
    }

    //registration by leaving email field empty
    async emptyemailregistration()
    {
    await this.regpwd.fill("AGSg@sd12321saasd23344");
    await expect(this.Regb).toBeEnabled;
    await this.Regb.click();
    await this.Regb.click();   
    }

    //registraion by leaving the password field empty
    async emptypasswordregistartion()
    {
    await this.Regem.fill("akcbquywdn@gmail.com");
    await expect(this.Regb).toBeEnabled;
    await this.Regb.click();

    }

    //registration by leaving the credentials empty
    async emptycredregistration()
    {
    await expect(this.Regb).toBeEnabled;
    await this.Regb.click();
    }

}
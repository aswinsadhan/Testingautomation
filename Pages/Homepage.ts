import { Page, Locator, expect } from '@playwright/test';
import testdata from '../Data/testdata.json';
export default class Homepage {
  readonly page: Page
  readonly menushop: Locator
  readonly homepage: Locator
    readonly arrivals: Locator
    readonly prod:Locator
    readonly proddescription:Locator
    readonly rev:Locator
    readonly prodreview:Locator
    readonly addb:Locator
     readonly viewbasketb:Locator
  readonly coupinp:Locator
  readonly rmpro:Locator
  readonly appcp:Locator
  readonly cpmesg:Locator
  readonly csubtot:Locator
  
  readonly fname:Locator
  readonly lastname:Locator
  readonly email:Locator
  readonly phone:Locator
  readonly address:Locator
  readonly town:Locator
  readonly postc:Locator
  readonly pord:Locator
    readonly chkb:Locator
    readonly bookbillingdetails:Locator





   constructor(page: Page) {
    this.page = page;
    this.menushop = page.locator('//a[text()="Shop"]');
    this.homepage = page.locator('//a[@title="Automation Practice Site"]');
    this.arrivals = page.locator("//div[contains(@class,'sub_row_1-0-2')]//li[contains(@class,'product')]");
    this.prod=page.locator('//a[text()="Description"]')
    this.proddescription=page.locator('//h2[text()="Product Description"]')
    this.rev=page.locator('//a[@href="#tab-reviews"]')
    this.prodreview=page.locator('//h2[text()="Reviews"]');
    this.addb=page.locator('//button[text()="Add to basket"]')
     this.viewbasketb=page.locator('//a[text()="View Basket"]')
      this.chkb=page.locator('//a[contains(@class,"checkout-button")]')
      this.coupinp=page.locator('//input[@name="coupon_code"]')
      this.rmpro=page.locator("//tr[td[@class='product-name']//a[normalize-space(text())='Selenium Ruby']]//td[@class='product-remove']/a")
       this.appcp=page.locator('//input[@name="apply_coupon"]');
       this.cpmesg=page.locator("//ul[contains(@class,'woocommerce-error')]/li");

       this.csubtot=page.locator('//th[text()="Subtotal"]/parent::tr/td/span/text()')
       this.fname=page.locator('//input[@name="billing_first_name"]')
       this.lastname=page.locator('//input[@name="billing_last_name"]')
       this.email=page.locator('//input[@name="billing_email"]')
       this.phone=page.locator('//input[@name="billing_phone"]')
       this.address=page.locator('//input[@name="billing_address_1"]')
       this.town=page.locator('//input[@name="billing_city"]')
       this.postc=page.locator('//input[@name="billing_postcode"]')
       this.pord=page.locator('//input[@id="place_order"]')
       this.bookbillingdetails=page.locator('//h3[text()="Billing Details"]')
   }
   //navigates to the homepage
   async navigatetoHomepage()
   {
    await this.homepage.click()
   }
   //navigates to the menushop page
   async navtomenushop()
   {
    await this.menushop.click()
   }
   
   //get book from arrival
   async getfirstarrival()
   {
      const book1 = testdata.books[0];
      const img1 = this.arrivals.first();
      await img1.click();
   }
  
   //checking product description
   async firstarrProductdescription()
   {
    await this.prod.click();
   }


   //checking product review
   async firstarrProdreview()
   {
    await this.rev.click()
   }
   
   //product add to cart
   async addrocartprod()
   {
    await this.addb.click();
   }

   //View cart
   async viewbasket()
   {
    await this.viewbasketb.click();
   }
   
   //apply offer coupon
   async applycoupon()
   {
      const book1 = testdata.books[0];
      await this.coupinp.fill(book1.coupon);
      await this.appcp.click();
   }

   //edit and increase quantity
   async increasequantity()
   {
      const qtyInput = this.page.locator("//td[@class='product-quantity']//input[@type='number']");
        await qtyInput.fill("5");
        await this.page.locator('//input[@name="update_cart"]').click();
        await this.rmpro.click();
   }

   //add another book to the cart
   async addnewbooktocart()
   {
      const book2 = testdata.books[1];
     await this.page.locator(`//h3[text()="${book2.title}"]`).click();
      await this.addb.click();

   }
 
   //apply offer coupon
   async applycoupon2()
   {
     const book2 = testdata.books[1];
      await this.coupinp.fill(book2.coupon);
      await this.appcp.click();
   }


   //Checkout page function
   async checkoutClick()
   {
    await this.chkb.click();
   }

//Complete checkout flow function
  async completecheckout(user: any)
  {
  await this.fname.fill(user.firstName);
  await this.lastname.fill(user.lastName);
  await this.email.fill(user.email);
  await this.phone.fill(user.phone);
  await this.address.fill(user.address);
  await this.town.fill(user.city);
  await this.postc.fill(user.postcode);
  await this.pord.click();
  }




}
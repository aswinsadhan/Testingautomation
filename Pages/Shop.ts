import { Page, Locator,expect } from '@playwright/test';


export default class Shop
{
 readonly page:Page
 readonly menushop:Locator
 readonly ddrop:Locator
 readonly addb:Locator
 readonly oldprice:Locator
 readonly newPrice:Locator
 readonly subtotal:Locator
 readonly total:Locator

 constructor(page:Page)
 {
    this.page=page;
    this.menushop = page.locator('//a[text()="Shop"]');
    this.ddrop=page.locator('//select[@name="orderby"]');
    this.addb=page.locator('//button[text()="Add to basket"]')
    this.oldprice=page.locator('p.price del .woocommerce-Price-amount')
    this.newPrice =page.locator('p.price ins .woocommerce-Price-amount');
    this.subtotal=page.locator('//tr[@class="cart-subtotal"]/td/span')
    this.total=page.locator('//tr[@class="order-total"]/td/strong/span')
 }

//Filtering the profucts by price and checking if it is filtered properly
 async filterbyprice()
 {
    const minHandle = this.page.locator(".price_slider .ui-slider-handle").first();
    const maxHandle = this.page.locator(".price_slider .ui-slider-handle").last();

    await minHandle.hover();
    await this.page.mouse.down();
    await this.page.mouse.move((await minHandle.boundingBox())!.x + 30, (await minHandle.boundingBox())!.y);
    await this.page.mouse.up();

    await maxHandle.hover();
    await this.page.mouse.down();
    await this.page.mouse.move((await maxHandle.boundingBox())!.x - 50, (await maxHandle.boundingBox())!.y);
    await this.page.mouse.up();

 
    await this.page.click("button.button");

    await this.page.waitForSelector(".products");
      const prices = await this.page.$$eval(".products .price", els =>
      els.map(e => parseFloat(e.textContent!.replace(/[₹,]/g, "")))
    );


    
    for (const price of prices) {
      expect(price).toBeGreaterThanOrEqual(150);
      expect(price).toBeLessThanOrEqual(450);
    }
 }

 //filtering products by category

 async filterbycategory()
 {

    const category="Android"

    //used for storage state only
    await this.menushop.click()

    //
    await this.page.locator('//a[text()="Android"]').click();

      await this.page.waitForSelector(".products");


  const productCategories = await this.page.$$eval(
    "a.woocommerce-LoopProduct-link h3",
    els => els.map(e => e.textContent?.trim() || "")
  );


 
  for (const cat of productCategories) {
    expect(cat.toLowerCase()).toContain(category.toLowerCase());
  }

 }

//sorting the products by popularity
 async sortbypopularity()
 {
  await this.ddrop.click()
  await this.page.locator('//option[text()="Sort by popularity"]').click()
 }

 //sorting the products by average rating
 async sortbyaveragerating()
 {
  await this.ddrop.click()
  await this.page.locator('//option[text()="Sort by average rating"]').click()
 }

 //sorting the newest products
 async sortbynewest()
 {
  await this.ddrop.click()
  await this.page.locator('//option[text()="Sort by newness"]').click() 
 }

 //sorting the products from low price to high price
 async sortbypricelowtohigh()
 {
  await this.ddrop.click()
  await this.page.locator('//option[text()="Sort by price: low to high"]').click()  
 }

 //sorting the products from high price to low
 async sortbypricehightolow()
 {
  await this.ddrop.click()
  await this.page.locator('Sort by price: high to low').click()   
 }

 //selecting a book
 async selectingabook()
 {
    await this.page.locator('//h3[text()="Android Quick Start Guide"]').click()
 }

 //adding the selected book to cart

 async addbooktocart()
 {
    //await this.page.locator('//h3[text()="Android Quick Start Guide"]').click()
    await this.addb.click()
 }


 //viewing the basket
 async viewbasket()
 {
    await this.page.locator('//a[text()="View Basket"]').click()
 }

}
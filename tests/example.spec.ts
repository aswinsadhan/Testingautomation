
import { test,expect} from '../Pages/fixture';
import testdata from '../Data/testdata.json';
import Registration from '../Pages/Registration';
import { ref } from 'process';
import Login from '../Pages/Login';
import Homepage from '../Pages/Homepage';

for (const user of testdata.users) 
  {
      test.describe(`Demo Flow for user: ${user.email}`, () => 
      {
        test.beforeEach(async ({ registration }) => {
          await registration.launchwebsite();
        });

        test('Home page functionalities',async({ registration,Homepage}) =>
        {
          
          await test.step('Verify homepage must contain only three sliders',async()=>
          {
            await Homepage.navtomenushop()
            await Homepage.navigatetoHomepage()
            await expect(Homepage.arrivals).toHaveCount(3);
          })

         await test.step('Home page must contain only three arrivals',async()=>
          {
            await Homepage.navtomenushop()
            await Homepage.navigatetoHomepage()    
            await expect(Homepage.arrivals).toHaveCount(3);       
          })
          
         await test.step('Home page add to basket, checkout', async () => {
                 await Homepage.navtomenushop()
                 await Homepage.navigatetoHomepage()    
                 await Homepage.getfirstarrival()
                 await expect(Homepage.page).toHaveURL(/.*selenium-ruby/);    
              });

          await test.step('Product description check',async()=>
          {
           await Homepage.firstarrProductdescription();
           await expect(Homepage.proddescription).toBeVisible();
          })
          await test.step('Product review check',async()=>
          {
           await Homepage.firstarrProductdescription();
          // await expect(Homepage.prodreview).toBeVisible();
          })

          await test.step('addto cart prod and apply coupon and increase the quantity',async()=>
          {
           await Homepage.addrocartprod();
           await Homepage.viewbasket();
           await Homepage.applycoupon();
           await Homepage.increasequantity();

          })
          await test.step('Add another book to cart and verify coupon not applicable for that book',async()=>
          {
            await Homepage.navtomenushop()
            await Homepage.addnewbooktocart()
            await Homepage.viewbasket()
            await Homepage.applycoupon2()
            await expect(Homepage.cpmesg).toContainText("The minimum spend for this coupon is");

          })
          await test.step('Checkout and check if the billing address is displayed',async()=>
          {
           await Homepage.checkoutClick()
           await expect(Homepage.bookbillingdetails).toBeVisible();
           await Homepage.completecheckout(user)
          })
        })
          test('Registration', async ({ registration }) => {

                  // await test.step('Register new user', async () => {
                  // await registration.gotoaccountspage()
                  // await expect(registration.reghead).toBeVisible();
                  // await registration.userregistration(user.email, user.password)
                  // const username = user.email.split('@')[0];
                  // await expect(registration.homecon).toBeVisible({timeout:10000})
                  // await expect(registration.homecon).toContainText(`Hello ${username}`)
                  // });


                  await test.step('Register with invalid email',async()=>
                  {
                    await registration.gotoaccountspage();
                    await expect(registration.reghead).toBeVisible();
                    await registration.invalidemailregistration();
                    const validityMessage = await registration.Regem.evaluate((el: HTMLInputElement) => el.validationMessage);
                    await expect(validityMessage).toContain("missing an '@'") 
                  })

                  await test.step('Register with empty email',async()=>
                  {
                    await registration.gotoaccountspage();
                    await expect(registration.reghead).toBeVisible();
                    await registration.emptyemailregistration();
                    await expect(registration.errmes).toContainText("Please provide a valid email address.")
                  })

                  await test.step('Register with empty password',async()=>
                  {
                    await registration.gotoaccountspage();
                    await expect(registration.reghead).toBeVisible();
                    await registration.emptypasswordregistartion();
                    await expect(registration.errmes).toContainText(" Please enter an account password.")
                  }) 
                   
                  await test.step('register with empty credentials',async()=>
                  {
                    await registration.gotoaccountspage();
                    await expect(registration.reghead).toBeVisible();
                    await registration.emptycredregistration();
                    await expect(registration.errmes).toContainText("Please provide a valid email address.")
                  })
           });

           test("login flow",async({registration,login})=>
          {

            await test.step('login with valid cred',async()=>
              {
                await registration.gotoaccountspage();
                await login.login(user);

              })

              await test.step('login with invalid cred',async()=>
              {
                await registration.gotoaccountspage();
                await login.invalidusernamelogin();
                await expect(login.logermesg1).toContainText("A user could not be found with this email address.");
              })

              await test.step('empty username login',async()=>
              {
                await registration.gotoaccountspage();
                await login.emptyusernamelogin();
                await expect(login.logermesgp2).toContainText(" Username is required.");
              })

              await test.step('empty password',async()=>
              {
                await registration.gotoaccountspage();
                await login.emptypasswordlogin();
                await expect(login.logermesgp2).toContainText(" Password is required.");  
              })

              await test.step('empty credentials',async()=>
              {
                await registration.gotoaccountspage();
                await login.emptycredlogin()
                await expect(login.logermesgp2).toContainText(" Username is required.");     
              })

              await test.step('verify password is masked',async()=>
              {
                 await registration.gotoaccountspage();
                 await login.passwordismasked();
                 await expect(login.passw).toHaveAttribute('type','password');
              })

              await test.step('verify login handles case sensitivity',async()=>
              {
                await registration.gotoaccountspage();
                await login.casesensitivecheck();
                await expect(login.logermesg1).toBeVisible();
              })
          })


          test("shop flow",async({shop,Homepage})=>
          {

            await test.step('filter by price',async()=>
            {
              await Homepage.navtomenushop()
              await shop.filterbyprice()
            })

            await test.step('filter by cetegory',async()=>
            {
              await shop.filterbycategory();
            })
            // await test.step('sort the products',async()=>
            // {
            //   await Homepage.navtomenushop();
            //   await shop.sortbypopularity();
            //   await shop.sortbyaveragerating();
            //   await shop.sortbynewest();
            //   await shop.sortbypricelowtohigh();
            //   await shop.sortbypricehightolow();
            // })
            await test.step('User can clearly view the actual price with old price striken for the sale written products',async()=>
            {
              await Homepage.navtomenushop();
              await shop.selectingabook();
              await expect(shop.oldprice).toBeVisible();
              await expect(shop.oldprice).toContainText('600.00'); 
              await expect(shop.newPrice).toBeVisible();
              await expect(shop.newPrice).toContainText('450.00'); 
            })
           await test.step('subtotal must be lessthan total',async()=>
            {
                  await shop.addbooktocart();
               // await Homepage.navtomenushop();
               await shop.viewbasket();
                 const subtot =await shop.subtotal.innerText();
                 const tot = await shop.total.innerText();
                 const subtotal =parseFloat(subtot.replace(/[^0-9.]/g, ''));
                 const total = parseFloat(tot.replace(/[^0-9.]/g, ''));
                 expect(subtotal).toBeLessThan(total);
                 const expectedTotalIndia = +(subtotal * 1.02).toFixed(2);  
                 const expectedTotalAbroad = +(subtotal * 1.05).toFixed(2)
                 expect(total).toBeCloseTo(expectedTotalIndia, 2);
            })
          })






      })

      
  }
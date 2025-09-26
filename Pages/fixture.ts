import { test as base, expect } from '@playwright/test';
import registration from './Registration';
import Login  from './Login';
import Homepage from './Homepage';
import Shop from './Shop';
import { userInfo } from 'os';

type MyFixtures = {
  registration: registration;
   login:Login
   Homepage:Homepage
  shop:Shop
  
};

const test = base.extend<MyFixtures>({
  registration: async ({ page }, use) => {
    await use(new registration(page));
  },
  login:async({page},use)=>
  {
    await use(new Login(page))
   },
      Homepage:async({page},use)=>
        {
            await use(new Homepage(page))
        },
        shop:async({page},use)=>
        {
            await use(new Shop(page))
        }
});


export { test, expect };

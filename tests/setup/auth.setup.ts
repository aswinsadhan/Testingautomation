// import { test } from '@playwright/test';
// import Login from '../../Pages/Login';
// import * as fs from 'fs';

// const authFile = 'playwright/.auth/user.json';

// test('Authenticate and save storage state', async ({ page }) => {
//   await page.goto('https://practice.automationtesting.in/');

//   const login = new Login(page);
//   await login.loginCB(); 

//   fs.mkdirSync('playwright/.auth', { recursive: true });

//   await page.context().storageState({ path: authFile });
// });

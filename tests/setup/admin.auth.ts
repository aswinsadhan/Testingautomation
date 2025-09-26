import { test } from '@playwright/test';
import Login from '../../Pages/Login';
import * as fs from 'fs';

const authDir = 'playwright/.auth';


test('Auth setup for Admin', async ({ page }) => {
  await page.goto('https://practice.automationtesting.in/');
  const login = new Login(page);
  await login.loginCB('eee@gmail.com', 'Aa@12345asd12');
  await page.context().storageState({ path: `${authDir}/admin.json` });
});

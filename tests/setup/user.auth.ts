import { test } from '@playwright/test';
import Login from '../../Pages/Login';
import * as fs from 'fs';

const authDir = 'playwright/.auth';

test('Auth setup for User', async ({ page }) => {
  await page.goto('https://practice.automationtesting.in/');
  const login = new Login(page);
  await login.loginCB('user@gmail.com', 'User@12345');
  await page.context().storageState({ path: `${authDir}/user.json` });
});

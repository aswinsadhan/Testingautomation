import { test, expect } from '../Pages/fixture';

// Define the roles and their corresponding storage states
const roles = [
  { name: 'User', state: 'playwright/.auth/user.json' },
  { name: 'Admin', state: 'playwright/.auth/admin.json' },
  { name: 'Vendor', state: 'playwright/.auth/vendor.json' },
];

for (const role of roles) {
  test.describe(`${role.name} flow`, () => {
    test.use({ storageState: role.state });

    test.beforeEach(async ({ page }) => {
      await page.goto('/'); 
    });

    test('Launching the url', async ({ page }) => {
      await expect(page).toHaveURL('https://practice.automationtesting.in/');
    });

    test('Filter the product by category', async ({ shop }) => {
      await shop.filterbycategory();
    });

    test('Checking old price with new price', async ({ Homepage, shop }) => {
      await Homepage.navtomenushop();
      await shop.selectingabook();

      await expect(shop.oldprice).toBeVisible();
      await expect(shop.oldprice).toContainText('600.00');
      await expect(shop.newPrice).toBeVisible();
      await expect(shop.newPrice).toContainText('450.00');
    });
  });
}

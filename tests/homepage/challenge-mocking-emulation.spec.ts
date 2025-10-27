import { test, expect } from "@playwright/test";

test("validate product data is visible in UI from API", async ({ page }) => {
  let brands: any;
  await test.step('intercept /brands', async() => {
    await page.route('https://api.practicesoftwaretesting.com/brands**', 
      async(route) => {
        const response = await route.fetch();
        brands = await response.json();
        route.continue();
    })
  })
  await page.goto("/");
  //await expect(page.locator('.skeleton').first()).not.toBeVisible();
  await page.waitForTimeout(3000);

  const brandFilterSection = page.getByText('SortName (A-Z)Name (Z-A)');

  for (const brand of brands) {
    await expect(brandFilterSection).toContainText(brand.name);
  }
});

test("validate categories render in UI by mocking", async ({ page }) => {
let categories: any;
    await test.step('overwrite /products', async() => {
      await page.route('https://api.practicesoftwaretesting.com/categories/tree', 
        async(route) => {
          const response = await route.fetch();
          const json = await response.json();
          json[0].name = 'Mocked Category';
          if(json[0].sub_categories && json[0].sub_categories.length > 0) {
            json[0].sub_categories[0].name = 'Mocked Subcategory';
          }
          await route.fulfill({response, json});
      })
    })
    
    await page.goto("/");
    await page.waitForTimeout(3000);
    const categoryFilterSection = page.getByText('SortName (A-Z)Name (Z-A)');
    await expect(categoryFilterSection).toContainText('Mocked Category');
    await expect(categoryFilterSection).toContainText('Mocked Subcategory');
});
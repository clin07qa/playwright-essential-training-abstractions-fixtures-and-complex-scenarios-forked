import { test, expect } from "@fixtures/pages.fixture";
//import { LoginPage } from "@pages/login.page";
//import { ContactPage } from "@pages/contact.page";
import { registerUser } from "@datafactory/register";

test("submit contact from as a registered user", async({ context, page, contactPage, loginPage }) => {
  const email = `test${Date.now()}@test.com`;
  const password = 'MatchaLatteEnjoyer1000$';
  //const loginPage = new LoginPage(page);
  //const contactPage = new ContactPage(page);
  const messageUserAuthFile = '.auth/messageUser.json';

  await registerUser(email, password);
  await loginPage.goto();
  await loginPage.login(email,password);
  await context.storageState({ path: messageUserAuthFile });


  await page.waitForTimeout(2000); // wait for two seconds so page can refresh with logged in user
  await contactPage.goto();
  await contactPage.submitForm("Testing contact formTesting contact formTesting contact formTesting contact form", email, "Test", "User");
  await page.waitForTimeout(2000);
  await page?.locator('#menu')?.click();
  await page?.getByTestId('nav-my-messages')?.click();
  await page.waitForTimeout(3000);
  const detailsBtn = page?.locator('td > a[href^="/account"]');
  await expect(detailsBtn).toHaveText('Details');
  await detailsBtn.click();

  // reply message page
  const replyField = page.locator('#message');
  const replyBtn = page.getByTestId('reply-submit');
  await replyField.fill('This is a reply This is reply This is a reply This is a reply');
  await page.waitForTimeout(2000);
  await replyBtn.click();
  await page.waitForTimeout(1000);
  await expect(page.locator('span[class^="badge"]')).toHaveText('IN_PROGRESS');
});

// test("validate submitted message", async({ page }) => {
//   await page?.locator('#menu')?.click();
//   await page?.getByTestId('nav-my-messages')?.click();
//   await expect(page?.locator('a')).toHaveText('Details');
// });
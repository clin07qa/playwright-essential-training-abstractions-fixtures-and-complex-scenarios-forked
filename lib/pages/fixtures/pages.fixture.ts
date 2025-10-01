import { LoginPage } from '@pages/login.page';
import { test as baseTest } from '@playwright/test';
import { AccountPage } from '@pages/account/accont.page';
import { ContactPage } from '@pages/contact.page';

type MyPages = {
  loginPage: LoginPage;
  accountPage: AccountPage;
  contactPage: ContactPage;
}

export const test = baseTest.extend<MyPages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async({ page }, use) => {
    await use(new AccountPage(page));
  },
  contactPage: async({ page }, use) => {
    await use(new ContactPage(page));
  }
});

export { expect } from '@playwright/test';
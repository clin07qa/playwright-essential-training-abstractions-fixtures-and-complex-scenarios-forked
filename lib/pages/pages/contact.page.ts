import { type Locator, type Page} from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly fnameInput: Locator;
  readonly lnameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectOption: Locator;
  readonly messageInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fnameInput = page.locator('#first_name');
    this.lnameInput = page.locator('#last_name');
    this.emailInput = page.locator('#email');
    this.subjectOption = page.locator('#subject');
    this.messageInput = page.locator('#message');
    this.submitBtn = page.getByTestId('contact-submit');
  }

  async goto() {
    await this.page.goto("https://practicesoftwaretesting.com/contact");
  }

  async submitForm(message: string, email: string, fname: string, lname: string) {
    const numSubjectOptions = await this.subjectOption.locator('option').count();
    // const randomOption = Math.floor(Math.random() * numSubjectOptions);
    await this.fnameInput.fill(fname);
    await this.lnameInput.fill(lname);
    await this.emailInput.fill(email);
    await this.subjectOption.selectOption({ index: 1 });
    await this.messageInput.fill(message);
    await this.submitBtn.click();
  }
}
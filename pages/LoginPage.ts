import { Locator, Page } from "@playwright/test";

/**
 * Represents the Login page of the application.
 */
export default class LoginPage {
  private page: Page;
  private loginButton: Locator;
  private usernameInputField: Locator;
  private passwordInputField: Locator;
  private continueBtn: Locator;

  /**
   * Initializes a new instance of the LoginPage class.
   */
  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator(`//button[text()="Login"]`);
    this.usernameInputField = page.locator(`input#username`);
    this.passwordInputField = page.locator(`input#password`);
    this.continueBtn = page.locator(`//button[text()="Continue"]`);
  }

  /**
   * Navigates to the login page.
   */
  public async visit(): Promise<void> {
    await this.page.goto("/");
  }

  /**
   * Performs the login action with the given credentials.
   * @param {Object} credentials - The login credentials.
   * @param {string} credentials.username - The username to log in with.
   * @param {string} credentials.password - The password to log in with.
   */
  public async performLogin({ username, password }: { username: string; password: string }): Promise<void> {
    await this.loginButton.click();
    await this.usernameInputField.fill(username);
    await this.continueBtn.click();
    await this.passwordInputField.fill(password);
    await this.continueBtn.click();
    await this.page.waitForLoadState();
  }
}
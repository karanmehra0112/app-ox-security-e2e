import { Locator, Page } from "@playwright/test";

/**
 * Represents the Dashboard page of the application.
 */
export default class DashboardPage {
  private page: Page;
  public connectRealDataNowButton: Locator;
  public issuesLink: Locator;
  public activeIssuesLink: Locator;
  public severityFilter: Locator;
  public highSeverityCheckbox: Locator;
  public resultingCounter: Locator;
  public issueTrendText: Locator;

  /**
   * Initializes a new instance of the DashboardPage class.
   */
  constructor(page: Page) {
    this.page = page;
    this.connectRealDataNowButton = page.locator(
      `//span[text()='Connect Real Data Now']`
    );
    this.issueTrendText = page.locator(`//p[text()='Issue Trend']`);
    this.issuesLink = page.locator(`//a[@href="/issues"]`);
    this.activeIssuesLink = page
      .locator(`(//p[text()='Active Issues'])`)
      .last();
    this.severityFilter = page.locator(`//h6[text()='Severity']`);
    this.highSeverityCheckbox = page.locator('input[value="High"]').first();
    this.resultingCounter = page.locator(
      `(//div[@data-testid="panel-component"])[2]/div/span[contains(@class,'count')]`
    );
  }

  async clickOnActiveIssueLink() {
    await this.issuesLink.hover();
    await this.activeIssuesLink.click({ force: true });
  }

  async clickOnSeverityFilterLink() {
    await this.severityFilter.click();
  }

  async checkHighSeverityCheckbox() {
    await this.highSeverityCheckbox.check();
  }

  /**
   * Prints the current value count of active issues.
   */
  public async printActiveIssuesCount(): Promise<void> {
    const count = await this.resultingCounter.innerText();
    console.log(`Current Active Issues: ${count}`);
  }
}

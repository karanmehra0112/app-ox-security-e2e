import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

test.beforeEach(async ({ page }) => {
  // Set up the login page and perform login before each test
  const loginPage = new LoginPage(page);
  loginPage.visit();
  loginPage.performLogin({
    username: process.env.USER as string,
    password: process.env.SECRET as string,
  });
});

// Describe block for the test suite related to the Result Counter feature
test.describe("Print Active Issue count", async () => {
  // Test case to verify printing of result counter after login
  test("TC01 - Login and print active issue count of High Severity", async ({ page }) => {
    // Set up the Dashboard page
    const dashBoardPage = new DashboardPage(page);

    await expect(dashBoardPage.connectRealDataNowButton).toBeVisible();
    await expect(dashBoardPage.issueTrendText).toBeVisible();
    await expect(page).toHaveTitle(/OX Security/);

    await dashBoardPage.clickOnActiveIssueLink();
    await dashBoardPage.clickOnSeverityFilterLink();
    await dashBoardPage.checkHighSeverityCheckbox();

    // Print the count of active issues
    await dashBoardPage.printActiveIssuesCount();
  });
});

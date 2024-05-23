import { defineConfig, devices } from '@playwright/test';
import {config} from 'dotenv';
config();
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 10 : 10,
  reporter: 'html',
  timeout: 180000,
  expect: {
    timeout: 120000
  },
  use: {
    baseURL: 'https://dev.app.ox.security',
    navigationTimeout: 120000,
    actionTimeout: 60000,
    headless: false,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

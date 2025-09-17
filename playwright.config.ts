import type { PlaywrightTestConfig } from "@playwright/test";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const config: PlaywrightTestConfig = {
  // 1 minuto para cada teste por segurança em ambiente local/CI
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${PORT}`,
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "webkit-desktop",
      use: { browserName: "webkit", viewport: { width: 1280, height: 800 } },
    },
    {
      name: "webkit-iphone",
      use: {
        browserName: "webkit",
        ...require("@playwright/test").devices["iPhone 12"],
      },
    },
  ],
};

export default config;

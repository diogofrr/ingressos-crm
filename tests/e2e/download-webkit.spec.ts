import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Download PDF - WebKit", () => {
  test("desktop: botão direto baixa PDF", async ({ page, browserName }) => {
    test.skip(browserName !== "webkit", "Executar apenas no Safari (WebKit)");

    await page.goto("/test/download/desktop");

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: "Baixar PDF" }).click(),
    ]);

    const suggested = download.suggestedFilename();
    expect(suggested).toMatch(/\.pdf$/i);
    // Opcional: salvar para verificar integridade
    const path = await download.path();
    expect(path).toBeTruthy();
  });

  test("mobile: abrir dropdown e baixar PDF", async ({ page, browserName }) => {
    test.skip(browserName !== "webkit", "Executar apenas no Safari (WebKit)");

    await page.goto("/test/download/mobile");

    await page.getByRole("button", { name: "Ações" }).click();

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: "Baixar PDF" }).click(),
    ]);

    const suggested = download.suggestedFilename();
    expect(suggested).toMatch(/\.pdf$/i);
    const path = await download.path();
    expect(path).toBeTruthy();
  });
});

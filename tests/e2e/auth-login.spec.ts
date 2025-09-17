import { expect, test } from "@playwright/test";

test.describe("Login", () => {
  test("deve exibir o formulário e validar mensagens", async ({ page }) => {
    await page.goto("/auth/login");

    await expect(
      page.getByRole("heading", { name: "Realize seu login" })
    ).toBeVisible();

    const emailInput = page.getByLabel("Email");
    const passwordInput = page.getByPlaceholder("Insira sua senha aqui");
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page.locator("#email-error")).toHaveText("Campo obrigatório");
    await expect(page.locator("#password-error")).toHaveText(
      "Campo obrigatório"
    );
  });
});

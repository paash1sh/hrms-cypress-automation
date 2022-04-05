// Custom Cypress commands for HRMS test suite

Cypress.Commands.add("login", (email, password) => {
  cy.session([email, password], () => {
    cy.visit("/login");
    cy.get("[data-cy=email]").type(email);
    cy.get("[data-cy=password]").type(password);
    cy.get("[data-cy=login-btn]").click();
    cy.get("[data-cy=dashboard]").should("be.visible");
  });
});

Cypress.Commands.add("logout", () => {
  cy.get("[data-cy=user-menu]").click();
  cy.get("[data-cy=logout-btn]").click();
  cy.url().should("include", "/login");
});

Cypress.Commands.add("navigateTo", (module) => {
  cy.get(`[data-cy=nav-${module}]`).click();
  cy.url().should("include", `/${module}`);
});

Cypress.Commands.add("waitForLoader", () => {
  cy.get("[data-cy=loader]", { timeout: 10000 }).should("not.exist");
});
# login cmd

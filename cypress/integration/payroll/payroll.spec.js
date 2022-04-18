/// <reference types="cypress" />

describe("Payroll Module", () => {
  beforeEach(() => {
    cy.fixture("users").then((users) => {
      cy.login(users.admin.email, users.admin.password);
    });
    cy.visit("/payroll");
  });

  it("should display payroll dashboard", () => {
    cy.get("[data-cy=payroll-dashboard]").should("be.visible");
    cy.get("[data-cy=current-month]").should("be.visible");
  });

  it("should list all employees in payroll", () => {
    cy.get("[data-cy=employee-payroll-list]").should("be.visible");
    cy.get("[data-cy=payroll-row]").should("have.length.greaterThan", 0);
  });

  it("should show correct salary breakdown for employee", () => {
    cy.get("[data-cy=payroll-row]").first().click();
    cy.get("[data-cy=salary-breakdown]").should("be.visible");
    cy.get("[data-cy=basic-salary]").should("be.visible");
    cy.get("[data-cy=deductions]").should("be.visible");
    cy.get("[data-cy=net-salary]").should("be.visible");
  });

  it("should generate payslip for an employee", () => {
    cy.get("[data-cy=payroll-row]").first().within(() => {
      cy.get("[data-cy=generate-payslip]").click();
    });
    cy.get("[data-cy=payslip-modal]").should("be.visible");
    cy.get("[data-cy=payslip-preview]").should("be.visible");
    cy.get("[data-cy=download-payslip]").should("be.visible");
  });

  it("should filter payroll by department", () => {
    cy.get("[data-cy=department-filter]").select("Engineering");
    cy.get("[data-cy=payroll-row]").each(($row) => {
      cy.wrap($row)
        .find("[data-cy=department]")
        .should("contain.text", "Engineering");
    });
  });

  it("should show error when processing payroll with missing data", () => {
    cy.get("[data-cy=process-payroll-btn]").click();
    cy.intercept("POST", "/api/payroll/process", {
      statusCode: 422,
      body: { error: "Missing attendance data for 3 employees" },
    }).as("processPayroll");
    cy.get("[data-cy=confirm-process]").click();
    cy.wait("@processPayroll");
    cy.get("[data-cy=error-banner]").should("be.visible");
  });
});
# payroll tests

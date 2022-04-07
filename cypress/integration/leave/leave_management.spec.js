/// <reference types="cypress" />

describe("Leave Management Module", () => {
  beforeEach(() => {
    cy.fixture("users").then((users) => {
      cy.login(users.employee.email, users.employee.password);
    });
    cy.visit("/leave");
  });

  it("should display leave balance for logged in employee", () => {
    cy.get("[data-cy=leave-balance]").should("be.visible");
    cy.get("[data-cy=annual-leave]").should("contain.text", "Annual Leave");
    cy.get("[data-cy=sick-leave]").should("contain.text", "Sick Leave");
  });

  it("should submit a leave request successfully", () => {
    cy.get("[data-cy=apply-leave-btn]").click();
    cy.get("[data-cy=leave-type]").select("Annual Leave");
    cy.get("[data-cy=start-date]").type("2023-03-15");
    cy.get("[data-cy=end-date]").type("2023-03-17");
    cy.get("[data-cy=reason]").type("Family vacation");
    cy.get("[data-cy=submit-leave]").click();
    cy.get("[data-cy=success-message]")
      .should("be.visible")
      .and("contain.text", "Leave request submitted");
  });

  it("should not allow end date before start date", () => {
    cy.get("[data-cy=apply-leave-btn]").click();
    cy.get("[data-cy=leave-type]").select("Annual Leave");
    cy.get("[data-cy=start-date]").type("2023-03-17");
    cy.get("[data-cy=end-date]").type("2023-03-15");
    cy.get("[data-cy=submit-leave]").click();
    cy.get("[data-cy=error-message]")
      .should("be.visible")
      .and("contain.text", "End date cannot be before start date");
  });

  it("should show pending leave requests", () => {
    cy.get("[data-cy=leave-history]").click();
    cy.get("[data-cy=leave-table]").should("be.visible");
    cy.get("[data-cy=leave-row]").should("have.length.greaterThan", 0);
  });

  context("Manager approval flow", () => {
    beforeEach(() => {
      cy.fixture("users").then((users) => {
        cy.login(users.manager.email, users.manager.password);
      });
      cy.visit("/leave/approvals");
    });

    it("should display pending approvals for manager", () => {
      cy.get("[data-cy=pending-approvals]").should("be.visible");
    });

    it("should allow manager to approve leave request", () => {
      cy.get("[data-cy=approval-row]").first().within(() => {
        cy.get("[data-cy=approve-btn]").click();
      });
      cy.get("[data-cy=confirm-modal]").should("be.visible");
      cy.get("[data-cy=confirm-yes]").click();
      cy.get("[data-cy=toast-success]").should("contain.text", "Leave approved");
    });

    it("should allow manager to reject leave request with reason", () => {
      cy.get("[data-cy=approval-row]").first().within(() => {
        cy.get("[data-cy=reject-btn]").click();
      });
      cy.get("[data-cy=reject-reason]").type("Team is short staffed this week");
      cy.get("[data-cy=confirm-reject]").click();
      cy.get("[data-cy=toast-success]").should("contain.text", "Leave rejected");
    });
  });
});
# leave tests

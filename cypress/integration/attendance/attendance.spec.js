/// <reference types="cypress" />

describe("Attendance Module", () => {
  beforeEach(() => {
    cy.fixture("users").then((users) => {
      cy.login(users.employee.email, users.employee.password);
    });
    cy.visit("/attendance");
  });

  it("should display attendance calendar", () => {
    cy.get("[data-cy=attendance-calendar]").should("be.visible");
  });

  it("should allow employee to clock in", () => {
    cy.intercept("POST", "/api/attendance/clock-in").as("clockIn");
    cy.get("[data-cy=clock-in-btn]").click();
    cy.wait("@clockIn").its("response.statusCode").should("eq", 200);
    cy.get("[data-cy=clock-in-time]").should("be.visible");
    cy.get("[data-cy=clock-in-btn]").should("be.disabled");
  });

  it("should allow employee to clock out", () => {
    cy.intercept("POST", "/api/attendance/clock-out").as("clockOut");
    cy.get("[data-cy=clock-out-btn]").click();
    cy.wait("@clockOut").its("response.statusCode").should("eq", 200);
    cy.get("[data-cy=clock-out-time]").should("be.visible");
    cy.get("[data-cy=clock-out-btn]").should("be.disabled");
  });

  it("should show monthly attendance summary", () => {
    cy.get("[data-cy=monthly-summary]").should("be.visible");
    cy.get("[data-cy=present-days]").should("be.visible");
    cy.get("[data-cy=absent-days]").should("be.visible");
    cy.get("[data-cy=late-count]").should("be.visible");
  });

  it("should stub attendance API and show mocked data", () => {
    cy.intercept("GET", "/api/attendance/monthly*", {
      fixture: "attendance_mock.json",
    }).as("getAttendance");
    cy.visit("/attendance");
    cy.wait("@getAttendance");
    cy.get("[data-cy=present-days]").should("contain.text", "22");
  });
});

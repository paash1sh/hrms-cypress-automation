# hrms-cypress-automation

Cypress end-to-end test suite for a Human Resource Management System (HRMS). Covers leave management, payroll, and attendance modules with UI automation, API stubbing, and mocking via Cypress intercept.

## Tech Stack

- Cypress 9.7.0
- JavaScript (ES2020)
- Faker.js 7.x for test data
- Node.js 16.x

## Test Coverage

| Module | Scenarios |
|--------|-----------|
| Leave Management | Apply leave, validation, manager approval/rejection |
| Payroll | Dashboard, salary breakdown, payslip generation, department filter |
| Attendance | Clock in/out, monthly summary, stubbed API response |

## Setup

```bash
npm install
```

Update `cypress.json` with your environment `baseUrl`.

## Running Tests

```bash
# Run all tests headless
npm test

# Open Cypress UI
npm run test:headed

# Run by module
npm run test:leave
npm run test:payroll
npm run test:attendance
```

## Structure

```
cypress/
├── integration/
│   ├── leave/
│   ├── payroll/
│   └── attendance/
├── fixtures/        # Test data and mock responses
└── support/         # Custom commands (login, logout, navigateTo)
```

## Notes

- Uses `cy.session()` for login caching across tests
- API responses stubbed with `cy.intercept()` for isolated testing
- Custom commands in `support/commands.js`
# readme

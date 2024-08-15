describe("Navigation", () => {
  it("should navigate to the main page", () => {
    cy.visit("/");
    cy.url().should("equal", Cypress.config().baseUrl + "/");
  });
});

export {};

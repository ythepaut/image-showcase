describe("Navigation", () => {
  it("should navigate to the main page", () => {
    cy.visit("/en");
    cy.url().should("equal", Cypress.config().baseUrl + "/en");
  });
});

export {};

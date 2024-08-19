describe("App", () => {

  beforeEach(() => {
    cy.visit("/en");
  });

  it("should navigate to the main page", () => {
    cy.url().should("equal", Cypress.config().baseUrl + "/en");
  });

  it("should have all the gallery images", () => {
    cy.get("img").should("have.length", 10);
  });

  it("should be able to click on an image to see the details", () => {
    cy.get("img[alt='Image 1']").click();

    // title
    cy.get("h2").should("contain.text", "Image 1");

    // carousel
    // 10 images (gallery) + 10 images (carousel) + 1 image (selected image)
    cy.get("img").should("have.length", 21);

    // description
    cy.contains("800×600").should("exist");
  });

  it("should be able to navigate from the gallery", () => {
    cy.get("img[alt='Image 1']").click();
    cy.get("h2").should("contain.text", "Image 1");

    // get button with Close title attribute
    cy.get("button[title='Close']").first().click({ force: true });
    cy.get("img[alt='Image 5']").click();
    cy.get("h2").should("contain.text", "Image 5");
  });

  it("should be able to navigate from the carousel", () => {
    cy.get("img[alt='Image 1']").click();
    cy.get("h2").should("contain.text", "Image 1");

    cy.get("img[alt='Image 2']").last().click();
    cy.get("h2").should("contain.text", "Image 2");
  });
});

export {};

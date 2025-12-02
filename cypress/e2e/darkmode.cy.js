describe("Dark Mode", () => {
  it("should allow user to toggle to light mode and have it persist across navigation", () => {
    cy.visit("/");
    cy.contains("Got it!").click();
    cy.get('button[aria-label*="Light Mode"]').click();
    cy.get("html").should("not.have.class", "dark");
    cy.contains("Reviews").click();
    cy.get("html").should("not.have.class", "dark");
    cy.contains("About").click();
    cy.get("html").should("not.have.class", "dark");
  });
});

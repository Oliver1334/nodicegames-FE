describe("Sign in flow", () => {
  it("should allow the user to sign in successfully", () => {
    cy.visit("/");
    cy.contains("Got it!").click();
    cy.contains("Login").click();
    cy.get('[id="username"]').type("grumpy19");
    cy.get('[id="password"]').type("Password123");
    cy.get('[type="submit"]').click()

    cy.url().should('include', '/account')
    cy.contains('Paul Grump').should('be.visible')
  });
});

describe("Post a comment", () => {
  it("should allow to sign in and post a comment on a specific review", () => {
    cy.visit("/");
    cy.contains("Got it!").click();
    cy.contains("Login").click();
    cy.get('[id="username"]').type("grumpy19");
    cy.get('[id="password"]').type("Password123");
    cy.get('[type="submit"]').click();
    cy.url().should("include", "/account");
    cy.contains("Reviews").click();
    cy.contains("Reef").parent().contains("Read Review").click();
    cy.get("textarea").type("Love this review!");
    cy.contains("button", "Comment").click();
    cy.contains("Love this review!")
      .parent() // or .parents('.comment-card') depending on structure
      .should("contain", "grumpy19");
  });
});

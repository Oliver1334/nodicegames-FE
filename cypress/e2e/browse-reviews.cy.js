describe("Browse reviews", () => {
  it("should display review cards, navigate to a review, and show its details with comments", () => {
    cy.visit("/");
    cy.contains("Got it!").click();
    cy.contains("Reviews").click();
    cy.contains("Escape The Dark Castle").should("be.visible");
    cy.contains("Reef").should("be.visible");
    cy.contains("JengARRGGGH!").should("be.visible");
    cy.contains("Super Rhino Hero").should("be.visible");

    cy.contains("Reef").parent().contains("Read Review").click();
    cy.url().should("include", "/reviews/18");
    cy.contains(
      "This game reminds me of the stress-free environment described in a song sung by a crab in the famous film about a mermaid. Plenty of coral collecting, and reef building to keep you entertained"
    ).should("be.visible");
    cy.contains(/\d+ comments/i).should("be.visible");
  });
});

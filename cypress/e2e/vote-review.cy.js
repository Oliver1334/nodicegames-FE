describe("Vote on a review", () => {
  it("should let the user vote on a review and increase the vote count", () => {
    cy.visit("/");
    cy.contains("Got it!").click();
    cy.contains("Reviews").click();
    cy.contains("Reef").parent().contains("Read Review").click();
    cy.contains(/votes: (\d+)/i)
      .invoke("text")
      .then((text) => {
        const currentVotes = parseInt(text.match(/\d+/)[0]);
        cy.contains("button", "Vote").click();
        cy.contains(`Votes: ${currentVotes + 1}`).should("be.visible");

        cy.contains("button", "Vote").should("be.disabled");
      });
  });
});

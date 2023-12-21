it("", () => {
  cy.visit("./src/privacy.html");

  cy.contains("Talking About Testing").should('have.text', 'Talking About Testing')
});

Cypress._.times(3, () => {
  it("testa a página da política de privacidade de forma independente", () => {
    cy.visit("./src/privacy.html");

    cy.contains("Talking About Testing").should(
      "have.text",
      "Talking About Testing"
    );
  });
})

// Cypress._. utiliza lodash (biliboteca famosa do JS)
// Na função times, como primeiro argumento vai a quantidade de vezes que o teste será executado, e no segundo argumento uma função de callback.
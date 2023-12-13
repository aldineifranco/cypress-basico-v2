Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",
  () => {
    cy.get("#firstName").type("Aldinei");
    cy.get("#lastName").type("Franco");
    cy.get("#email").type("exemplo@gmail.com");
    cy.get("#open-text-area").type("longText");
    cy.get('button[type="submit"]').click();
  }
);

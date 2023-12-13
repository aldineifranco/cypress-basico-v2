/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("../../src/index.html");
  });

  it("Verifica o título da aplicação", function () {
    cy.visit("../../src/index.html");
    cy.title().should(
      "be.equal",
      "Central de Atendimento ao Cliente TAT"
    );
  });

  it("Preencher os campos obrigatórios e envia o formulário", () => {
    const longText =
      "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste";

    cy.get("#firstName").type("Aldinei");
    cy.get("#lastName").type("Franco");
    cy.get("#email").type("exemplo@gmail.com");
    cy.get("#open-text-area").type("longText", {
      delay: 0,
    });
    cy.get('button[type="submit"]').click();
    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Aldinei");
    cy.get("#lastName").type("Franco");
    cy.get("#email").type("exemplo@gmail,com");
    cy.get("#open-text-area").type("Teste");
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchido com valor não numérico", () => {
    cy.get("#phone")
      .type("asdfalkjhlkj")
      .should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Aldinei");
    cy.get("#lastName").type("Franco");
    cy.get("#email").type("exemplo@gmail,com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("Teste");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Aldinei")
      .should("have.value", "Aldinei")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Franco")
      .should("have.value", "Franco")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("exemplo@gmail,com")
      .should("have.value", "exemplo@gmail,com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("999966666")
      .should("have.value", "999966666")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get(".button[type='submit']").click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });
});

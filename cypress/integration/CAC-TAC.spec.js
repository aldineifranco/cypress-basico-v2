/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  const threeSecondsInMs = 3000;

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

    cy.clock();
    //congela o relógio

    cy.get("#firstName").type("Aldinei");
    cy.get("#lastName").type("Franco");
    cy.get("#email").type("exemplo@gmail.com");
    cy.get("#open-text-area").type(longText, {
      delay: 0,
    });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");

    cy.tick(threeSecondsInMs);

    cy.get(".success").should("not.be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.clock();

    cy.get("#firstName").type("Aldinei");
    cy.get("#lastName").type("Franco");
    cy.get("#email").type("exemplo@gmail,com");
    cy.get("#open-text-area").type("Teste");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");

    cy.tick(threeSecondsInMs);

    cy.get(".error").should("not.be.visible");
  });

  it("campo telefone continua vazio quando preenchido com valor não numérico", () => {
    cy.get("#phone")
      .type("asdfalkjhlkj")
      .should("have.value", "");
  });

  it("--exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.clock();

    cy.get("#firstName").type("Aldinei");
    cy.get("#lastName").type("Franco");
    cy.get("#email").type("exemplo@gmail,com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("Teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(threeSecondsInMs);

    cy.get(".error").should("not.be.visible");
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
    cy.clock();

    cy.get(".button[type='submit']").click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.clock();

    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");

    cy.tick(threeSecondsInMs);

    cy.get(".success").should("not.be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product")
      .select("YouTube")
      .should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product")
      .select("mentoria")
      .should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product")
      .select(1)
      .should("have.value", "blog");
  });

  it("marca o tipo de atendimento 'Feedback'", () => {
    cy.get(
      'input[type="radio"][value="feedback"]'
    )
      .check()
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });
  //each e wrap passa pelos três radios

  it("marca ambos os checkboxes", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });
  //pega os dois inputs checkbox e checa, depois pega o último com last e desmarca. Por fim verifica com should se está desmarcado.

  it("--exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Aldinei");
    cy.get("#lastName").type("Franco");
    cy.get("#email").type("exemplo@gmail,com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("input[type='file']#file-upload")
      .should("not.have.value")
      .selectFile(
        "./cypress/fixtures/example.json"
      )
      .should(($input) => {
        expect($input[0].files[0].name).to.equal(
          "example.json"
        );
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("input[type='file']#file-upload")
      .should("not.have.value")
      .selectFile(
        "./cypress/fixtures/example.json",
        { action: "drag-drop" }
      )
      .should(($input) => {
        expect($input[0].files[0].name).to.equal(
          "example.json"
        );
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get("input[type='file']")
      .selectFile("@sampleFile")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal(
          "example.json"
        );
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get("#privacy a").should(
      "have.attr",
      "target",
      "_blank"
    );
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get("#privacy a")
      .invoke("removeAttr", "target")
      .click();

    cy.contains("Talking About");
  });

  it("exibe e esconde as mensagens de sucesso e erro usando o .invoke", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and(
        "contain",
        "Mensagem enviada com sucesso."
      )
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and(
        "contain",
        "Valide os campos obrigatórios!"
      )
      .invoke("hide")
      .should("not.be.visible");
  });

  it("preenche a area de texto usando o comando invoke", () => {
    const longText = Cypress._.repeat(
      "0123456789",
      20
    );
    // ._.repeat() vem da biblioteca lodash do JS

    cy.get("#open-text-area")
      .invoke("val", longText)
      .should("have.value", longText);
  });

  it.only("faz uma requisição http", () => {
    cy.request(
      "https://cac-tat.s3.eu-central-1.amazonaws.com/index.html"
    ).should((response) => {
      const { status, statusText, body } =
        response;
      expect(status).to.equal(200);
      expect(statusText).to.equal("OK");
      expect(body).to.include("CAC TAT");
    });
  });

  it.only("encontra o gato escondido", () => {
    cy.get("#cat")
      .invoke("show")
      .should("be.visible");
    
    cy.get('#title')
      .invoke('text', 'CAT TAT');

    cy.get('#subtitle')
      .invoke('text', 'mudança de texto')
  });
});

describe('Sistema de Gerenciamento de Eventos - Regressão', () => {

  function fazerLogin() {
    cy.visit('/');

    cy.get('#email').clear().type('usuario@email.com');
    cy.get('#senha').clear().type('123456');
    cy.get('#loginForm').submit();

    cy.url().should('include', '/dashboard.html');
  }

  function cadastrarEvento(nome) {
    cy.get('#nome').clear().type(nome);
    cy.get('#descricao').clear().type('Evento criado para teste de regressão');
    cy.get('#data').type('2026-10-25');
    cy.get('#horario').type('19:00');
    cy.get('#local').clear().type('Brasília');
    cy.get('#vagas').clear().type('100');
    cy.get('#status').select('Ativo');

    cy.get('#eventForm').submit();

    cy.get('#message').should('contain', 'Evento cadastrado com sucesso');
    cy.contains(nome).should('be.visible');
  }

  it('REG-001: login continua funcionando', () => {
    fazerLogin();

    cy.contains('Gerenciamento de Eventos').should('be.visible');
  });

  it('REG-002: cadastro continua funcionando', () => {
    fazerLogin();

    const nome = `Regressao Cadastro ${Date.now()}`;

    cadastrarEvento(nome);

    cy.contains(nome).should('be.visible');
  });

  it('REG-003: edição continua funcionando', () => {
    fazerLogin();

    const nome = `Regressao Edicao ${Date.now()}`;

    cadastrarEvento(nome);

    cy.contains('.event-card', nome)
      .find('button[data-action="edit"]')
      .click();

    cy.get('#formTitle').should('contain', 'Editar evento');

    cy.get('#local')
      .clear()
      .type('Centro de Convenções Ulysses Guimarães');

    cy.get('#horario')
      .clear()
      .type('20:00');

    cy.get('#eventForm').submit();

    cy.get('#message')
      .should('contain', 'Evento atualizado com sucesso');

    cy.contains('.event-card', nome)
      .should('contain', 'Centro de Convenções Ulysses Guimarães');
  });

  it('REG-004: exclusão continua funcionando', () => {
    fazerLogin();

    const nome = `Regressao Exclusao ${Date.now()}`;

    cadastrarEvento(nome);

    cy.on('window:confirm', () => true);

    cy.contains('.event-card', nome)
      .find('button[data-action="delete"]')
      .click();

    cy.get('#message')
      .should('contain', 'Evento excluído com sucesso');

    cy.contains(nome).should('not.exist');
  });

});
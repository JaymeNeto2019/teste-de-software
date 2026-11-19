describe('Sistema de Gerenciamento de Eventos - E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('CT-001: realiza login com credenciais válidas', () => {
    cy.get('#email').clear().type('usuario@email.com');
    cy.get('#senha').clear().type('123456');
    cy.get('#loginForm').submit();

    cy.url().should('include', '/dashboard.html');
    cy.contains('Gerenciamento de Eventos').should('be.visible');
  });

  it('CT-002: rejeita login com senha incorreta', () => {
    cy.get('#email').clear().type('usuario@email.com');
    cy.get('#senha').clear().type('senhaerrada');
    cy.get('#loginForm').submit();

    cy.get('#loginMessage').should('contain', 'Credenciais inválidas');
  });

  it('CT-003: cadastra evento com dados válidos', () => {
    cy.get('#email').clear().type('usuario@email.com');
    cy.get('#senha').clear().type('123456');
    cy.get('#loginForm').submit();

    cy.url().should('include', '/dashboard.html');

    const uniqueName = `Feira de Tecnologia ${Date.now()}`;

    cy.get('#nome').type(uniqueName);
    cy.get('#descricao').type('Evento sobre inovação e tecnologia');
    cy.get('#data').type('2026-10-25');
    cy.get('#horario').type('19:00');
    cy.get('#local').type('Brasília');
    cy.get('#vagas').clear().type('100');
    cy.get('#status').select('Ativo');
    cy.get('#eventForm').submit();

    cy.get('#message').should('contain', 'Evento cadastrado com sucesso');
    cy.contains(uniqueName).should('be.visible');
  });

  it('CT-004: impede cadastro com nome vazio', () => {
    cy.get('#email').clear().type('usuario@email.com');
    cy.get('#senha').clear().type('123456');
    cy.get('#loginForm').submit();

    cy.url().should('include', '/dashboard.html');

    cy.get('#data').type('2026-10-25');
    cy.get('#horario').type('19:00');
    cy.get('#local').type('Brasília');
    cy.get('#vagas').clear().type('100');
    cy.get('#eventForm').submit();

    cy.get('#nome:invalid').should('exist');
  });
});
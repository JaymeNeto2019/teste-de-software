describe('Casos complementares', () => {
  const dados={nome:'Evento complementar',descricao:'Teste automatizado',data:'2026-10-25',horario:'19:00',local:'Brasília',vagas:100,status:'Ativo'};
  let id, token;
  beforeEach(() => {
    cy.request('POST','/api/login',{email:'usuario@email.com',senha:'123456'}).then(r=>{
      token=r.body.token;
      cy.request({method:'POST',url:'/api/events',headers:{Authorization:`Bearer ${token}`},body:dados}).then(e=>{id=e.body.event.id;});
      cy.visit('/dashboard.html',{onBeforeLoad(win){win.localStorage.setItem('token',token);}});
    });
  });
  afterEach(()=>{cy.then(()=>cy.request({method:'DELETE',url:`/api/events/${id}`,headers:{Authorization:`Bearer ${token}`},failOnStatusCode:false}));});
  const card=()=>cy.get(`.event-card[data-id="${id}"]`);
  it('CT-005: lista os dados do evento',()=>{card().should('contain','Evento complementar').and('contain','Brasília').and('contain','Ativo');});
  it('CT-006: interface exibe lista vazia com resposta controlada',()=>{
    cy.intercept('GET','/api/events',{statusCode:200,body:[]}).as('vazio'); cy.reload(); cy.wait('@vazio');
    cy.contains('Não existem eventos cadastrados.').should('be.visible');
  });
  it('CT-007: edita local e horário',()=>{
    card().find('[data-action="edit"]').click();cy.get('#local').clear().type('UCB');cy.get('#horario').clear().type('20:00');cy.get('#eventForm').submit();
    card().should('contain','UCB').and('contain','20:00');
  });
  it('CT-008: impede edição com nome vazio',()=>{
    card().find('[data-action="edit"]').click();cy.get('#nome').clear();cy.get('#eventForm').submit();cy.get('#nome:invalid').should('exist');
    cy.request({url:`/api/events/${id}`,headers:{Authorization:`Bearer ${token}`}}).its('body.nome').should('eq',dados.nome);
  });
  it('CT-009: exclui evento confirmado',()=>{cy.on('window:confirm',()=>true);card().find('[data-action="delete"]').click();card().should('not.exist');});
  it('CT-010: mantém evento ao cancelar exclusão',()=>{cy.on('window:confirm',()=>false);card().find('[data-action="delete"]').click();card().should('exist');});
  it('CT-011: encerra sessão local',()=>{cy.get('#logoutButton').click();cy.location('pathname').should('eq','/');cy.window().then(w=>expect(w.localStorage.getItem('token')).to.be.null);});
  it('CT-012: bloqueia interface após logout',()=>{cy.get('#logoutButton').click();cy.location('pathname').should('eq','/');cy.visit('/dashboard.html');cy.location('pathname').should('eq','/');});
});

const { prepararApp, obterToken, eventoValido } = require('./helpers');

let api;
let token;
const auth = () => ({ Authorization: `Bearer ${token}` });

beforeAll(async () => {
  api = await prepararApp();
  token = await obterToken(api);
});

describe('API - Autenticação', () => {
  test('CT-022: login válido retorna 200 e token', async () => {
    const res = await api.post('/api/login').send({ email: 'usuario@email.com', senha: '123456' });
    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe('string');
  });

  test('CT-023: senha incorreta retorna 401', async () => {
    const res = await api.post('/api/login').send({ email: 'usuario@email.com', senha: 'errada' });
    expect(res.status).toBe(401);
    expect(res.body.message).toContain('Credenciais inválidas');
  });

  test('CT-038: login sem e-mail/senha retorna 400', async () => {
    const res = await api.post('/api/login').send({});
    expect(res.status).toBe(400);
  });

  test('CT-039: e-mail inexistente retorna 401', async () => {
    const res = await api.post('/api/login').send({ email: 'x@x.com', senha: '123456' });
    expect(res.status).toBe(401);
  });

  test('CT-037: rota de eventos sem token retorna 401', async () => {
    const res = await api.get('/api/events');
    expect(res.status).toBe(401);
  });

  test('CT-040: token inválido retorna 401', async () => {
    const res = await api.get('/api/events').set('Authorization', 'Bearer token.falso.aqui');
    expect(res.status).toBe(401);
  });
});

describe('API - CRUD de eventos', () => {
  let id;

  test('CT-016: cadastra evento válido (201)', async () => {
    const res = await api.post('/api/events').set(auth()).send(eventoValido());
    expect(res.status).toBe(201);
    expect(res.body.event.id).toBeDefined();
    id = res.body.event.id;
  });

  test('CT-017: cadastro sem nome retorna 400', async () => {
    const res = await api.post('/api/events').set(auth()).send(eventoValido({ nome: '' }));
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('nome');
  });

  test('CT-041: vagas zero ou negativa retorna 400', async () => {
    for (const vagas of [0, -10]) {
      const res = await api.post('/api/events').set(auth()).send(eventoValido({ vagas }));
      expect(res.status).toBe(400);
    }
  });

  test('CT-042: data inexistente (2026-02-30) retorna 400', async () => {
    const res = await api.post('/api/events').set(auth()).send(eventoValido({ data: '2026-02-30' }));
    expect(res.status).toBe(400);
  });

  test('CT-043: vagas decimal (10.5) retorna 400', async () => {
    const res = await api.post('/api/events').set(auth()).send(eventoValido({ vagas: 10.5 }));
    expect(res.status).toBe(400);
  });

  test('CT-018: lista eventos (200, array)', async () => {
    const res = await api.get('/api/events').set(auth());
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('CT-044: consulta evento por id (200)', async () => {
    const res = await api.get(`/api/events/${id}`).set(auth());
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  test('CT-019: edita evento (200)', async () => {
    const res = await api
      .put(`/api/events/${id}`)
      .set(auth())
      .send(eventoValido({ nome: 'Feira Atualizada' }));
    expect(res.status).toBe(200);
    expect(res.body.event.nome).toBe('Feira Atualizada');
  });

  test('CT-021: evento inexistente retorna 404', async () => {
    const res = await api.get('/api/events/999999').set(auth());
    expect(res.status).toBe(404);
  });

  test('CT-020: exclui evento (200) e depois retorna 404', async () => {
    const del = await api.delete(`/api/events/${id}`).set(auth());
    expect(del.status).toBe(200);
    const get = await api.get(`/api/events/${id}`).set(auth());
    expect(get.status).toBe(404);
  });

  test('CT-045: rota /api inexistente retorna 404 JSON', async () => {
    const res = await api.get('/api/nao-existe');
    expect(res.status).toBe(404);
    expect(res.body.message).toBeDefined();
  });
});

afterAll(done => { require('../../src/db').db.close(done); });

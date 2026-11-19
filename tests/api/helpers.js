// Usa banco SQLite em memória para não alterar data/events.db durante os testes.
process.env.DB_PATH = ':memory:';

const request = require('supertest');
const { initDatabase } = require('../../src/db');
const { app } = require('../../src/server');

async function prepararApp() {
  await initDatabase();
  return request(app);
}

async function obterToken(api) {
  const res = await api
    .post('/api/login')
    .send({ email: 'usuario@email.com', senha: '123456' });
  return res.body.token;
}

const eventoValido = (extra = {}) => ({
  nome: 'Feira de Tecnologia',
  descricao: 'Evento sobre inovação e tecnologia',
  data: '2026-10-25',
  horario: '19:00',
  local: 'Brasília',
  vagas: 100,
  status: 'Ativo',
  ...extra
});

module.exports = { prepararApp, obterToken, eventoValido };

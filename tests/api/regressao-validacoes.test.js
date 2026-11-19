// Regressão dos defeitos identificados: todos devem passar após a correção.
const { prepararApp, obterToken, eventoValido } = require('./helpers');
let api, token;
beforeAll(async()=>{ api=await prepararApp(); token=await obterToken(api); });
afterAll(done => { require('../../src/db').db.close(done); });
const criar=(extra)=>api.post('/api/events').set('Authorization',`Bearer ${token}`).send(eventoValido(extra));
test('CT-035: rejeita horário 99:99',async()=>{ expect((await criar({horario:'99:99'})).status).toBe(400); });
test('CT-036: rejeita status fora da lista',async()=>{ expect((await criar({status:'banana'})).status).toBe(400); });
test('CT-046: rejeita nome numérico sem erro interno',async()=>{ expect((await criar({nome:123})).status).toBe(400); });
test('CT-047: rejeita descrição null sem erro interno',async()=>{ expect((await criar({descricao:null})).status).toBe(400); });
test('CT-048: rejeita senha em formato de objeto',async()=>{
 const r=await api.post('/api/login').send({email:'usuario@email.com',senha:{a:1}}); expect(r.status).toBe(400);
});
test('CT-049: JSON malformado retorna erro JSON',async()=>{
 const r=await api.post('/api/login').set('Content-Type','application/json').send('{"email":');
 expect(r.status).toBe(400);expect(r.headers['content-type']).toMatch(/json/);expect(r.body.message).toBe('JSON inválido.');
});

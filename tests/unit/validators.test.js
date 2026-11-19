const {
  isValidDateString,
  isValidEventName,
  isValidCapacity,
  validateEvent
} = require('../../src/utils/validators');

describe('Validações do evento', () => {
  test('CT-013: rejeita nome vazio', () => {
    expect(isValidEventName('')).toBe(false);
    expect(isValidEventName('   ')).toBe(false);
  });

  test('CT-014: rejeita quantidade de vagas negativa', () => {
    expect(isValidCapacity(-10)).toBe(false);
  });

  test('CT-015: rejeita data inválida', () => {
    expect(isValidDateString('2026-10-32')).toBe(false);
  });

  test('CT-024: aceita nome válido', () => {
    expect(isValidEventName('Feira de Tecnologia')).toBe(true);
  });

  test('CT-025: aceita um evento completo e válido', () => {
    const event = {
      nome: 'Feira de Tecnologia',
      descricao: 'Evento sobre inovação e tecnologia',
      data: '2026-10-25',
      horario: '19:00',
      local: 'Brasília',
      vagas: 100,
      status: 'Ativo'
    };

    expect(validateEvent(event)).toEqual({ valid: true, errors: [] });
  });
});

const { isValidTime, isValidStatus, validateCredentials } = require('../../src/utils/validators');
describe('Regras adicionais', () => {
  test('CT-026: aceita limites de horário', () => { expect(isValidTime('00:00')).toBe(true); expect(isValidTime('23:59')).toBe(true); });
  test('CT-027: rejeita horário inválido', () => { for (const x of ['24:00','19:60','9:00','99:99','']) expect(isValidTime(x)).toBe(false); });
  test('CT-028: aceita os três status', () => { for (const x of ['Ativo','Inativo','Concluído']) expect(isValidStatus(x)).toBe(true); });
  test('CT-029: rejeita status desconhecido', () => { expect(isValidStatus('Inventado')).toBe(false); });
  test('CT-030: aceita formato de credenciais válido', () => { expect(validateCredentials('usuario@email.com','123456')).toBe(true); });
  test('CT-031: rejeita credenciais vazias ou malformadas', () => { for (const [e,s] of [['','123456'],['usuario','123456'],['usuario@email.com',''],['usuario@email.com',123456]]) expect(validateCredentials(e,s)).toBe(false); });
  test('CT-032: aceita data bissexta e rejeita data inexistente', () => { expect(isValidDateString('2028-02-29')).toBe(true); expect(isValidDateString('2026-02-29')).toBe(false); });
  test('CT-033: rejeita vagas zero e fracionadas', () => { expect(isValidCapacity(0)).toBe(false); expect(isValidCapacity(1.5)).toBe(false); });
  test('CT-034: validação integrada rejeita horário e status inválidos', () => {
    const result=validateEvent({nome:'Feira',data:'2026-10-25',horario:'99:99',local:'Brasília',vagas:100,status:'Inventado'});
    expect(result.valid).toBe(false); expect(result.errors).toHaveLength(2);
  });
});

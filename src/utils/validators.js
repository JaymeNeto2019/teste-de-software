function isValidDateString(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function validateEvent(event) {
  const errors = [];

  if (!event || typeof event !== 'object') {
    return { valid: false, errors: ['Dados do evento são obrigatórios.'] };
  }

  if (!isValidEventName(event.nome)) errors.push('O campo nome é obrigatório.');
  if (!String(event.data || '').trim()) errors.push('O campo data é obrigatório.');
  if (!String(event.horario || '').trim()) errors.push('O campo horário é obrigatório.');
  if (!isValidEventName(event.local)) errors.push('O campo local é obrigatório.');
  if (!String(event.status || '').trim()) errors.push('O campo status é obrigatório.');

  const vagas = Number(event.vagas);
  if (!Number.isInteger(vagas) || vagas <= 0) {
    errors.push('A quantidade de vagas deve ser um número inteiro maior que zero.');
  }

  if (event.data && !isValidDateString(event.data)) {
    errors.push('A data informada é inválida.');
  }

  if (event.horario && !isValidTime(event.horario)) errors.push('O horário deve estar no formato HH:mm, entre 00:00 e 23:59.');
  if (event.status && !isValidStatus(event.status)) errors.push('O status deve ser Ativo, Inativo ou Concluído.');
  if (event.descricao !== undefined && typeof event.descricao !== 'string') errors.push('A descrição deve ser um texto.');
  return { valid: errors.length === 0, errors };
}

function isValidEventName(name) {
  return typeof name === 'string' && name.trim().length > 0;
}

function isValidCapacity(vagas) {
  const value = Number(vagas);
  return Number.isInteger(value) && value > 0;
}

function isValidTime(value) {
  return typeof value === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
}
function isValidStatus(value) { return ['Ativo', 'Inativo', 'Concluído'].includes(value); }
function validateCredentials(email, senha) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && typeof senha === 'string' && senha.trim().length > 0;
}
module.exports = {
  isValidTime, isValidStatus, validateCredentials,
  isValidDateString,
  validateEvent,
  isValidEventName,
  isValidCapacity
};

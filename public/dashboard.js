const token = localStorage.getItem('token');
if (!token) window.location.href = '/';

const eventForm = document.getElementById('eventForm');
const eventsContainer = document.getElementById('eventsContainer');
const message = document.getElementById('message');
const formTitle = document.getElementById('formTitle');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');

function authHeaders(extra = {}) {
  return { Authorization: `Bearer ${token}`, ...extra };
}

function showMessage(text, type = 'success') {
  message.textContent = text;
  message.className = `message ${type}`;
}

function resetForm() {
  eventForm.reset();
  document.getElementById('vagas').value = 100;
  document.getElementById('status').value = 'Ativo';
  document.getElementById('eventId').value = '';
  formTitle.textContent = 'Cadastrar evento';
  saveButton.textContent = 'Cadastrar';
  cancelButton.classList.add('hidden');
}

async function apiFetch(url, options = {}) {
  const response = await fetch(url, options);
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/';
    return null;
  }
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro na operação.');
  return data;
}

async function loadEvents() {
  try {
    const events = await apiFetch('/api/events', { headers: authHeaders() });
    if (!events) return;

    if (events.length === 0) {
      eventsContainer.innerHTML = '<div class="empty">Não existem eventos cadastrados.</div>';
      return;
    }

    eventsContainer.innerHTML = events.map((event) => `
      <article class="event-card" data-id="${event.id}">
        <h3>${escapeHtml(event.nome)}</h3>
        <p class="event-meta"><strong>Data:</strong> ${formatDate(event.data)} às ${escapeHtml(event.horario)}</p>
        <p class="event-meta"><strong>Local:</strong> ${escapeHtml(event.local)}</p>
        <p class="event-meta"><strong>Vagas:</strong> ${event.vagas} | <strong>Status:</strong> ${escapeHtml(event.status)}</p>
        <p>${escapeHtml(event.descricao || 'Sem descrição.')}</p>
        <div class="card-actions">
          <button data-action="edit" data-id="${event.id}">Editar</button>
          <button data-action="delete" data-id="${event.id}" class="danger">Excluir</button>
        </div>
      </article>
    `).join('');
  } catch (error) {
    showMessage(error.message, 'error');
  }
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));
}

function formatDate(value) {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}

eventForm.addEventListener('input', () => { message.textContent = ''; message.className = 'message'; });
eventForm.addEventListener('invalid', () => { message.textContent = ''; }, true);

eventForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = document.getElementById('eventId').value;
  const payload = {
    nome: document.getElementById('nome').value.trim(),
    descricao: document.getElementById('descricao').value.trim(),
    data: document.getElementById('data').value,
    horario: document.getElementById('horario').value,
    local: document.getElementById('local').value.trim(),
    vagas: Number(document.getElementById('vagas').value),
    status: document.getElementById('status').value
  };

  try {
    const data = await apiFetch(id ? `/api/events/${id}` : '/api/events', {
      method: id ? 'PUT' : 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    });

    showMessage(data.message, 'success');
    resetForm();
    await loadEvents();
  } catch (error) {
    showMessage(error.message, 'error');
  }
});

eventsContainer.addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const id = button.dataset.id;
  const action = button.dataset.action;

  try {
    if (action === 'edit') {
      const item = await apiFetch(`/api/events/${id}`, { headers: authHeaders() });
      document.getElementById('eventId').value = item.id;
      document.getElementById('nome').value = item.nome;
      document.getElementById('descricao').value = item.descricao || '';
      document.getElementById('data').value = item.data;
      document.getElementById('horario').value = item.horario;
      document.getElementById('local').value = item.local;
      document.getElementById('vagas').value = item.vagas;
      document.getElementById('status').value = item.status;
      formTitle.textContent = 'Editar evento';
      saveButton.textContent = 'Salvar alterações';
      cancelButton.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (action === 'delete') {
      if (!window.confirm('Deseja realmente excluir este evento?')) return;
      const data = await apiFetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showMessage(data.message, 'success');
      await loadEvents();
    }
  } catch (error) {
    showMessage(error.message, 'error');
  }
});

cancelButton.addEventListener('click', resetForm);
document.getElementById('refreshButton').addEventListener('click', loadEvents);
document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = '/';
});

loadEvents();

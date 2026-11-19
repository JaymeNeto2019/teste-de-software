const form = document.getElementById('loginForm');
const message = document.getElementById('loginMessage');

if (localStorage.getItem('token')) {
  window.location.href = '/dashboard.html';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = '';
  message.className = 'message';

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Falha no login.');

    localStorage.setItem('token', data.token);
    window.location.href = '/dashboard.html';
  } catch (error) {
    message.textContent = error.message;
    message.classList.add('error');
  }
});

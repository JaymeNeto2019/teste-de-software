const path = require('path');
const express = require('express');
const { initDatabase } = require('./db');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const { authRequired } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', application: 'Sistema de Gerenciamento de Eventos' });
});

app.use('/api', authRoutes);
app.use('/api/events', authRequired, eventRoutes);

app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

// Mantém respostas de erro da API em JSON, inclusive para corpo malformado.
app.use('/api', (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'JSON inválido.' });
  }
  console.error(err);
  return res.status(500).json({ message: 'Erro interno do servidor.' });
});

function start() {
  return initDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log('Usuário de teste: usuario@email.com | Senha: 123456');
    });
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Erro ao iniciar banco de dados:', error);
    process.exit(1);
  });
}

module.exports = { app, start };

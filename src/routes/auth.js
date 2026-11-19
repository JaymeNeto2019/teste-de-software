const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { get } = require('../db');
const { JWT_SECRET } = require('../middleware/auth');

const { validateCredentials } = require('../utils/validators');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body || {};

    if (!validateCredentials(email, senha)) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    const user = await get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const validPassword = await bcrypt.compare(senha, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '2h'
    });

    return res.json({ message: 'Login realizado com sucesso.', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

module.exports = router;

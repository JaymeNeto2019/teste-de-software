const express = require('express');
const { all, get, run } = require('../db');
const { validateEvent } = require('../utils/validators');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await all('SELECT * FROM events ORDER BY data ASC, horario ASC');
    return res.json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao consultar eventos.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await get('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (!event) return res.status(404).json({ message: 'Evento não encontrado.' });
    return res.json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao consultar evento.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const validation = validateEvent(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.errors[0], errors: validation.errors });
    }

    const { nome, descricao = '', data, horario, local, vagas, status } = req.body;
    const result = await run(
      `INSERT INTO events (nome, descricao, data, horario, local, vagas, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome.trim(), descricao.trim(), data, horario, local.trim(), Number(vagas), status.trim()]
    );

    const created = await get('SELECT * FROM events WHERE id = ?', [result.id]);
    return res.status(201).json({ message: 'Evento cadastrado com sucesso.', event: created });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao cadastrar evento.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const existing = await get('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ message: 'Evento não encontrado.' });

    const validation = validateEvent(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.errors[0], errors: validation.errors });
    }

    const { nome, descricao = '', data, horario, local, vagas, status } = req.body;
    await run(
      `UPDATE events
       SET nome = ?, descricao = ?, data = ?, horario = ?, local = ?, vagas = ?, status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [nome.trim(), descricao.trim(), data, horario, local.trim(), Number(vagas), status.trim(), req.params.id]
    );

    const updated = await get('SELECT * FROM events WHERE id = ?', [req.params.id]);
    return res.json({ message: 'Evento atualizado com sucesso.', event: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar evento.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const existing = await get('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ message: 'Evento não encontrado.' });

    await run('DELETE FROM events WHERE id = ?', [req.params.id]);
    return res.json({ message: 'Evento excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao excluir evento.' });
  }
});

module.exports = router;

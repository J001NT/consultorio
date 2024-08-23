const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require('../db'); // Importar la conexión a la base de datos

// Obtener todos los bloqueos de horarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM bloqueos_de_horarios', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Añadir un nuevo bloqueo de horario
router.post('/', (req, res) => {
  const { id_profesional, fecha_hora_inicio, fecha_hora_fin, motivo } = req.body;
  db.query('INSERT INTO bloqueos_de_horarios (id_profesional, fecha_hora_inicio, fecha_hora_fin, motivo) VALUES (?, ?, ?, ?)',
    [id_profesional, fecha_hora_inicio, fecha_hora_fin, motivo],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  );
});

// Eliminar un bloqueo de horario
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM bloqueos_de_horarios WHERE id_bloqueo = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) return res.status(404).send('Bloqueo de horario no encontrado');
    res.status(204).send();
  });
});

module.exports = router;

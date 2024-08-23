const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los turnos
router.get('/', (req, res) => {
  db.query('SELECT * FROM Turnos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Obtener un turno por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Turnos WHERE id_turno = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Turno no encontrado');
    res.json(results[0]);
  });
});

// Añadir un nuevo turno
router.post('/', (req, res) => {
  const { id_profesional, id_paciente, fecha_hora, estado, observaciones } = req.body;
  db.query('INSERT INTO Turnos (id_profesional, id_paciente, fecha_hora, estado, observaciones) VALUES (?, ?, ?, ?, ?)',
    [id_profesional, id_paciente, fecha_hora, estado, observaciones],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  );
});

// Actualizar un turno
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { id_profesional, id_paciente, fecha_hora, estado, observaciones } = req.body;
  db.query('UPDATE Turnos SET id_profesional = ?, id_paciente = ?, fecha_hora = ?, estado = ?, observaciones = ? WHERE id_turno = ?',
    [id_profesional, id_paciente, fecha_hora, estado, observaciones, id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.affectedRows === 0) return res.status(404).send('Turno no encontrado');
      res.json({ id, ...req.body });
    }
  );
});

// Eliminar un turno
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Turnos WHERE id_turno = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) return res.status(404).send('Turno no encontrado');
    res.status(204).send();
  });
});

module.exports = router;

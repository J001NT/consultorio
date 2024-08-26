const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los pacientes
router.get('/', (req, res) => {
  db.query('SELECT * FROM Pacientes', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Obtener un paciente por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Pacientes WHERE id_paciente = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Paciente no encontrado');
    res.json(results[0]);
  });
});

// Añadir un nuevo paciente
router.post('/', (req, res) => {
  const { nombre, apellido, obra_social, diagnostico, servicio = 'fisioterapia' } = req.body;
  db.query('INSERT INTO Pacientes (nombre, apellido, obra_social, diagnostico, servicio) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, obra_social, diagnostico, servicio],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  );
});

// Actualizar un paciente
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, obra_social, diagnostico, servicio } = req.body;
  db.query('UPDATE Pacientes SET nombre = ?, apellido = ?, obra_social = ?, diagnostico = ?, servicio = ? WHERE id_paciente = ?',
    [nombre, apellido, obra_social, diagnostico, servicio, id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.affectedRows === 0) return res.status(404).send('Paciente no encontrado');
      res.json({ id, ...req.body });
    }
  );
});

// Eliminar un paciente
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Pacientes WHERE id_paciente = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) return res.status(404).send('Paciente no encontrado');
    res.status(204).send();
  });
});

module.exports = router;

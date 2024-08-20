const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'consultorio'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL.');
});

// Rutas para Pacientes

// Obtener todos los pacientes
router.get('/pacientes', (req, res) => {
  db.query('SELECT * FROM Pacientes', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Obtener un paciente por ID
router.get('/pacientes/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Pacientes WHERE id_paciente = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Paciente no encontrado');
    res.json(results[0]);
  });
});

// Añadir un nuevo paciente
router.post('/pacientes', (req, res) => {
  const { nombre, apellido, obra_social, diagnostico, servicio } = req.body;
  db.query('INSERT INTO Pacientes (nombre, apellido, obra_social, diagnostico, servicio) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, obra_social, diagnostico, servicio],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  );
});

// Actualizar un paciente
router.put('/pacientes/:id', (req, res) => {
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
router.delete('/pacientes/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Pacientes WHERE id_paciente = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) return res.status(404).send('Paciente no encontrado');
    res.status(204).send();
  });
});

// Rutas para Turnos

// Obtener todos los turnos
router.get('/turnos', (req, res) => {
  db.query('SELECT * FROM Turnos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Obtener un turno por ID
router.get('/turnos/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Turnos WHERE id_turno = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Turno no encontrado');
    res.json(results[0]);
  });
});

// Añadir un nuevo turno
router.post('/turnos', (req, res) => {
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
router.put('/turnos/:id', (req, res) => {
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
router.delete('/turnos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Turnos WHERE id_turno = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) return res.status(404).send('Turno no encontrado');
    res.status(204).send();
  });
});

// Rutas para Bloqueos de Horarios

// Obtener todos los bloqueos de horarios
router.get('/bloqueos', (req, res) => {
  db.query('SELECT * FROM Bloqueos_Horarios', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Añadir un nuevo bloqueo de horario
router.post('/bloqueos', (req, res) => {
  const { id_profesional, fecha_hora_inicio, fecha_hora_fin, motivo } = req.body;
  db.query('INSERT INTO Bloqueos_Horarios (id_profesional, fecha_hora_inicio, fecha_hora_fin, motivo) VALUES (?, ?, ?, ?)',
    [id_profesional, fecha_hora_inicio, fecha_hora_fin, motivo],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  );
});

// Eliminar un bloqueo de horario
router.delete('/bloqueos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Bloqueos_Horarios WHERE id_bloqueo = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) return res.status(404).send('Bloqueo de horario no encontrado');
    res.status(204).send();
  });
});

module.exports = router;

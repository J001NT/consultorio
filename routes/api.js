const express = require('express');
const router = express.Router();
const pacientesRouter = require('./pacientes');
const turnosRouter = require('./turnos');
const bloqueosRouter = require('./bloqueos');

// Usar rutas de pacientes, turnos y bloqueos
router.use('/pacientes', pacientesRouter);
router.use('/turnos', turnosRouter);
router.use('/bloqueos', bloqueosRouter);

module.exports = router;

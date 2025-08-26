const express = require('express');
const router = express.Router();

const alumnoController = require('../controllers/alumnoController');

router.post('/', alumnoController.registrarAlumno);
router.get('/lista-alumnos', alumnoController.obtenerAlumnos);
router.get('/alumno-por-email', alumnoController.buscarAlumno);
router.delete('/:id', alumnoController.eliminarAlumno);
router.put('/actualizar-alumno/:id', alumnoController.actualizarAlumno);

module.exports = router;
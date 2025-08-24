const express = require('express');
const cors = require('cors');
const alumnosRoutes = require('./routes/alumnos');

const app = express();

// Middleware para forzar el charset UTF-8 en todas las respuestas JSON
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use('/api/alumnos', alumnosRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () =>
console.log(`Servidor corriendo en http://localhost:${PORT}`));
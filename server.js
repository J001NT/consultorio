const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const apiRoutes = require('./routes/api'); // Importar rutas de la API
const app = express();
const port = 3000;

// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'consultorio'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL.');
});

// Usar las rutas de la API
app.use('/api', apiRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Inicializar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

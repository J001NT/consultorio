const mysql = require('mysql2');

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',         // Reemplaza con tu usuario de MySQL
    password: '',         // Reemplaza con tu contraseña de MySQL
    database: 'consultorio'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL.');
  });
  

module.exports = db;

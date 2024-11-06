const sqlite3 = require('sqlite3').verbose();
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Crear o conectar a la base de datos
let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Crear la tabla de usuarios si no existe
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
)`);

// Ruta para manejar las solicitudes POST
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        db.run(`INSERT INTO usuarios (username, password) VALUES (?, ?)`, [username, password], function(err) {
            if (err) {
                console.error('Error al insertar datos:', err.message);
                res.status(500).send('Error en el servidor');
            } else {
                res.send('Usuario registrado con éxito');
            }
        });
    } else {
        res.status(400).send('Faltan datos');
    }
});

module.exports = app;

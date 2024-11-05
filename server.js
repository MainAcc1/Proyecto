// Importar las dependencias necesarias
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

// Configurar la aplicación Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta de registro de usuario
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Guardar los datos del usuario en un archivo de texto (en texto plano)
    const userData = `Usuario: ${username}, Contraseña: ${password}\n`;

    // Escribir los datos en el archivo
    fs.appendFileSync('usuarios.txt', userData, (err) => {
        if (err) throw err;
    });

    res.send('Usuario registrado y datos guardados localmente (de forma no segura)');
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://79.117.245.212:3000');
});

const sqlite3 = require('sqlite3').verbose();

// Manejo de la función serverless en Vercel
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        // Método no permitido
        res.status(405).json({ message: 'Método no permitido' });
        return;
    }

    // Datos obtenidos del cuerpo de la solicitud
    const { username, password } = req.body;

    if (!username || !password) {
        // Verificación de entrada básica
        res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
        return;
    }

    // Conectar a la base de datos SQLite
    const db = new sqlite3.Database('./database.db', (err) => {
        if (err) {
            console.error('Error al conectar con la base de datos:', err.message);
            res.status(500).json({ message: 'Error en la conexión a la base de datos' });
            return;
        }
    });

    // Consulta para insertar datos de usuario
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

    db.run(query, [username, password], function (err) {
        if (err) {
            console.error('Error al insertar datos en la base de datos:', err.message);
            res.status(500).json({ message: 'Error al guardar los datos' });
        } else {
            res.status(200).json({ message: 'Usuario registrado exitosamente' });
        }
        // Cerrar la conexión a la base de datos
        db.close((err) => {
            if (err) {
                console.error('Error al cerrar la conexión de la base de datos:', err.message);
            }
        });
    });
}

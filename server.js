const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./basedatos.db');

// Middleware para habilitar CORS
// Aquí, puedes especificar qué dominios pueden hacer solicitudes si es necesario. Para permitir todos los dominios:
app.use(cors());

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(bodyParser.json());

// Ruta para la raíz del servidor
app.get('/', (req, res) => {
    res.send('Bienvenido a mi página de reservas');
});

// Ruta para recibir la solicitud POST y guardar los datos en la base de datos
app.post('/reservar', (req, res) => {
    const { nombre, fechaEntrada, fechaSalida, tipoHabitacion } = req.body;

    // Verificar que todos los campos estén presentes
    if (!nombre || !fechaEntrada || !fechaSalida || !tipoHabitacion) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }

    // Insertar los datos en la base de datos
    const sql = 'INSERT INTO reservas (nombre, fecha_entrada, fecha_salida, tipo_habitacion) VALUES (?, ?, ?, ?)';
    db.run(sql, [nombre, fechaEntrada, fechaSalida, tipoHabitacion], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Reserva realizada correctamente', id: this.lastID });
    });
});

// Ruta para obtener todas las reservas
app.get('/reservas', (req, res) => {
    const sql = 'SELECT * FROM reservas';  // Consulta SQL para obtener todas las reservas

    // Ejecutar la consulta en la base de datos
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });  // Si ocurre un error, responde con el error
        }
        res.status(200).json({ reservas: rows });  // Si todo está bien, responde con las reservas en formato JSON
    });
});

// Usar el puerto proporcionado por Render, o 3000 si no está disponible
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


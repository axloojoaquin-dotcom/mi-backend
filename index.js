const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a Aiven
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

// Ruta que inserta un registro y devuelve el total
app.get('/api/visita', (req, res) => {
  db.query('INSERT INTO visitas () VALUES ()', (err) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.query('SELECT COUNT(*) as total FROM visitas', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: '¡Conexión exitosa a la base de datos!', totalVisitas: rows[0].total });
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
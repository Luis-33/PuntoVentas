// importamos las dependencias
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express(); // esto crea la aplicacion, reprecenta el servidor completo

app.use(morgan('dev')); //registra las peticiones
app.use(cors()); // permite las peticiones desde cualquier lado
app.use(express.json()); // convierte los datos json

// rutas (después)
// endpoint prueba
app.get('/', (req, res) => {
  res.send('API Ventas funcionando');
});

module.exports = app;

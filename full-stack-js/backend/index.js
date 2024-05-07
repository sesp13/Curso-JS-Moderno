// Leer variables de entorno con dotenv
import 'dotenv/config';
import express from 'express';
import conectarDB from './config/db.js';

const PORT = process.env.PORT;
const app = express();

conectarDB();

app.use('/', (req, res) => {
  res.send('Hola mundo');
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});

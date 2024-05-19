// Leer variables de entorno con dotenv

import 'dotenv/config';

import conectarDB from './config/db.js';
import express from 'express';
import veterinarioRoutes from './routes/veterinarioRoutes.js';

const PORT = process.env.PORT;
const app = express();
// Habilitar lectura de json en las requests
app.use(express.json());

conectarDB();

// Declaración de rutas
app.use('/api/veterinarios', veterinarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});

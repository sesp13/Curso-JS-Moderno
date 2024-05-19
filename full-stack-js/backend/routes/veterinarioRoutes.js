import { perfil, registrar } from '../controllers/VeterinarioController.js';

import express from 'express';

// Base Route: /api/veterinarios
const router = express.Router();

router.post('/', registrar);

router.get('/perfil', perfil);

export default router;

import { Router } from 'express';
import marcaController from '../controllers/marcaController.mjs';
const router = Router();

// Rutas para marcas
router.get('/', marcaController.getMarcas);


export default router;
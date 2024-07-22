// clientes.routes.mjs
import { Router } from 'express';
import ClienteController from '../controllers/Clientes/ClienteController.mjs';

const router = Router();

// Rutas para clientes
router.get('/', ClienteController.getClientes);
router.get('/:id', ClienteController.getById);
router.post('/', ClienteController.post);
router.put('/:id', ClienteController.put);
router.delete('/:id', ClienteController.delete);

export default router;

// cliente.routes.mjs
import { Router } from 'express';
import ClienteController from '../controllers//Clientes/ClienteController.mjs';
import checkAuth from '../middleware/checkAuth.mjs';

const router = Router();

router.get('/',  ClienteController.getClientes);
router.post('/', ClienteController.post);
router.put('/:id', ClienteController.put);
router.delete('/:id', ClienteController.delete);

export default router;

import {Router} from 'express';
import seguimientoController from '../controllers/Cotizaciones/seguimientoController.mjs';

const router = Router();

router.get('/:id', seguimientoController.getSeguimientosById);
router.post('/', seguimientoController.post);
router.put('/', seguimientoController.put);
router.delete('/:id', seguimientoController.delete);
export default router;
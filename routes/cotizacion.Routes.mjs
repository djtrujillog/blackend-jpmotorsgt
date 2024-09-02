import { Router } from 'express';
import cotizacionController from '../controllers/Cotizaciones/cotizacionController.mjs';

const router = Router();

// Routes
router.get('/',  cotizacionController.getCotizaciones);
router.get('/:id', cotizacionController.getCotizacionById);
router.get('/byEmpleadoId/:id', cotizacionController.getCotizacionesByEmpleado);
router.get('/byVehiculoId/:id', cotizacionController.getCotizacionesByVehiculo);
router.get('/byEstado/:estado', cotizacionController.getCotizacionesByEstado);
router.post('/',  cotizacionController.post);
router.put('/', cotizacionController.put);
router.delete('/:id', cotizacionController.delete);
// Update and delete routes need to be added in your controller if you need them

export default router;
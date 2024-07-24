import { Router } from 'express';
import cotizacionController from '../controllers/cotizacionController.mjs';
import checkAuth from '../middleware/checkAuth.mjs';

const router = Router();

// Routes
router.get('/',  cotizacionController.getCotizaciones);
router.post('/',  cotizacionController.postCotizaciones);
// Update and delete routes need to be added in your controller if you need them

export default router;

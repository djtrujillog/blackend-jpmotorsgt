import {Router } from 'express';
import cotizacionController from '../controllers/cotizacionController.mjs';
const router = Router();

//Routes
router.get('/', cotizacionController.getCotizaciones);
router.post('/', cotizacionController.postCotizaciones,);

export default router;
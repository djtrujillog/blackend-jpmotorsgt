// dashboard.routes.mjs
import { Router } from 'express';
import cotizacionController from '../controllers/cotizacionController.mjs';
import checkAuth from '../middleware/checkAuth.mjs';

const router = Router();

router
    .route('/')
    .get(checkAuth.checkAuth, cotizacionController.getCotizaciones);

export default router;

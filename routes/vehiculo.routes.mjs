import { Router } from "express";
import vehiculoController from "../controllers/vehiculoController.mjs";
const router = Router();


// Rutas para vehículos
router.get("/", vehiculoController.getVehiculos);
router.get('/detalle/:id', vehiculoController.getVehiculoDetalle);
router.get('/porMarca', vehiculoController.getVehiculosPorMarca);
router.get('/:id', vehiculoController.getVehiculoPorID);

export default router;
// empleados.routes.mjs
import { Router } from 'express';
import EmpleadoController from "../controllers/Empleados/EmpleadoController.mjs";

const router = Router();

// Rutas para empleados
router.get('/', EmpleadoController.getEmpleado); // Ajustar el nombre del método
router.get('/:id', EmpleadoController.getById);
router.post('/', EmpleadoController.post);
router.put('/:id', EmpleadoController.put);
router.delete('/:id', EmpleadoController.delete);

export default router;

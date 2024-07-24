import { Router } from 'express';
import EmpleadoController from '../controllers/Empleados/EmpleadoController.mjs';
import checkAuth from '../middleware/checkAuth.mjs';

const router = Router();

router.get('/roles', EmpleadoController.getRoles); // Ruta específica para obtener roles
router.get('/', EmpleadoController.getEmpleado); // Ruta para obtener todos los empleados
router.get('/:id', EmpleadoController.getById); // Ruta específica para obtener empleado por ID
router.get('/:id/roles', EmpleadoController.getRolesByEmpleadoId); // Ruta específica para obtener roles de un empleado
router.post('/', EmpleadoController.post);
router.put('/:id', EmpleadoController.put);
router.delete('/:id', EmpleadoController.delete);
router.post('/asignar-rol', EmpleadoController.asignarRoles);

export default router;

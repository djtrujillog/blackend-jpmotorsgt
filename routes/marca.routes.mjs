import express from 'express';
import multer from 'multer'; // Asegúrate de importar multer
import marcaController from '../controllers/Marcas/marcaController.mjs';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rutas para manejar las marcas
router.post('/', upload.single('logo'), marcaController.guardarMarca);
router.put('/:id/logo', upload.single('logo'), marcaController.put);
router.delete('/:id', marcaController.eliminarMarca);
// Otras rutas según sea necesario
router.get('/', marcaController.getMarcas);
router.get('/:id', marcaController.getMarcaById);
router.get('/nombre/:nombre', marcaController.getMarcaByNombre);

export default router;

import { Router } from "express";
<<<<<<< HEAD
import vehiculoController from "../controllers/vehiculoController.mjs";
const router = Router();


// Rutas para vehículos
router.get("/", vehiculoController.getVehiculos);
router.get('/detalle/:id', vehiculoController.getVehiculoDetalle);
router.get('/porMarca', vehiculoController.getVehiculosPorMarca);
router.get('/:id', vehiculoController.getVehiculoPorID);

export default router;
=======
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Importar controladores
import vehiculoController from "../controllers/vehicleController.mjs";
import detalleMotorController from "../controllers/detalleMotorController.mjs";
import detalleDimensionesController from "../controllers/detalleDimensionesController.mjs";
import detalleExteriorController from "../controllers/detalleExteriorController.mjs";
import detalleInteriorController from "../controllers/detalleInteriorController.mjs";
import detalleSeguridadController from "../controllers/detalleSeguridadController.mjs";

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar multer para manejar la subida de archivos
const storage = multer.memoryStorage();  // Usar memoria para almacenar archivos temporalmente
const upload = multer({ storage: storage });

const router = Router();

// Rutas para vehículos
router.get("/", vehiculoController.getVehiculos);
router.get("/motor/:id", vehiculoController.getVehiculoMotor);
router.get("/seguridad/:id", vehiculoController.getVehiculoSeguridad);
router.get("/interior/:id", vehiculoController.getVehiculoInterior);
router.get("/exterior/:id", vehiculoController.getVehiculoExterior);
router.get("/dimensiones/:id", vehiculoController.getVehiculoDimensiones);
router.get("/porMarca", vehiculoController.getVehiculosPorMarca);
router.get("/:id", vehiculoController.getVehiculoPorID);
router.post("/", upload.single("file"), vehiculoController.post);
router.put("/:id", upload.single("file"), vehiculoController.put);
router.delete("/:VehiculoID", vehiculoController.delete);

// Rutas para detalleDimensiones
router.get("/detalleDimensiones", detalleDimensionesController.getAll);
router.get("/detalleDimensiones/:VehiculoID", detalleDimensionesController.getByVehiculoID);
router.post("/detalleDimensiones", detalleDimensionesController.create);
router.put('/detalleDimensiones/:descripcion', detalleDimensionesController.put);
router.post('/borrarDimensiones', detalleDimensionesController.delete);

// Rutas para detalleExterior
router.get("/detalleExterior", detalleExteriorController.getAll);
router.get("/detalleExterior/:VehiculoID", detalleExteriorController.getByVehiculoID);
router.post("/detalleExterior", detalleExteriorController.create);
router.put("/detalleExterior/:Descripcion", detalleExteriorController.put);
router.post("/eliminarExterior", detalleExteriorController.post);

// Rutas para interior
router.get("/detalleInterior", detalleInteriorController.getAll);
router.get("/detalleInterior/:VehiculoID", detalleInteriorController.getByVehiculoID);
router.post("/detalleInterior", detalleInteriorController.create);
router.put("/detalleInterior/:VehiculoID", detalleInteriorController.put);
router.post("/eliminarInterior", detalleInteriorController.post);

// Rutas para detalleMotor
router.get("/detalleMotor", detalleMotorController.getAll);
router.get("/detalleMotor/:VehiculoID", detalleMotorController.getByVehiculoID);
router.post("/detalleMotor", detalleMotorController.create);
router.put("/detalleMotor/:VehiculoID", detalleMotorController.put);
router.post("/eliminarMotor", detalleMotorController.post);

// Rutas para detalleSeguridad
router.get("/detalleSeguridad", detalleSeguridadController.getAll);
router.get("/detalleSeguridad/:VehiculoID", detalleSeguridadController.getByVehiculoID);
router.post("/detalleSeguridad", detalleSeguridadController.create);
router.put("/detalleSeguridad/:VehiculoID", detalleSeguridadController.put);
router.post("/eliminarSeguridad", detalleSeguridadController.post);

export default router;
>>>>>>> 77a15bd (Initial commit)

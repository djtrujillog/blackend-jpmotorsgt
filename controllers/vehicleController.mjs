<<<<<<< HEAD
import express from "express";
import multer from "multer";
import sequelize from "../config/config.mjs";

const vehiculosRouter = express.Router();
vehiculosRouter.use(express.urlencoded({ extended: true }));
vehiculosRouter.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./JpMotor/Images/nuevos/"); // Ajusta la ruta según sea necesario
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const vehiculoController = {
  // Método para obtener todos los vehículos
  getVehiculos: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM Vehiculos", {
        type: sequelize.QueryTypes.SELECT
=======
import fs from 'fs/promises';
import path from 'path';
import sequelize from '../config/config.mjs'; 


const vehiculoController = {
  getVehiculos: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM Vehiculos", {
        type: sequelize.QueryTypes.SELECT,
>>>>>>> 77a15bd (Initial commit)
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay vehículos" });
      }
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

<<<<<<< HEAD
  // Método para obtener el detalle de un vehículo por ID usando un procedimiento almacenado
  getVehiculoDetalle: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL ConsultaCompletaPorID(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
=======
  getVehiculoMotor: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetMotorDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
>>>>>>> 77a15bd (Initial commit)
      });

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }
<<<<<<< HEAD
      res.json(result[0][0]);
=======

      const descriptionsObject = result[0];
      const motorDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Motor: motorDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoSeguridad: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetSeguridadDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length === 0) {
        res.status(404).send("Detalles no encontrados");
        return;
      }

      const descriptionsObject = result[0];
      const seguridadDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Seguridad: seguridadDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoInterior: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetInteriorDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }

      const descriptionsObject = result[0];
      const interiorDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Interior: interiorDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoExterior: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetExteriorDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }

      const descriptionsObject = result[0];
      const exteriorDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Exterior: exteriorDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoDimensiones: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query(
        "CALL GetDimensionesDescription(:id)",
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }

      const descriptionsObject = result[0];
      const dimensionesDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Dimensiones: dimensionesDescriptions });
>>>>>>> 77a15bd (Initial commit)
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

<<<<<<< HEAD
  // Método para obtener vehículos por marca
=======
>>>>>>> 77a15bd (Initial commit)
  getVehiculosPorMarca: async (req, res) => {
    try {
      const { marca } = req.query;
      let result = [];
<<<<<<< HEAD
      if (marca === 'all') {
        result = await sequelize.query("SELECT * FROM Vehiculos", {
          type: sequelize.QueryTypes.SELECT
=======
      if (marca === "all") {
        result = await sequelize.query("SELECT * FROM Vehiculos", {
          type: sequelize.QueryTypes.SELECT,
>>>>>>> 77a15bd (Initial commit)
        });
      } else {
        result = await sequelize.query(
          `SELECT V.VehiculoID, V.Modelo, V.Marca, V.Anio, V.PrecioGerente, 
          V.PrecioWeb, V.PrecioLista, V.Imagen, V.MarcaID 
          FROM Vehiculos V 
          INNER JOIN Marca M ON V.MarcaID = M.MarcaID 
<<<<<<< HEAD
          WHERE M.MarcaID = :marca`, 
=======
          WHERE M.MarcaID = :marca`,
>>>>>>> 77a15bd (Initial commit)
          { replacements: { marca }, type: sequelize.QueryTypes.SELECT }
        );
      }
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
<<<<<<< HEAD
        res.status(404).json({ message: "No hay vehículos de esa marca" });
      }
    } catch (error) {
      console.error("Error al obtener los vehículos de la marca:", error);
=======
        res.status(404).json({ message: "No se encontraron vehículos para esta marca" });
      }
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
>>>>>>> 77a15bd (Initial commit)
      res.status(500).send("Error interno del servidor");
    }
  },

<<<<<<< HEAD
  // Método para obtener un vehículo por su ID
  getVehiculoPorID: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("SELECT * FROM Vehiculos WHERE VehiculoID = :id", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
      });

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }
=======
  getVehiculoPorID: async (req, res) => {
    const { id } = req.params;

    try {
      // Consultar el vehículo por ID desde la base de datos
      const result = await sequelize.query(
        "SELECT * FROM Vehiculos WHERE VehiculoID = :id",
        { replacements: { id }, type: sequelize.QueryTypes.SELECT }
      );

      // Si no se encuentra el vehículo, retornar un error 404
      if (result.length === 0) {
        return res.status(404).send("Vehículo no encontrado");
      }

      // Enviar el vehículo en crudo al cliente
>>>>>>> 77a15bd (Initial commit)
      res.json(result[0]);
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
<<<<<<< HEAD
  }
=======
  },

  post: async (req, res) => {
    try {
      const { body, file } = req;
      const imagenBuffer = file.buffer;  // Obtener el buffer del archivo

      // Guardar el buffer de la imagen en la base de datos junto con otros datos del vehículo
      const result = await sequelize.query(
        `INSERT INTO Vehiculos (Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, Imagen, MarcaID)
        VALUES (:Modelo, :Marca, :Anio, :PrecioGerente, :PrecioWeb, :PrecioLista, :Imagen, :MarcaID)`,
        {
          replacements: {
            Modelo: body.Modelo,
            Marca: body.Marca,
            Anio: body.Anio,
            PrecioGerente: body.PrecioGerente,
            PrecioWeb: body.PrecioWeb,
            PrecioLista: body.PrecioLista,
            Imagen: imagenBuffer,
            MarcaID: body.MarcaID,
          },
        }
      );

      res.status(201).json({ message: "Vehículo creado con éxito", id: result[0] });
    } catch (error) {
      console.error("Error al crear vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  put: async (req, res) => {
    try {
      const { id } = req.params;
      const { body, file } = req;
      const imagenBuffer = file ? file.buffer : null;

      // Actualizar los datos del vehículo en la base de datos
      const result = await sequelize.query(
        `UPDATE Vehiculos SET 
          Modelo = :Modelo, 
          Marca = :Marca, 
          Anio = :Anio, 
          PrecioGerente = :PrecioGerente, 
          PrecioWeb = :PrecioWeb, 
          PrecioLista = :PrecioLista, 
          Imagen = IFNULL(:Imagen, Imagen), 
          MarcaID = :MarcaID 
        WHERE VehiculoID = :id`,
        {
          replacements: {
            Modelo: body.Modelo,
            Marca: body.Marca,
            Anio: body.Anio,
            PrecioGerente: body.PrecioGerente,
            PrecioWeb: body.PrecioWeb,
            PrecioLista: body.PrecioLista,
            Imagen: imagenBuffer,
            MarcaID: body.MarcaID,
            id: id,
          },
        }
      );

      res.json({ message: "Vehículo actualizado con éxito" });
    } catch (error) {
      console.error("Error al actualizar vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  delete: async (req, res) => {
    try {
      const { VehiculoID } = req.params;
      await sequelize.query("DELETE FROM Vehiculos WHERE VehiculoID = :VehiculoID", {
        replacements: { VehiculoID },
      });

      res.status(200).json({ message: "Vehículo eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
>>>>>>> 77a15bd (Initial commit)
};

export default vehiculoController;

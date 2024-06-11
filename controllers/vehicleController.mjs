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

  // Método para obtener el detalle de un vehículo por ID usando un procedimiento almacenado
  getVehiculoDetalle: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL ConsultaCompletaPorID(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
      });

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }
      res.json(result[0][0]);
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Método para obtener vehículos por marca
  getVehiculosPorMarca: async (req, res) => {
    try {
      const { marca } = req.query;
      let result = [];
      if (marca === 'all') {
        result = await sequelize.query("SELECT * FROM Vehiculos", {
          type: sequelize.QueryTypes.SELECT
        });
      } else {
        result = await sequelize.query(
          `SELECT V.VehiculoID, V.Modelo, V.Marca, V.Anio, V.PrecioGerente, 
          V.PrecioWeb, V.PrecioLista, V.Imagen, V.MarcaID 
          FROM Vehiculos V 
          INNER JOIN Marca M ON V.MarcaID = M.MarcaID 
          WHERE M.MarcaID = :marca`, 
          { replacements: { marca }, type: sequelize.QueryTypes.SELECT }
        );
      }
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay vehículos de esa marca" });
      }
    } catch (error) {
      console.error("Error al obtener los vehículos de la marca:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

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
      res.json(result[0]);
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
};

export default vehiculoController;

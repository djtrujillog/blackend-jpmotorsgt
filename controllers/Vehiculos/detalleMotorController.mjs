import sequelize from "../../config/config.mjs";

const detalleMotorController = {
  // Obtener todas las descripciones de motores
  getAll: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM motor", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay detalles de motores" });
      }
    } catch (error) {
      console.error("Error al obtener detalles de motores:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Obtener una descripción de motor por ID de vehículo
  getByVehiculoID: async (req, res) => {
    try {
      const { VehiculoID } = req.params;
      const result = await sequelize.query(
        "SELECT * FROM motor WHERE VehiculoID = :VehiculoID",
        {
          replacements: { VehiculoID },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (result.length === 0) {
        res.status(404).send("Descripción del motor no encontrada");
        return;
      }

      res.json(result);
    } catch (error) {
      console.error("Error al obtener la descripción del motor:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Crear una nueva descripción de motor
  create: async (req, res) => {
    const { VehiculoID, Descripcion } = req.body;

    try {
      const query = `
        INSERT INTO motor (VehiculoID, Descripcion) 
        VALUES (?, ?)
      `;

      const result = await sequelize.query(query, {
        replacements: [VehiculoID, Descripcion],
        type: sequelize.QueryTypes.INSERT,
      });

      res.json({
        message: "Descripción del motor agregada con éxito",
        detalleMotor: {
          VehiculoID,
          Descripcion
        },
      });
    } catch (error) {
      console.error("Error al agregar la descripción del motor:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Actualizar una descripción de motor existente
  put: async (req, res) => {
    const { VehiculoID, Descripcion, originalDescripcion } = req.body;

    try {
      const query = `
        UPDATE motor 
        SET Descripcion = :Descripcion 
        WHERE VehiculoID = :VehiculoID AND Descripcion = :originalDescripcion
      `;

      const result = await sequelize.query(query, {
        replacements: {
          Descripcion,
          VehiculoID,
          originalDescripcion,
        },
        type: sequelize.QueryTypes.UPDATE,
      });

      if (result[1] > 0) {
        res.json({ message: "Descripción del motor actualizada con éxito" });
      } else {
        res.status(404).json({ message: `No se encontró ningún detalle del motor con VehiculoID ${VehiculoID} y Descripcion ${originalDescripcion}` });
      }
    } catch (error) {
      console.error("Error al actualizar la descripción del motor:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Eliminar una descripción de motor
  post: async (req, res) => {
    const { VehiculoID, descripcion } = req.body;

    try {
      const query = `
        DELETE FROM motor 
        WHERE VehiculoID = :VehiculoID AND Descripcion = :descripcion
      `;

      await sequelize.query(query, {
        replacements: { VehiculoID, descripcion },
        type: sequelize.QueryTypes.DELETE,
      });

      res.json({ message: "Eliminación exitosa" });
    } catch (error) {
      console.error("Error al eliminar detalle motor:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

export default detalleMotorController;

import sequelize from "../../config/config.mjs";

const detalleInteriorController = {
  // Obtener todas las descripciones de interior
  getAll: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM interior", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay detalles de interior" });
      }
    } catch (error) {
      console.error("Error al obtener detalles de interior:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Obtener una descripción de interior por ID de vehículo
  getByVehiculoID: async (req, res) => {
    try {
      const { VehiculoID } = req.params;
      const result = await sequelize.query(
        "SELECT * FROM interior WHERE VehiculoID = :VehiculoID",
        {
          replacements: { VehiculoID },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (result.length === 0) {
        res.status(404).send("Descripción de interior no encontrada");
        return;
      }

      res.json(result);
    } catch (error) {
      console.error("Error al obtener la descripción de interior:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Crear una nueva descripción de interior
  create: async (req, res) => {
    const { VehiculoID, Descripcion } = req.body;

    try {
      const query = `
        INSERT INTO interior (VehiculoID, Descripcion) 
        VALUES (?, ?)
      `;

      const result = await sequelize.query(query, {
        replacements: [VehiculoID, Descripcion],
        type: sequelize.QueryTypes.INSERT,
      });

      res.json({
        message: "Descripción de interior agregada con éxito",
        detalleInterior: {
          VehiculoID,
          Descripcion
        },
      });
    } catch (error) {
      console.error("Error al agregar la descripción de interior:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Actualizar una descripción de interior existente
  put: async (req, res) => {
    const { VehiculoID, Descripcion, originalDescripcion } = req.body;

    try {
      const query = `
        UPDATE interior 
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
        res.json({ message: "Descripción de interior actualizada con éxito" });
      } else {
        res.status(404).json({ message: `No se encontró ningún detalle de interior con VehiculoID ${VehiculoID} y Descripcion ${originalDescripcion}` });
      }
    } catch (error) {
      console.error("Error al actualizar la descripción de interior:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Eliminar una descripción de interior
  post: async (req, res) => {
    const { VehiculoID, descripcion } = req.body;

    try {
      const query = `
        DELETE FROM interior 
        WHERE VehiculoID = :VehiculoID AND Descripcion = :descripcion
      `;

      await sequelize.query(query, {
        replacements: { VehiculoID, descripcion },
        type: sequelize.QueryTypes.DELETE,
      });

      res.json({ message: "Eliminación exitosa" });
    } catch (error) {
      console.error("Error al eliminar detalle interior:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

export default detalleInteriorController;

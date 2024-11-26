import sequelize from "../../config/config.mjs";

const detalleExteriorController = {
  // Obtener todas las descripciones de exterior
  getAll: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM exterior", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay detalles de exterior" });
      }
    } catch (error) {
      console.error("Error al obtener detalles de exterior:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Obtener una descripción de exterior por ID de vehículo
  getByVehiculoID: async (req, res) => {
    try {
      const { VehiculoID } = req.params;
      const result = await sequelize.query(
        "SELECT * FROM exterior WHERE VehiculoID = :VehiculoID",
        {
          replacements: { VehiculoID },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (result.length === 0) {
        res.status(404).send("Descripción de exterior no encontrada");
        return;
      }

      res.json(result);
    } catch (error) {
      console.error("Error al obtener la descripción de exterior:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Crear una nueva descripción de exterior
  create: async (req, res) => {
    const { VehiculoID, Descripcion } = req.body;

    try {
      const query = `
        INSERT INTO exterior (VehiculoID, Descripcion) 
        VALUES (?, ?)
      `;

      const result = await sequelize.query(query, {
        replacements: [VehiculoID, Descripcion],
        type: sequelize.QueryTypes.INSERT,
      });

      res.json({
        message: "Descripción de exterior agregada con éxito",
        detalleExterior: {
          VehiculoID,
          Descripcion
        },
      });
    } catch (error) {
      console.error("Error al agregar la descripción de exterior:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Actualizar una descripción de exterior existente
  put: async (req, res) => {
    const { VehiculoID, Descripcion, originalDescripcion } = req.body;

    try {
      const query = `
        UPDATE exterior 
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
        res.json({ message: "Descripción de exterior actualizada con éxito" });
      } else {
        res.status(404).json({ message: `No se encontró ningún detalle de exterior con VehiculoID ${VehiculoID} y Descripcion ${originalDescripcion}` });
      }
    } catch (error) {
      console.error("Error al actualizar la descripción de exterior:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

    // Eliminar una descripción de exterior
    post: async (req, res) => {
      const { VehiculoID, descripcion } = req.body;
  
      try {
        const query = `
          DELETE FROM exterior 
          WHERE VehiculoID = :VehiculoID AND Descripcion = :descripcion
        `;
  
        await sequelize.query(query, {
          replacements: { VehiculoID, descripcion },
          type: sequelize.QueryTypes.DELETE,
        });
  
        res.json({ message: "Eliminación exitosa" });
      } catch (error) {
        console.error("Error al eliminar detalle exterior:", error);
        res.status(500).json({ message: "Error interno del servidor" });
      }
    }
  };

export default detalleExteriorController;

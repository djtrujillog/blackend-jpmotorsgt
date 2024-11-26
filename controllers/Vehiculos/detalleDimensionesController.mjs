import sequelize from "../../config/config.mjs";

const detalleDimensionesController = {
  // Obtener todas las descripciones de dimensiones
  getAll: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM dimensiones", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay detalles de dimensiones" });
      }
    } catch (error) {
      console.error("Error al obtener detalles de dimensiones:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Obtener descripciones de dimensiones por ID de vehículo
  getByVehiculoID: async (req, res) => {
    try {
      const { VehiculoID } = req.params;
      const result = await sequelize.query(
        "SELECT Descripcion FROM dimensiones WHERE VehiculoID = :VehiculoID",
        {
          replacements: { VehiculoID },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (result.length === 0) {
        res.status(404).send("Descripción de dimensiones no encontrada");
        return;
      }

      const dimensiones = result.map(row => row.Descripcion);
      res.json({ Dimensiones: dimensiones });
    } catch (error) {
      console.error("Error al obtener la descripción de dimensiones:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Crear una nueva descripción de dimensiones
  create: async (req, res) => {
    const { VehiculoID, Descripcion } = req.body;

    try {
      const query = `
        INSERT INTO dimensiones (VehiculoID, Descripcion) 
        VALUES (?, ?)
      `;

      const result = await sequelize.query(query, {
        replacements: [VehiculoID, Descripcion],
        type: sequelize.QueryTypes.INSERT,
      });

      res.json({
        message: "Descripción de dimensiones agregada con éxito",
        detalleDimensiones: {
          VehiculoID,
          Descripcion
        },
      });
    } catch (error) {
      console.error("Error al agregar la descripción de dimensiones:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Actualizar una descripción de dimensiones existente
  put: async (req, res) => {
    const { VehiculoID, Descripcion, originalDescripcion } = req.body;
  
    try {
      const query = `
        UPDATE dimensiones 
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
        res.json({ message: "Descripción de dimensiones actualizada con éxito" });
      } else {
        res.status(404).json({ message: `No se encontró ningún detalle de dimensiones con VehiculoID ${VehiculoID} y Descripcion ${originalDescripcion}` });
      }
    } catch (error) {
      console.error("Error al actualizar la descripción de dimensiones:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
  
  
  
  
   // Eliminar una descripción de dimensiones por ID de vehículo y descripción
  delete: async (req, res) => {
    const { VehiculoID, descripcion } = req.body;
    console.log(`Delete request received with VehiculoID: ${VehiculoID}, descripcion: ${descripcion}`);

    try {
      const query = `
        DELETE FROM dimensiones 
        WHERE VehiculoID = ? AND Descripcion = ?
      `;

      console.log(`Executing query: ${query} with replacements [${VehiculoID}, ${descripcion}]`);

      await sequelize.query(query, {
        replacements: [VehiculoID, descripcion],
        type: sequelize.QueryTypes.DELETE,
      });

      res.json({ message: "Eliminación exitosa" });
    } catch (error) {
      console.error("Error al eliminar la descripción de dimensiones:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};

export default detalleDimensionesController;

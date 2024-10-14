import sequelize from "../../config/config.mjs";

const detalleGarantiacontroller = {
  // Obtener todas las descripciones de Garantia
  getAll: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM Garantia", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay detalles de Garantia" });
      }
    } catch (error) {
      console.error("Error al obtener detalles de Garantia:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Obtener descripciones de Garantia por ID de vehículo
  getByVehiculoID: async (req, res) => {
    try {
      const { VehiculoID } = req.params;
      const result = await sequelize.query(
        "SELECT Descripcion FROM Garantia WHERE VehiculoID = :VehiculoID",
        {
          replacements: { VehiculoID },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (result.length === 0) {
        res.status(404).send("Descripción de Garantia no encontrada");
        return;
      }

      const Garantia = result.map(row => row.Descripcion);
      res.json({ Garantia: Garantia });
    } catch (error) {
      console.error("Error al obtener la descripción de Garantia:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Crear una nueva descripción de Garantia
  create: async (req, res) => {
    const { VehiculoID, Descripcion } = req.body;

    try {
      const query = `
        INSERT INTO Garantia (VehiculoID, Descripcion) 
        VALUES (?, ?)
      `;

      const result = await sequelize.query(query, {
        replacements: [VehiculoID, Descripcion],
        type: sequelize.QueryTypes.INSERT,
      });

      res.json({
        message: "Descripción de Garantia agregada con éxito",
        detalleGarantia: {
          VehiculoID,
          Descripcion
        },
      });
    } catch (error) {
      console.error("Error al agregar la descripción de Garantia:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Actualizar una descripción de Garantia existente
  put: async (req, res) => {
    const { VehiculoID, Descripcion, originalDescripcion } = req.body;
  
    try {
      const query = `
        UPDATE Garantia 
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
        res.json({ message: "Descripción de Garantia actualizada con éxito" });
      } else {
        res.status(404).json({ message: `No se encontró ningún detalle de Garantia con VehiculoID ${VehiculoID} y Descripcion ${originalDescripcion}` });
      }
    } catch (error) {
      console.error("Error al actualizar la descripción de Garantia:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
  
  
  
  
   // Eliminar una descripción de Garantia por ID de vehículo y descripción
  delete: async (req, res) => {
    const { VehiculoID, descripcion } = req.body;
    console.log(`Delete request received with VehiculoID: ${VehiculoID}, descripcion: ${descripcion}`);

    try {
      const query = `
        DELETE FROM Garantia 
        WHERE VehiculoID = ? AND Descripcion = ?
      `;

      console.log(`Executing query: ${query} with replacements [${VehiculoID}, ${descripcion}]`);

      await sequelize.query(query, {
        replacements: [VehiculoID, descripcion],
        type: sequelize.QueryTypes.DELETE,
      });

      res.json({ message: "Eliminación exitosa" });
    } catch (error) {
      console.error("Error al eliminar la descripción de Garantia:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};

export default detalleGarantiacontroller;

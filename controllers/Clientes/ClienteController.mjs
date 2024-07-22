// ClienteController.mjs
import bcrypt from "bcrypt";
import sequelize from "../../config/config.mjs";

const ClienteController = {
  // Obtener todos los clientes
  getClientes: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM Clientes", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay clientes" });
      }
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Obtener un cliente por su ID
  getById: async (req, res) => {
    const id = req.params.id;
    try {
      const results = await sequelize.query(
        "SELECT * FROM Clientes WHERE ClienteID = ?",
        {
          replacements: [id],
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (results.length === 0) {
        res.status(404).send("Cliente no encontrado");
        return;
      }

      res.json(results[0]);
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Agregar un nuevo cliente
  post: async (req, res) => {
    const { Nombre, Apellido, Direccion, Telefono, CorreoElectronico, Estado, Documento, Nit } = req.body;
    try {
      const results = await sequelize.query(
        "INSERT INTO Clientes (Nombre, Apellido, Direccion, Telefono, CorreoElectronico, Estado, Documento, Nit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        {
          replacements: [Nombre, Apellido, Direccion, Telefono, CorreoElectronico, Estado, Documento, Nit],
          type: sequelize.QueryTypes.INSERT,
        }
      );

      res.json({ message: "Cliente agregado con éxito", results });
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Actualizar un cliente existente
  put: async (req, res) => {
    const id = req.params.id;
    const { Nombre, Apellido, Direccion, Telefono, CorreoElectronico, Estado, Documento, Nit } = req.body;
    try {
      const results = await sequelize.query(
        "UPDATE Clientes SET Nombre = ?, Apellido = ?, Direccion = ?, Telefono = ?, CorreoElectronico = ?, Estado = ?, Documento = ?, Nit = ? WHERE ClienteID = ?",
        {
          replacements: [Nombre, Apellido, Direccion, Telefono, CorreoElectronico, Estado, Documento, Nit, id],
          type: sequelize.QueryTypes.UPDATE,
        }
      );

      res.json({ message: "Cliente actualizado con éxito", results });
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  // Eliminar un cliente
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const results = await sequelize.query(
        "DELETE FROM Clientes WHERE ClienteID = ?",
        {
          replacements: [id],
          type: sequelize.QueryTypes.DELETE,
        }
      );

      res.json({ message: "Cliente eliminado con éxito", id });
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
};

export default ClienteController;

import bcrypt from 'bcrypt';
import sequelize from '../../config/config.mjs';

const EmpleadoController = {
  getEmpleado: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM Empleados", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay empleados" });
      }
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;
    try {
      const results = await sequelize.query("SELECT * FROM Empleados WHERE EmpleadoID = ?", {
        replacements: [id],
        type: sequelize.QueryTypes.SELECT
      });

      if (results.length === 0) {
        res.status(404).send("Empleado no encontrado");
        return;
      }

      res.json(results[0]);
    } catch (error) {
      console.error("Error al obtener el empleado:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getRolesByEmpleadoId: async (req, res) => {
    const id = req.params.id;
    try {
      const results = await sequelize.query(
        `SELECT roles.Nombre FROM roles
         INNER JOIN Empleado_roles ON roles.RolID = Empleado_roles.RolID
         WHERE Empleado_roles.EmpleadoID = ?`,
        {
          replacements: [id],
          type: sequelize.QueryTypes.SELECT
        }
      );

      if (results.length === 0) {
        res.status(404).send("Roles no encontrados para el empleado");
        return;
      }

      res.json(results);
    } catch (error) {
      console.error("Error al obtener roles del empleado:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  post: async (req, res) => {
    const { Usuario, Contrasena, Nombre, Apellido, Cargo, Telefono, CorreoElectronico, Estado } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Contrasena, salt);

      const results = await sequelize.query(
        `INSERT INTO Empleados (Usuario, ContrasenaHash, Nombre, Apellido, Cargo, Telefono, CorreoElectronico, Estado) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        {
          replacements: [Usuario.toLowerCase(), hashedPassword, Nombre, Apellido, Cargo, Telefono, CorreoElectronico, Estado],
          type: sequelize.QueryTypes.INSERT
        }
      );

      res.json({ message: 'Empleado agregado con éxito', results });
    } catch (error) {
      console.error('Error al agregar empleado:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  put: async (req, res) => {
    const id = req.params.id;
    const { Usuario, Contrasena, Nombre, Apellido, Cargo, Telefono, CorreoElectronico, Estado } = req.body;

    try {
      const empleadoActualizado = {
        Usuario: Usuario.toLowerCase(),
        Nombre,
        Apellido,
        Cargo,
        Telefono,
        CorreoElectronico,
        Estado
      };

      if (Contrasena) {
        const salt = await bcrypt.genSalt(10);
        empleadoActualizado.ContrasenaHash = await bcrypt.hash(Contrasena, salt);
      }

      const query = Contrasena
        ? `UPDATE Empleados SET Usuario = ?, ContrasenaHash = ?, Nombre = ?, Apellido = ?, Cargo = ?, Telefono = ?, CorreoElectronico = ?, Estado = ? WHERE EmpleadoID = ?`
        : `UPDATE Empleados SET Usuario = ?, Nombre = ?, Apellido = ?, Cargo = ?, Telefono = ?, CorreoElectronico = ?, Estado = ? WHERE EmpleadoID = ?`;

      const replacements = Contrasena
        ? [empleadoActualizado.Usuario, empleadoActualizado.ContrasenaHash, empleadoActualizado.Nombre, empleadoActualizado.Apellido, empleadoActualizado.Cargo, empleadoActualizado.Telefono, empleadoActualizado.CorreoElectronico, empleadoActualizado.Estado, id]
        : [empleadoActualizado.Usuario, empleadoActualizado.Nombre, empleadoActualizado.Apellido, empleadoActualizado.Cargo, empleadoActualizado.Telefono, empleadoActualizado.CorreoElectronico, empleadoActualizado.Estado, id];

      const results = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.UPDATE
      });

      res.json({ message: "Empleado actualizado con éxito", results });
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;
    try {
      // Eliminar roles asignados al empleado
      await sequelize.query("DELETE FROM Empleado_roles WHERE EmpleadoID = ?", {
        replacements: [id],
        type: sequelize.QueryTypes.DELETE
      });

      // Eliminar el empleado
      const results = await sequelize.query("DELETE FROM Empleados WHERE EmpleadoID = ?", {
        replacements: [id],
        type: sequelize.QueryTypes.DELETE
      });

      res.json({ message: "Empleado eliminado con éxito", id });
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getRoles: async (req, res) => {
    try {
      const results = await sequelize.query("SELECT * FROM roles", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: "No hay roles disponibles" });
      }
    } catch (error) {
      console.error("Error al obtener roles:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  asignarRoles: async (req, res) => {
    const { EmpleadoID, RolID } = req.body;
    try {
      await sequelize.query(
        `INSERT INTO Empleado_roles (EmpleadoID, RolID) VALUES (?, ?)`,
        {
          replacements: [EmpleadoID, RolID],
          type: sequelize.QueryTypes.INSERT
        }
      );

      res.json({ message: 'Rol asignado con éxito' });
    } catch (error) {
      console.error('Error al asignar rol:', error);
      res.status(500).send('Error interno del servidor');
    }
  }
};

export default EmpleadoController;

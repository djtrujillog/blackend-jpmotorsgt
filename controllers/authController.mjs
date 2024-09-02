import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from '../config/config.mjs';
import config from '../utils/config.mjs';

const signIn = async (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  try {
    const [user] = await sequelize.query(
      `SELECT * FROM Empleados WHERE Usuario = ?`,
      { replacements: [usuario], type: sequelize.QueryTypes.SELECT }
    );

    if (!user || !bcrypt.compareSync(contrasena, user.ContrasenaHash)) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const roles = await sequelize.query(
      `SELECT r.Nombre FROM roles r 
       INNER JOIN Empleado_roles er ON r.RolID = er.RolID 
       WHERE er.EmpleadoID = ?`,
      { replacements: [user.EmpleadoID], type: sequelize.QueryTypes.SELECT }
    );

    if (roles.length === 0) {
      return res.status(401).json({ message: 'Usuario no tiene roles asignados' });
    }

    const token = jwt.sign(
      { id: user.EmpleadoID, roles: roles.map(r => r.Nombre) },
      config.SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      roles: roles.map(r => r.Nombre),
      id: user.EmpleadoID,
      nombre: user.Nombre,
      apellido: user.Apellido
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const signUp = async (req, res) => {
  const { Usuario, Contrasena, Nombre, Apellido, Cargo, Telefono, CorreoElectronico, Estado, Roles } = req.body;

  if (!Usuario || !Contrasena || !Nombre || !Apellido || !Cargo || !Telefono || !CorreoElectronico || !Estado || !Roles) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Contrasena, salt);

    const [result] = await sequelize.query(
      `INSERT INTO Empleados (Usuario, ContrasenaHash, Nombre, Apellido, Cargo, Telefono, CorreoElectronico, Estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [Usuario.toLowerCase(), hashedPassword, Nombre, Apellido, Cargo, Telefono, CorreoElectronico, Estado],
        type: sequelize.QueryTypes.INSERT
      }
    );

    const empleadoId = result.insertId;

    for (const rol of Roles) {
      await sequelize.query(
        `INSERT INTO Empleado_roles (EmpleadoID, RolID) VALUES (?, ?)`,
        { replacements: [empleadoId, rol], type: sequelize.QueryTypes.INSERT }
      );
    }

    res.json({ message: 'Empleado registrado con éxito' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export { signIn, signUp };

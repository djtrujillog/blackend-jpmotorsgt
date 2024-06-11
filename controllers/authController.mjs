import Empleado from "../models/empleado.mjs";
import jwt from "jsonwebtoken";
import config from "../utils/config.mjs";

export const signUp = async (req, res) => {
    //Evitar registros duplicados
    try {
        const { CorreoElectronico } = req.body;
        
        const existeUsuario = await Empleado.findOne({ where: { CorreoElectronico } });
        if( existeUsuario ){
            const error = new Error('Usuario ya registrado');
            return res.status(400).json({ message: error.message });
        };
    
        //Encriptar la contraseña antes de almacenar el empleado en la base de datos
        const hashedPassword = await Empleado.encryptPassword(req.body.ContrasenaHash);
    
        //Crear un nuevo usuario en la base de datos
        const newEmpleado = await Empleado.create({    
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Cargo: req.body.Cargo,
            Telefono: req.body.Telefono,
            CorreoElectronico: req.body.CorreoElectronico,
            Usuario: req.body.Usuario,
            Estado: 1,
            ContrasenaHash: hashedPassword
        });
        const token = jwt.sign({ id: newEmpleado.EmpleadoID }, config.SECRET, {
        expiresIn: 7200
        });
        res.status(201).json({ newEmpleado, token });

    } catch (error) {
        console.error('Error al agregar empleado:', error);
        res.status(500).send('Error interno del servidor'); 
    }
};

export const signIn = async (req, res) => {
    try {
      const { Usuario, ContrasenaHash } = req.body;
      const empleado = await Empleado.findOne({ where: { Usuario } });
      if( !empleado ){
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      const matchPassword = await Empleado.comparePassword(ContrasenaHash, empleado.ContrasenaHash);
      if( !matchPassword ){
        return res.status(401).json({ token: null, message: 'Contraseña incorrecta' });
      }
      const token = jwt.sign({ id: empleado.EmpleadoID }, config.SECRET, {
        expiresIn: 7200
      });
  
      //Seleccionamos los campos que necesita el usuario
      const { Nombre, Apellido, Cargo, Estado } = empleado;
  
      res.status(200).json({ user: { Nombre, Apellido, Cargo, Estado }, token });
    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      res.status(500).send('Error interno del servidor');    
    }
};

export const perfil = async (req, res) => {
    const { user } = req;
    res.json(user);
}
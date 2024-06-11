import { DataTypes } from 'sequelize';
import sequelize from '../config/config.mjs';
import db from '../config/config.mjs';
import bcrypt from 'bcrypt';

const Empleado = sequelize.define('Empleado', {
    EmpleadoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Cargo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Telefono: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    CorreoElectronico: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Usuario: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Estado:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ContrasenaHash: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },    
},{
    timestamps: false,
    tableName: 'Empleados',
});

Empleado.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

Empleado.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

export default Empleado;
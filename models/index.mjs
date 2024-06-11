import Sequelize from 'sequelize';
import sequelize from '../config/config.mjs';

import ExteriorModel from './exterior.mjs';
import GarantiaModel from './garantia.mjs';
import InteriorModel from './interior.mjs';
import MarcaModel from './marca.mjs';
import MotorModel from './motor.mjs';
import SeguridadVehiculoModel from './seguridadVehiculo.mjs';
import VehiculoDimCapModel from './vehiculoDimCap.mjs';

const Exterior = ExteriorModel(sequelize, Sequelize.DataTypes);
const Garantia = GarantiaModel(sequelize, Sequelize.DataTypes);
const Interior = InteriorModel(sequelize, Sequelize.DataTypes);
const Marca = MarcaModel(sequelize, Sequelize.DataTypes);
const Motor = MotorModel(sequelize, Sequelize.DataTypes);
const SeguridadVehiculo = SeguridadVehiculoModel(sequelize, Sequelize.DataTypes);
const VehiculoDimCap = VehiculoDimCapModel(sequelize, Sequelize.DataTypes);

export {
    sequelize,
    Exterior,
    Garantia,
    Interior,
    Marca,
    Motor,
    SeguridadVehiculo,
    VehiculoDimCap
};

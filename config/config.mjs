import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('jpmotors_bd', 'jpmotors_dtrujillo', 'Chimichurri2024.', {
  host: 'jpmotorsgt.com',
  dialect: 'mysql'
});

export default sequelize;
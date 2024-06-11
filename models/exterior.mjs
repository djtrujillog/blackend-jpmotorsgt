module.exports = (sequelize, DataTypes) => {
    const Exterior = sequelize.define('Exterior', {
        ExteriorID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        VehiculoID: {
            type: DataTypes.INTEGER
        },
        Sistema_Iluminacion_Exterior: {
            type: DataTypes.STRING
        },
        Espejos_Retrovisores_Ajuste_Automatico_Anti_Deslumbramiento: {
            type: DataTypes.STRING
        },
        // define other fields...
    }, {
        tableName: 'Exterior',
        timestamps: false
    });

    return Exterior;
};

import sequelize from "../config/config.mjs";

const cotizacionController = {
    //Listar todas las cotizaciones
    getCotizaciones : async (req, res) => {
        try {
           const result = await sequelize.query('SELECT * FROM Empleados', { type: sequelize.QueryTypes.SELECT }); 
           res.status(200).json(result);
        } catch (error) {
            console.log('Error al listar cotizaciones:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
}

export default cotizacionController;
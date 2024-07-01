import sequelize from "../config/config.mjs";

const cotizacionController = {
    //Listar todas las cotizaciones
    getCotizaciones : async (req, res) => {
        try {
<<<<<<< HEAD
           const result = await sequelize.query('SELECT * FROM Empleados', { type: sequelize.QueryTypes.SELECT }); 
=======
           const result = await sequelize.query('SELECT * FROM Cotizaciones', { type: sequelize.QueryTypes.SELECT }); 
>>>>>>> 77a15bd (Initial commit)
           res.status(200).json(result);
        } catch (error) {
            console.log('Error al listar cotizaciones:', error);
            res.status(500).send('Error interno del servidor');
        }
<<<<<<< HEAD
=======
    },

    postCotizaciones : async (req, res) => {
        try {
            const result = await sequelize.query('Insert into Cotizaciones', {type: sequelize.QueryTypes.INSERT});
            res.status(200).json(result);
        } catch (error) {
            console.log('Error al insertat cotización', error);
            res.status(500).send('Error interno del servidor');
        }
>>>>>>> 77a15bd (Initial commit)
    }
}

export default cotizacionController;
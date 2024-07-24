const cotizacionController = {
    getCotizaciones : async (req, res) => {
        try {
           const result = await sequelize.query('SELECT * FROM Cotizaciones', { type: sequelize.QueryTypes.SELECT }); 
           res.status(200).json(result);
        } catch (error) {
            console.log('Error al listar cotizaciones:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    postCotizaciones : async (req, res) => {
        try {
            const result = await sequelize.query('INSERT INTO Cotizaciones', { type: sequelize.QueryTypes.INSERT });
            res.status(200).json(result);
        } catch (error) {
            console.log('Error al insertar cotización', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    putCotizaciones : async (req, res) => {
        try {
            const { id } = req.params;
            // Example SQL query, replace with your actual query
            const result = await sequelize.query('UPDATE Cotizaciones SET ... WHERE id = ?', { replacements: [id], type: sequelize.QueryTypes.UPDATE });
            res.status(200).json(result);
        } catch (error) {
            console.log('Error al actualizar cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    deleteCotizaciones : async (req, res) => {
        try {
            const { id } = req.params;
            // Example SQL query, replace with your actual query
            const result = await sequelize.query('DELETE FROM Cotizaciones WHERE id = ?', { replacements: [id], type: sequelize.QueryTypes.DELETE });
            res.status(200).json(result);
        } catch (error) {
            console.log('Error al eliminar cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
}

export default cotizacionController;

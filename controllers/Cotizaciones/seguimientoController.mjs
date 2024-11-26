import sequelize from "../../config/config.mjs";

const seguimientoController = {    
    getSeguimientosById: async (req, res) => {
        const idCotizacion = req.params.id;
        try {                       
            var query = `SELECT s.*, t.Descripcion
                        FROM jpmotors_bd.Seguimientos s
                        INNER JOIN jpmotors_bd.Seguimientos_Tipo t
                            on s.SeguimientoTipoID = t.SeguimientoID
                        WHERE s.CotizacionID = ` + idCotizacion;

            const result = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
            
            if (result.length <=0)
                throw new Error('No se encontraron coincidencias para el ID: ' + idCotizacion);

            res.status(200).json(result);
        } catch (error) {
            console.log('Error al listar cotizaciones:', error);
            res.status(500).send('Error interno del servidor ' + error);
        }
    },

    post: async (req, res) =>{
        const {CotizacionID, Comentario, FechaSeguimiento, SeguimientoTipoID} = req.body;
        try {
            var query = `INSERT INTO  jpmotors_bd.Seguimientos 
                        (CotizacionID ,
                        Comentario ,
                        FechaSeguimiento ,
                        SeguimientoTipoID )
                        VALUES 
                        (?, ?, ?, ?)`;
                        
            const result = await sequelize.query(query, 
                {
                    replacements: [CotizacionID, Comentario, FechaSeguimiento, SeguimientoTipoID],
                    type: sequelize.QueryTypes.INSERT
                });
            res.status(200).json({message: 'Seguimiento a cotización generado correctamente', result})
        } catch (error) {
            console.log('Error al insertar cotización', error);
            res.status(500).send('Error interno del servidor' + error);
        }
    },

    put: async (req, res) => {
        try {
            const {SeguimientoID, CotizacionID, Comentario, FechaSeguimiento, SeguimientoTipoID} = req.body;
            // Example SQL query, replace with your actual query
            var query = "UPDATE Seguimientos SET Comentario = '" + Comentario + "', SeguimientoTipoID = " + SeguimientoTipoID;
            query = query + ' WHERE SeguimientoID =' + SeguimientoID;
            console.log(query);
            const result = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
            res.status(200).json({ message: 'Seguimiento actualizado correctamente', result });
        } catch (error) {

            console.log('Error al actualizar cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    delete: async (req, res) => {
        const idSeguimiento = req.params.id;
        try {
           
            
            var query = `DELETE FROM Seguimientos WHERE SeguimientoID = ` + idSeguimiento;
            console.log(query);
            const result = await sequelize.query(query, { type: sequelize.QueryTypes.DELETE });
            res.status(200).json({ message: 'Seguimiento eliminado correctamente', result });
        } catch (error) {

            console.log('Error al actualizar cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
}

export default seguimientoController;
import sequelize from "../../config/config.mjs";
import CotizacionClass from '../../models/cotizacion.mjs'

const cotizacionController = {
    getCotizacionesByEstado: async (req, res) => {
        const estado = req.params.estado;

        if (estado.length <= 0)
            throw new Error("No definió un estado para hacer la busqueda");

        try {
            var query = "SELECT c.*, concat(e.Nombre, ' ' , e.Apellido) as NombreEmpleado, concat(cl.Nombre, ' ', cl.Apellido) as NombreCliente, ";
            query = query + "concat(v.Modelo, ' ', v.Marca, ' ', v.Anio) as VehiculoDescripcion ";
            query = query + "FROM jpmotors_bd.Cotizaciones c ";
            query = query + "INNER JOIN jpmotors_bd.Empleados e ";
            query = query + "   on e.EmpleadoID = c.EmpleadoID ";
            query = query + "INNER JOIN jpmotors_bd.Clientes cl ";
            query = query + "   on cl.ClienteID = c.ClienteID ";
            query = query + "INNER JOIN jpmotors_bd.Vehiculos v ";
            query = query + "	on v.VehiculoID = c.VehiculoID ";
            query = query + "WHERE c.EstadoCotizacion = '" + estado + "'";

            const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

            if (result.length <= 0)
                throw new Error('No se encontró niguna coincidencia para el Empleado con ID: ' + idEmpleado);

            res.status(200).json(result);
        }
        catch (error) {
            console.log('Error al ejecutar getCotizacion ' + error);
            res.status(500).send('Error interno del servidor ' + error);
        }
    },
    getCotizacionesByVehiculo: async (req, res) => {
        const idVehiculo = req.params.id;

        try {
            var query = "SELECT c.*, concat(e.Nombre, ' ' , e.Apellido) as NombreEmpleado, concat(cl.Nombre, ' ', cl.Apellido) as NombreCliente, ";
            query = query + "concat(v.Modelo, ' ', v.Marca, ' ', v.Anio) as VehiculoDescripcion ";
            query = query + "FROM jpmotors_bd.Cotizaciones c ";
            query = query + "INNER JOIN jpmotors_bd.Empleados e ";
            query = query + "   on e.EmpleadoID = c.EmpleadoID ";
            query = query + "INNER JOIN jpmotors_bd.Clientes cl ";
            query = query + "   on cl.ClienteID = c.ClienteID ";
            query = query + "INNER JOIN jpmotors_bd.Vehiculos v ";
            query = query + "	on v.VehiculoID = c.VehiculoID ";
            query = query + "WHERE c.VehiculoId = " + idVehiculo;

            const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

            if (result.length <= 0)
                throw new Error('No se encontró niguna coincidencia para el Empleado con ID: ' + idEmpleado);

            res.status(200).json(result);
        }
        catch (error) {
            console.log('Error al ejecutar getCotizacion ' + error);
            res.status(500).send('Error interno del servidor ' + error);
        }
    },
    getCotizacionesByEmpleado: async (req, res) => {
        const idEmpleado = req.params.id;
        try {
            var query = "SELECT c.*, concat(e.Nombre, ' ' , e.Apellido) as NombreEmpleado, concat(cl.Nombre, ' ', cl.Apellido) as NombreCliente, ";
            query = query + "concat(v.Modelo, ' ', v.Marca, ' ', v.Anio) as VehiculoDescripcion ";
            query = query + "FROM jpmotors_bd.Cotizaciones c ";
            query = query + "INNER JOIN jpmotors_bd.Empleados e ";
            query = query + "   on e.EmpleadoID = c.EmpleadoID ";
            query = query + "INNER JOIN jpmotors_bd.Clientes cl ";
            query = query + "   on cl.ClienteID = c.ClienteID ";
            query = query + "INNER JOIN jpmotors_bd.Vehiculos v ";
            query = query + "	on v.VehiculoID = c.VehiculoID ";
            query = query + "WHERE c.EmpleadoID = " + idEmpleado;
            const result = await sequelize.query(query,
                {
                    type: sequelize.QueryTypes.SELECT
                }
            );

            if (result.length <= 0)
                throw new Error('No se encontró niguna coincidencia para el Empleado con ID: ' + idEmpleado);

            res.status(200).json(result);
        }
        catch (error) {
            console.log('Error al ejecutar getCotizacion ' + error);
            res.status(500).send('Error interno del servidor ' + error);
        }
    },

    getCotizacionById: async (req, res) => {
        const id = req.params.id;
        try {
            var query = "SELECT c.*, concat(e.Nombre, ' ' , e.Apellido) as NombreEmpleado, concat(cl.Nombre, ' ', cl.Apellido) as NombreCliente, ";
            query = query + "concat(v.Modelo, ' ', v.Marca, ' ', v.Anio) as VehiculoDescripcion ";
            query = query + "FROM jpmotors_bd.Cotizaciones c ";
            query = query + "INNER JOIN jpmotors_bd.Empleados e ";
            query = query + "   on e.EmpleadoID = c.EmpleadoID ";
            query = query + "INNER JOIN jpmotors_bd.Clientes cl ";
            query = query + "   on cl.ClienteID = c.ClienteID ";
            query = query + "INNER JOIN jpmotors_bd.Vehiculos v ";
            query = query + "	on v.VehiculoID = c.VehiculoID ";
            query = query + "WHERE CotizacionID =" + id;
            const result = await sequelize.query(query,
                {
                    type: sequelize.QueryTypes.SELECT
                });

            if (result.length <= 0)
                throw new Error('No se encontró ningún registro con el id ' + id)

            res.status(200).json(result);
        }
        catch (error) {
            console.log('Error al ejecutar getCotizacion ' + error);
            res.status(500).send('Error interno del servidor ' + error);
        }
    },

    getCotizaciones: async (req, res) => {
        try {
            var query = "SELECT c.*, concat(e.Nombre, ' ' , e.Apellido) as NombreEmpleado, concat(cl.Nombre, ' ', cl.Apellido) as NombreCliente, ";
            query = query + "concat(v.Modelo, ' ', v.Marca, ' ', v.Anio) as VehiculoDescripcion ";
            query = query + "FROM jpmotors_bd.Cotizaciones c ";
            query = query + "INNER JOIN jpmotors_bd.Empleados e ";
            query = query + "   on e.EmpleadoID = c.EmpleadoID ";
            query = query + "INNER JOIN jpmotors_bd.Clientes cl ";
            query = query + "   on cl.ClienteID = c.ClienteID ";
            query = query + "INNER JOIN jpmotors_bd.Vehiculos v ";
            query = query + "	on v.VehiculoID = c.VehiculoID ";

            const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
            res.status(200).json(result);
        } catch (error) {
            console.log('Error al listar cotizaciones:', error);
            res.status(500).send('Error interno del servidor ' + error);
        }
    },
    getCotizacionesByParameters: async (req, res) => {
        // ejemplo del body que se debe recibir/enviar 
        /*
        {
            "FechaInicial" : "2024-01-01",
            "FechaFinal" : "2024-12-31",
            "ClienteId" : 19,
            "VehiculoId" : 64,
            "EmpleadoId" : 50
        }

        Todos los campos del json podrian ser nulos en diferentes combinaciones
        */

        try {

            if (JSON.stringify(req.body) === '{}')
                throw new Error("400: El cuerpo de la petición viene vacío");

            const { FechaInicial, FechaFinal, ClienteId, VehiculoId, EmpleadoId } = req.body;

            var query = "SELECT c.*, concat(e.Nombre, ' ' , e.Apellido) as NombreEmpleado, concat(cl.Nombre, ' ', cl.Apellido) as NombreCliente, ";
            query = query + "concat(v.Modelo, ' ', v.Marca, ' ', v.Anio) as VehiculoDescripcion ";
            query = query + "FROM jpmotors_bd.Cotizaciones c ";
            query = query + "INNER JOIN jpmotors_bd.Empleados e ";
            query = query + "   on e.EmpleadoID = c.EmpleadoID ";
            query = query + "INNER JOIN jpmotors_bd.Clientes cl ";
            query = query + "   on cl.ClienteID = c.ClienteID ";
            query = query + "INNER JOIN jpmotors_bd.Vehiculos v ";
            query = query + "	on v.VehiculoID = c.VehiculoID ";
            query = query + "WHERE 1= 1 "

            if (FechaInicial != null)
                query = query + " AND c.FechaCotizacion >= '" + FechaInicial + "'";

            if (FechaFinal != null)
                query = query + "  AND c.FechaCotizacion <= '" + FechaFinal + "'";

            if (ClienteId != null)
                query = query + " AND c.ClienteID = " + ClienteId;

            if (VehiculoId != null)
                query = query + " AND c.VehiculoID = " + VehiculoId;

            if (EmpleadoId != null)
                query = query + " AND c.EmpleadoID = " + EmpleadoId;

            const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

            if (result.length <= 0)
                throw new Error("404: No se encontraron registros para los parámetros enviados");

            //metiendo a la clase como arreglo
            const cotizaciones = result.map(r => new CotizacionClass(r.NombreEmpleado, r.NombreCliente, r.VehiculoDescripcion, r.CotizacionID, r.EmpleadoID, r.ClienteID, r.VehiculoID, r.FechaCotizacion, r.EstadoCotizacion, r.FechaSeguimiento));

            // conviertiendo solo los id's para recuperar solo los que me interan
            const ids = result.map(c => c.CotizacionID).join(',');

            query = "SELECT s.*, t.Descripcion ";
            query = query + "FROM jpmotors_bd.Seguimientos s ";
            query = query + "INNER JOIN jpmotors_bd.Seguimientos_Tipo t ";
            query = query + "ON s.SeguimientoTipoID = t.SeguimientoID ";
            query = query + "WHERE s.CotizacionID IN (" + ids + ")"

            const resultSeguimientos = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

            cotizaciones.forEach(c => {
                let segs = resultSeguimientos.filter(s => s.CotizacionID == c.cotizacionId);
                c.agregarSeguimientos(segs);

            });

            res.status(200).json(cotizaciones);
        }
        catch (error) {
            let codeErrorMessage = error.message.substring(0, 3);

            if (codeErrorMessage === '400')
                res.status(400).send(error.message);

            else if (codeErrorMessage === '404')
                res.status(404).send(error.message);

            else
                res.status(500).send('Error interno del servidor' + error.message);
        }
    },
    post: async (req, res) => {
        const { CotizacionID, EmpleadoID, ClienteID, VehiculoID, FechaCotizacion, EstadoCotizacion, FechaSeguimiento } = req.body;
        console.log(EmpleadoID);
        try {
            var query = 'INSERT INTO Cotizaciones (EmpleadoID, ClienteID, VehiculoID, FechaCotizacion, EstadoCotizacion, FechaSeguimiento) ';
            query = query + 'VALUES ';
            query = query + '(?, ?, ?, ?, ?, ?) ';
            console.log(query);
            const result = await sequelize.query(query,
                {
                    replacements: [EmpleadoID, ClienteID, VehiculoID, FechaCotizacion, EstadoCotizacion, FechaSeguimiento],
                    type: sequelize.QueryTypes.INSERT
                });
            res.status(200).json({ message: 'Cotización guardada con éxito', result });
        } catch (error) {
            console.log('Error al insertar cotización', error);
            res.status(500).send('Error interno del servidor' + error);
        }
    },

    put: async (req, res) => {
        try {
            const { CotizacionID, EmpleadoID, ClienteID, VehiculoID, EstadoCotizacion, FechaSeguimiento } = req.body;
    
            // Usar parámetros seguros para evitar SQL Injection
            let query = `
                UPDATE Cotizaciones 
                SET EmpleadoID = :EmpleadoID, 
                    ClienteID = :ClienteID, 
                    VehiculoID = :VehiculoID, 
                    EstadoCotizacion = :EstadoCotizacion, 
                    FechaSeguimiento = :FechaSeguimiento
                WHERE CotizacionID = :CotizacionID;
            `;
    
            const result = await sequelize.query(query, {
                replacements: {
                    EmpleadoID,
                    ClienteID,
                    VehiculoID,
                    EstadoCotizacion,
                    FechaSeguimiento,
                    CotizacionID
                },
                type: sequelize.QueryTypes.UPDATE
            });
    
            res.status(200).json({ message: 'Cotización actualizada correctamente', result });
        } catch (error) {
            console.log('Error al actualizar cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    putSeparado: async (req, res) => {
        try {
            // Obtener el CotizacionID de los parámetros de la URL
            const { CotizacionID } = req.params;
            const { EmpleadoID, ClienteID, VehiculoID, EstadoCotizacion, FechaSeguimiento } = req.body;
    
            // Asegurarse de que CotizacionID esté presente
            if (!CotizacionID) {
                return res.status(400).json({ error: 'CotizacionID es requerido en la URL' });
            }
    
            let fieldsToUpdate = [];
            let replacements = { CotizacionID };
    
            // Construir la consulta dependiendo de los campos presentes en el body
            if (EmpleadoID !== undefined) {
                fieldsToUpdate.push('EmpleadoID = :EmpleadoID');
                replacements.EmpleadoID = EmpleadoID;
            }
    
            if (ClienteID !== undefined) {
                fieldsToUpdate.push('ClienteID = :ClienteID');
                replacements.ClienteID = ClienteID;
            }
    
            if (VehiculoID !== undefined) {
                fieldsToUpdate.push('VehiculoID = :VehiculoID');
                replacements.VehiculoID = VehiculoID;
            }
    
            if (EstadoCotizacion !== undefined) {
                fieldsToUpdate.push('EstadoCotizacion = :EstadoCotizacion');
                replacements.EstadoCotizacion = EstadoCotizacion;
            }
    
            if (FechaSeguimiento !== undefined) {
                fieldsToUpdate.push('FechaSeguimiento = :FechaSeguimiento');
                replacements.FechaSeguimiento = FechaSeguimiento;
            }
    
            // Si no hay campos para actualizar, devolver un error
            if (fieldsToUpdate.length === 0) {
                return res.status(400).json({ error: 'No hay campos para actualizar' });
            }
    
            let query = `
                UPDATE Cotizaciones 
                SET ${fieldsToUpdate.join(', ')}
                WHERE CotizacionID = :CotizacionID;
            `;
    
            const result = await sequelize.query(query, {
                replacements,
                type: sequelize.QueryTypes.UPDATE
            });
    
            res.status(200).json({ message: 'Cotización actualizada correctamente', result });
        } catch (error) {
            console.log('Error al actualizar cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    
    
    

    Reasignar:async (req, res) => {
        const { EmpleadoID } = req.body; // Obtenemos el nuevo EmpleadoID del body
        const CotizacionID = req.params.id; // Obtenemos el ID de la cotización de los parámetros
    
        if (!EmpleadoID) {
            return res.status(400).json({ message: "Se requiere el EmpleadoID para reasignar la cotización." });
        }
    
        try {
            // Consulta para reasignar el empleado
            let query = `
                UPDATE Cotizaciones 
                SET EmpleadoID = :EmpleadoID
                WHERE CotizacionID = :CotizacionID;
            `;
    
            const result = await sequelize.query(query, {
                replacements: {
                    EmpleadoID,
                    CotizacionID
                },
                type: sequelize.QueryTypes.UPDATE
            });
    
            if (result[1] === 0) { // Si no se actualizó ninguna fila
                return res.status(404).json({ message: "No se encontró la cotización con el ID proporcionado." });
            }
    
            res.status(200).json({ message: 'Cotización reasignada correctamente', result });
        } catch (error) {
            console.error('Error al reasignar empleado:', error);
            res.status(500).json({ message: 'Error interno del servidor al reasignar empleado.' });
        }
    },


    delete: async (req, res) => {
        try {
            const id = req.params.id;
            var query = "UPDATE Cotizaciones SET EstadoCotizacion = 'Anulada'";
            query = query + " WHERE CotizacionID =" + id;
            console.log(query);
            const result = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
            res.status(200).json({ message: 'Cotización actualizada correctamente', result });
        } catch (error) {
            console.log('Error al eliminar cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
}

export default cotizacionController;

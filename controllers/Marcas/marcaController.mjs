import express from 'express';
import sequelize from "../../config/config.mjs";

const marcaController = {
    getMarcas: async (req, res) => {
        try {
            const result = await sequelize.query("SELECT * FROM Marca", {
                type: sequelize.QueryTypes.SELECT
            });
        
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No hay marcas" });
            }      
        } catch (error) {
            console.error("Error al obtener marcas:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    getMarcaById: async (req, res) => {
        const id = req.params.id;
        try {
            var query = "SELECT m.* FROM jpmotors_bd.Marca m WHERE m.MarcaID = :id";
            const result = await sequelize.query(query, {
                replacements: { id: id },
                type: sequelize.QueryTypes.SELECT
            });

            if (result.length <= 0) {
                return res.status(404).json({ message: "No se encontró ningún registro con el id " + id });
            }

            res.status(200).json(result);
        } catch (error) {
            console.log('Error al ejecutar getMarcaById:', error);
            res.status(500).send("Error interno del servidor");
        }
    },

    getMarcaByNombre: async (req, res) => {
        const nombre = req.params.nombre;
        try {
            var query = "SELECT m.* FROM jpmotors_bd.Marca m WHERE m.NombreMarca LIKE :nombre";
            const result = await sequelize.query(query, {
                replacements: { nombre: '%' + nombre + '%' },
                type: sequelize.QueryTypes.SELECT
            });

            if (result.length <= 0) {
                return res.status(404).json({ message: "No se encontró ninguna marca con el nombre " + nombre });
            }

            res.status(200).json(result);
        } catch (error) {
            console.log('Error al ejecutar getMarcaByNombre:', error);
            res.status(500).send("Error interno del servidor: " + error.message);
        }
    },

    guardarMarca: async (req, res) => {
        const { NombreMarca } = req.body;
        const logo = req.file ? req.file.buffer : null;
    
        console.log(req.file); // Verifica si el archivo está llegando
    
        try {
            // Obtener el último MarcaID existente
            const [lastIdResult] = await sequelize.query("SELECT MAX(MarcaID) AS lastId FROM Marca");
            const lastId = lastIdResult[0].lastId || 0; // Si no hay marcas, lastId será 0
            const newId = lastId + 1; // Incrementa el último ID
    
            const newMarca = {
                MarcaID: newId, // Asigna el nuevo ID manualmente
                NombreMarca,
                Logo: logo
            };
    
            const result = await sequelize.query("INSERT INTO Marca (MarcaID, NombreMarca, Logo) VALUES (:MarcaID, :NombreMarca, :Logo)", {
                replacements: newMarca,
                type: sequelize.QueryTypes.INSERT
            });
    
            res.status(201).json({ message: "Marca creada exitosamente", id: newId });
        } catch (error) {
            console.error("Error al guardar la marca:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    

    put: async (req, res) => {
        const { id } = req.params;
        const { NombreMarca } = req.body;
        const logo = req.file ? req.file.buffer : null;
    
        try {
            let query = "UPDATE Marca SET NombreMarca = :NombreMarca";
            const replacements = { NombreMarca, id };
    
            // Si hay un logo nuevo, se incluye en la consulta y los replacements
            if (logo) {
                query += ", Logo = :Logo";
                replacements.Logo = logo;
            }
    
            query += " WHERE MarcaID = :id";
    
            // Ejecuta la consulta SQL de actualización
            const [result] = await sequelize.query(query, {
                replacements: replacements,
                type: sequelize.QueryTypes.UPDATE
            });
    
            // Verifica si alguna fila fue afectada
            if (result === 0) {
                return res.status(404).json({ message: "Marca no encontrada" });
            }
    
            res.status(200).json({ message: "Marca actualizada exitosamente" });
        } catch (error) {
            console.error("Error al actualizar la marca:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    

    eliminarMarca: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await sequelize.query("DELETE FROM Marca WHERE MarcaID = :id", {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            });

            if (result[0] === 0) {
                return res.status(404).json({ message: "Marca no encontrada" });
            }

            res.status(200).json({ message: "Marca eliminada exitosamente" });
        } catch (error) {
            console.error("Error al eliminar la marca:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
};

export default marcaController;

import express from 'express';
import sequelize from "../config/config.mjs";

const marcaController = {
    getMarcas: async (req, res) => {
        try {
            const result = await sequelize.query("SELECT * FROM Marca",
            {
                type: sequelize.QueryTypes.SELECT
            });
        
            if(result.length > 0){
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No hay marcas" });
            }      
        } catch (error) {
            console.error("Error al obtener marcas:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
}

export default marcaController;
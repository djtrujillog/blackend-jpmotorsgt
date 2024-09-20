//vehicleController.mjs

import path from 'path';
import { promises as fs } from 'fs'; // Importa fs/promises
import sequelize from "../../config/config.mjs";
import { fileURLToPath } from 'url'; // Necesario para obtener __dirname en ES Modules

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vehiculoController = {
  getVehiculos: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM Vehiculos", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay vehículos" });
      }
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculosNuevos: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM Vehiculos v WHERE Condicion = 'Nuevo' and Estado ='Activo'", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay vehículos" });
      }
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculosUsados: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM Vehiculos v WHERE Condicion = 'Usado' and Estado ='Activo'", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay vehículos" });
      }
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
  // Backend - Cambios en el endpoint getVehiculos
getPaginar: async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const result = await sequelize.query(
      "SELECT * FROM Vehiculos LIMIT :limit OFFSET :offset",
      {
        replacements: { limit: parseInt(limit), offset: parseInt(offset) },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (result.length > 0) {
      // Opcionalmente, contar el total de vehículos
      const total = await sequelize.query("SELECT COUNT(*) as count FROM Vehiculos", {
        type: sequelize.QueryTypes.SELECT,
      });
      
      res.status(200).json({
        data: result,
        total: total[0].count,
        page: parseInt(page),
        limit: parseInt(limit)
      });
    } else {
      res.status(404).json({ message: "No hay vehículos" });
    }
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    res.status(500).send("Error interno del servidor");
  }
},


  getVehiculosNombre: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT VehiculoID,Modelo,Marca,Anio,PrecioGerente,PrecioWeb, PrecioLista, MarcaID FROM Vehiculos", {
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay vehículos" });
      }
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoMotor: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetMotorDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }

      const descriptionsObject = result[0];
      const motorDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Motor: motorDescriptions });
    } catch (error) {
      console.error("Error al obtener el los datos del motor:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoSeguridad: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetSeguridadDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length === 0) {
        res.status(404).send("Detalles no encontrados");
        return;
      }

      const descriptionsObject = result[0];
      const seguridadDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Seguridad: seguridadDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoInterior: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetInteriorDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }

      const descriptionsObject = result[0];
      const interiorDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Interior: interiorDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoExterior: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("CALL GetExteriorDescription(:id)", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      });

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }

      const descriptionsObject = result[0];
      const exteriorDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Exterior: exteriorDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoDimensiones: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query(
        "CALL GetDimensionesDescription(:id)",
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (result.length === 0) {
        res.status(404).send("Vehículo no encontrado");
        return;
      }

      const descriptionsObject = result[0];
      const dimensionesDescriptions = Object.values(descriptionsObject).map(
        (item) => item.Descripcion
      );

      res.json({ Dimensiones: dimensionesDescriptions });
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculosPorMarca: async (req, res) => {
    try {
      const { marca } = req.query;
      let result = [];
      if (marca === "all") {
        result = await sequelize.query("SELECT * FROM Vehiculos", {
          type: sequelize.QueryTypes.SELECT,
        });
      } else {
        result = await sequelize.query(
          `SELECT V.VehiculoID, V.Modelo, V.Marca, V.Anio, V.PrecioGerente, 
          V.PrecioWeb, V.PrecioLista, V.Imagen, V.MarcaID 
          FROM Vehiculos V 
          INNER JOIN Marca M ON V.MarcaID = M.MarcaID 
          WHERE M.MarcaID = :marca`,
          { replacements: { marca }, type: sequelize.QueryTypes.SELECT }
        );
      }
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No se encontraron vehículos para esta marca" });
      }
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoPorID: async (req, res) => {
    const { id } = req.params;
  
    try {
      // Consultar el vehículo por ID desde la base de datos
      const result = await sequelize.query(
        "SELECT * FROM Vehiculos WHERE VehiculoID = :id",
        { replacements: { id }, type: sequelize.QueryTypes.SELECT }
      );
  
      // Si no se encuentra el vehículo, retornar un error 404
      if (result.length === 0) {
        return res.status(404).send("Vehículo no encontrado");
      }
  
      // Obtener la imagen desde la base de datos
      const imagenBuffer = result[0].Imagen; // Asume que es un Buffer almacenado
  
      try {
        // Convertir el Buffer a base64
        const base64Image = Buffer.from(imagenBuffer).toString('base64');
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;
  
        // Agregar la URL de la imagen al objeto del vehículo
        result[0].ImagenURL = imageUrl;
  
        // Enviar el vehículo con la URL de la imagen al cliente
        res.json(result[0]);
      } catch (error) {
        console.error("Error al procesar la imagen:", error);
        res.status(500).send("Error interno del servidor al procesar la imagen");
      }
    } catch (error) {
      console.error("Error al obtener el vehículo getVehiculoPorID:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
  

  post: async (req, res) => {
    try {
      const { body, file } = req;
      const imagenBuffer = file.buffer;  // Obtener el buffer del archivo

      // Guardar el buffer de la imagen en la base de datos junto con otros datos del vehículo
      const result = await sequelize.query(
        `INSERT INTO Vehiculos (Modelo, Marca, Anio, PrecioGerente, PrecioWeb, PrecioLista, Imagen, MarcaID, Condicion, Estado)
        VALUES (:Modelo, :Marca, :Anio, :PrecioGerente, :PrecioWeb, :PrecioLista, :Imagen, :MarcaID, :Condicion, :Estado)`,
        {
          replacements: {
            Modelo: body.Modelo,
            Marca: body.Marca,
            Anio: body.Anio,
            PrecioGerente: body.PrecioGerente,
            PrecioWeb: body.PrecioWeb,
            PrecioLista: body.PrecioLista,
            Imagen: imagenBuffer,
            MarcaID: body.MarcaID,
            Condicion: body.Condicion,
            Estado: body.Estado,
          },
        }
      );

      res.status(201).json({ message: "Vehículo creado con éxito", id: result[0] });
    } catch (error) {
      console.error("Error al crear vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  put: async (req, res) => {
    try {
      const { id } = req.params;
      const { body, file } = req;
      const imagenBuffer = file ? file.buffer : null;

      // Actualizar los datos del vehículo en la base de datos
      const result = await sequelize.query(
        `UPDATE Vehiculos SET 
          Modelo = :Modelo, 
          Marca = :Marca, 
          Anio = :Anio, 
          PrecioGerente = :PrecioGerente, 
          PrecioWeb = :PrecioWeb, 
          PrecioLista = :PrecioLista, 
          Imagen = IFNULL(:Imagen, Imagen), 
          MarcaID = :MarcaID ,
          Condicion = :Condicion,
          Estado = :Estado
        WHERE VehiculoID = :id`,
        {
          replacements: {
            Modelo: body.Modelo,
            Marca: body.Marca,
            Anio: body.Anio,
            PrecioGerente: body.PrecioGerente,
            PrecioWeb: body.PrecioWeb,
            PrecioLista: body.PrecioLista,
            Imagen: imagenBuffer,
            MarcaID: body.MarcaID,
            id: id,
            Condicion: body.Condicion,
            Estado: body.Estado
          },
        }
      );

      res.json({ message: "Vehículo actualizado con éxito" });
    } catch (error) {
      console.error("Error al actualizar vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  delete: async (req, res) => {
    try {
      const { VehiculoID } = req.params;
      await sequelize.query("DELETE FROM Vehiculos WHERE VehiculoID = :VehiculoID", {
        replacements: { VehiculoID },
      });

      res.status(200).json({ message: "Vehículo eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar vehículo:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
};

export default vehiculoController;

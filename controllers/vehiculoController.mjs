import express from "express";
import multer from "multer";
import fs from "fs";
import sequelize from "../config/config.mjs";

const vehiculosRouter = express.Router();
vehiculosRouter.use(express.urlencoded({ extended: true }));
vehiculosRouter.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../JpMotor/Images/nuevos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const vehiculoController = {
  getVehiculos: async (req, res) => {
    try {
      const result = await sequelize.query("SELECT * FROM Vehiculos",
      {
        type: sequelize.QueryTypes.SELECT
      });

      if(result.length > 0){
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No hay vehículos" });
      }      
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  getVehiculoDetalle : async (req, res) => {
      try {
        const { id } = req.params;
        const result = await sequelize.query("CALL ConsultaCompletaPorID(:id)", 
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT
        });
        
        if (result.length === 0) {
          res.status(404).send("Vehiculo no encontrado");
          return;
        }
        // Ajustar la respuesta para enviar solo el objeto del vehículo
        console.log(result);
        res.json(result[0][0]);
      } catch (error) {
        console.error("Error al obtener el Vehiculo:", error);
        res.status(500).send("Error interno del servidor");
      }
  },
  getVehiculosPorMarca: async (req, res) => {
    try {
        const { marca } = req.query;
        console.log(req);
        let result = [];
        if( marca == 'all'){
            result = await sequelize.query("SELECT * FROM Vehiculos",{
                type: sequelize.QueryTypes.SELECT
            });                
        } else {
            result = await sequelize.query("SELECT V.VehiculoID, V.Modelo, V.Marca, V.Anio, V.PrecioGerente, V.PresioWeb, V.PrecioLista, V.Imagen, V.MarcaID FROM Vehiculos V INNER JOIN Marca M ON V.MarcaID = M.MarcaID WHERE M.MarcaID = :marca",{
                replacements: { marca },
                type: sequelize.QueryTypes.SELECT
            });
        }
        if(result.length > 0){
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "No hay vehículos de esa marca" });
        }
    } catch (error) {
        console.error("Error al obtener los vehículos de la marca:", error);
        res.status(500).send("Error interno del servidor");
    }
  },
  getVehiculoPorID: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sequelize.query("SELECT * FROM Vehiculos WHERE VehiculoID = :id",
      {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
      });
      
      if (result.length === 0) {
        res.status(404).send("Vehiculo no encontrado");
        return;
      }
      res.json(result[0]);
    } catch (error) {
      console.error("Error al obtener el Vehiculo:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}

export default vehiculoController;

// //crear un nuevo vehiculo
// vehiculosRouter.post("/", upload.single('Imagen'), async function (req, res) {
//   // Extraer la información del vehículo desde la solicitud
//   const { Modelo, Marca, Anio, PrecioGerente, PresioWeb, PrecioLista, MarcaID } =
//     req.body;

//   // Obtener la imagen del cuerpo de la solicitud
//   const Imagen = req.file ? req.file.filename : null;

//   try {
//     // Insertar el vehículo en la base de datos
//     const results = await query(
//       "INSERT INTO Vehiculos (Modelo, Marca, Anio, PrecioGerente, PresioWeb, PrecioLista, MarcaID, Imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//       [Modelo, Marca, Anio, PrecioGerente, PresioWeb, PrecioLista, MarcaID, Imagen]
//     );

//     // Enviar una respuesta exitosa al cliente
//     res.json({
//       message: "Vehiculo agregado con éxito",
//       vehiculo: {
//         VehiculoID: results.insertId,
//         Modelo,
//         Marca,
//         Anio,
//         PrecioGerente,
//         PresioWeb,
//         PrecioLista,
//         MarcaID,
//         Imagen,
//       },
//     });    
//   } catch (error) {
//     console.error("Error al agregar vehiculo:", error);
//     res.status(500).send("Error interno del servidor");
//   }
// });



// // Actualizar un vehiculo existente
// vehiculosRouter.put("/:id", upload.single('Imagen'), async function (req, res) {
//   // Extraer la información del vehículo desde la solicitud
//   const { Modelo, Marca, Anio, PrecioGerente, PresioWeb, PrecioLista, MarcaID } = req.body;

//   // La imagen se guarda en req.file
//   const Imagen = req.file ? req.file.filename : null;

//   try {
//     // Si se subió una nueva imagen, actualizar la imagen en la base de datos
//     if (Imagen) {
//       await query(
//         "UPDATE Vehiculos SET Modelo = ?, Marca = ?, Anio = ?, PrecioGerente = ?, PresioWeb = ?, PrecioLista = ?, MarcaID = ?, Imagen = ? WHERE VehiculoID = ?",
//         [Modelo, Marca, Anio, PrecioGerente, PresioWeb, PrecioLista, MarcaID,  Imagen, req.params.id]
//       );
//     } else {
//       // Si no se subió una nueva imagen, no actualizar la imagen en la base de datos
//       await query(
//         "UPDATE Vehiculos SET Modelo = ?, Marca = ?, Anio = ?, PrecioGerente = ?, PresioWeb = ?, PrecioLista = ?, MarcaID = ? WHERE VehiculoID = ?",
//         [Modelo, Marca, Anio, PrecioGerente, PresioWeb, PrecioLista, MarcaID, req.params.id]
//       );
//     }

//     // Enviar una respuesta exitosa al cliente
//     res.json({
//       message: "Vehiculo actualizado con éxito",
//     });
//   } catch (error) {
//     console.error("Error al actualizar vehiculo:", error);
//     res.status(500).send("Error interno del servidor");
//   }
// });
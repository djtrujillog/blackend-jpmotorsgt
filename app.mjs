import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/config.mjs';
import authRouters from './routes/auth.routes.mjs';
import dashboardRouters from './routes/dashboard.routes.mjs';
import vehiculosRouter from './routes/vehiculo.routes.mjs';
import marcasRouter from './routes/marca.routes.mjs';

const app = express();


app.set('port', process.env.PORT || 4000);

// Middleware para permitir solicitudes CORS
app.use(cors());

// Middleware para analizar las solicitudes entrantes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//ruta de prueba
app.get('/',(req,res)=>res.json({message: 'API JP Motors Gt'}))
// Routing
app.use('/auth', authRouters);
app.use('/dashboard', dashboardRouters);
app.use('/vehiculos', vehiculosRouter);
app.use('/marcos', marcasRouter);

// Probar la conexión a la base de datos antes de sincronizar
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');

    // Iniciar la sincronización de Sequelize
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Base de datos sincronizada.');

    // Iniciar el servidor
    app.listen(app.get('port'), function() {
      console.log('Servidor escuchando en el puerto ' +app.get('port') );
    });
  })
  .catch((error) => {
    console.log('Error al conectar con la base de datos:', error);
  });

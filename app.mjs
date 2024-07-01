import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/config.mjs';
import authRouters from './routes/auth.routes.mjs';
import dashboardRouters from './routes/dashboard.routes.mjs';
import vehiculosRouter from './routes/vehiculo.routes.mjs';
import marcasRouter from './routes/marca.routes.mjs';
<<<<<<< HEAD

const app = express();


=======
import cotizacionRouter from './routes/cotizacion.Routes.mjs';

const app = express();

>>>>>>> 77a15bd (Initial commit)
app.set('port', process.env.PORT || 4000);

// Middleware para permitir solicitudes CORS
app.use(cors());

// Middleware para analizar las solicitudes entrantes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
<<<<<<< HEAD
//ruta de prueba
app.get('/',(req,res)=>res.json({message: 'API JP Motors Gt'}))
=======

// Ruta de prueba
app.get('/', (req, res) => res.json({ message: 'API JP Motors Gt' }));

>>>>>>> 77a15bd (Initial commit)
// Routing
app.use('/auth', authRouters);
app.use('/dashboard', dashboardRouters);
app.use('/vehiculos', vehiculosRouter);
<<<<<<< HEAD
app.use('/marcos', marcasRouter);
=======
app.use('/marcas', marcasRouter);
app.use('/cotizaciones', cotizacionRouter);
>>>>>>> 77a15bd (Initial commit)

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
<<<<<<< HEAD
      console.log('Servidor escuchando en el puerto ' +app.get('port') );
=======
      console.log('Servidor escuchando en el puerto ' + app.get('port'));
>>>>>>> 77a15bd (Initial commit)
    });
  })
  .catch((error) => {
    console.log('Error al conectar con la base de datos:', error);
  });

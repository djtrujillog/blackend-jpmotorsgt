// Importar módulos
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/config.mjs'; // Asegúrate de que el path sea correcto
import authRouters from './routes/auth.routes.mjs';
import dashboardRouters from './routes/dashboard.routes.mjs';
import vehiculosRouter from './routes/vehiculo.routes.mjs';
import marcasRouter from './routes/marca.routes.mjs';
import cotizacionRouter from './routes/cotizacion.routes.mjs'; // Asegúrate de que el nombre del archivo sea correcto

// Crear instancia de Express
const app = express();

// Configurar puerto utilizando variable de entorno o puerto 4000 por defecto
app.set('port', process.env.PORT || 4000);

// Middleware para permitir solicitudes CORS
app.use(cors());

// Middleware para analizar las solicitudes entrantes (body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta de prueba
app.get('/', (req, res) => res.json({ message: 'API JP Motors GT' }));

// Configuración de rutas
app.use('/auth', authRouters);
app.use('/dashboard', dashboardRouters);
app.use('/vehiculos', vehiculosRouter);
app.use('/marcas', marcasRouter);
app.use('/cotizaciones', cotizacionRouter);

// Conectar a la base de datos y sincronizar Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');

    // Iniciar la sincronización de Sequelize (puedes establecer force: true para sincronizar forzadamente en desarrollo)
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Base de datos sincronizada.');

    // Iniciar el servidor
    app.listen(app.get('port'), () => {
      console.log(`Servidor escuchando en el puerto ${app.get('port')}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

export default app;

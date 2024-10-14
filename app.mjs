// app.mjs
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/config.mjs';
import authRouters from './routes/auth.routes.mjs';
import dashboardRouters from './routes/dashboard.routes.mjs';
import vehiculosRouter from './routes/vehiculo.routes.mjs';
import marcasRouter from './routes/marca.routes.mjs';
import cotizacionRouter from './routes/cotizacion.Routes.mjs';
import empleadosRouter from './routes/empleados.routes.mjs';
import clienteRouter from './routes/cliente.routes.mjs';
import seguimientoRouter from './routes/seguimiento.routes.mjs';
const app = express();
import mailRouter from './routes/mail.routes.mjs';  // Importa la nueva ruta de correo


app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ message: 'API JP Motors GT Octubre 13 2024 By J&M' }));

app.use('/auth', authRouters);
app.use('/dashboard', dashboardRouters);
app.use('/vehiculos', vehiculosRouter);
app.use('/marcas', marcasRouter);
app.use('/cotizaciones', cotizacionRouter);
app.use('/empleados', empleadosRouter);
app.use('/clientes', clienteRouter);
app.use('/seguimientos', seguimientoRouter);
app.use('/mail', mailRouter);  // Usa la nueva ruta de correo


sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Base de datos sincronizada.');
    app.listen(app.get('port'), () => {
      console.log(`Servidor escuchando en el puerto ${app.get('port')}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

export default app;

import { Router } from 'express';
import nodeMailer from '../controllers/mail/nodeMailer.mjs';
import CotizacionMailer from '../controllers/mail/CotizarMailer.mjs';
import cors from 'cors';

const router = Router();

router.use(cors()); // Habilitar CORS para todas las rutas

// Ruta para enviar correos normales
router.post('/send', async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const result = await nodeMailer.sendMail({ to, subject, message });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
});

// Ruta para solicitar cotización
router.post('/cotizacion', async (req, res) => {
  const { nombre, apellido, direccion, telefono, email, marca, modelo } = req.body;

  if (!nombre || !apellido || !direccion || !telefono || !email || !marca || !modelo) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const result = await CotizacionMailer.sendCotizacion({ nombre, apellido, direccion, telefono, email, marca, modelo });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al enviar la cotización', error: error.message });
  }
});

export default router;

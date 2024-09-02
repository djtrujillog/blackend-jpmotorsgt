import { Router } from 'express';
// import nodeMailer from '../services/nodeMailer.mjs'; // Asegúrate de que tu servicio esté en .mjs
import nodeMailer from '../controllers/mail/nodeMailer.mjs';

const router = Router();

router.post('/send', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const result = await nodeMailer.sendMail({ to, subject, message });
    res.status(200).json({ success: true, message: 'Email sent successfully', result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
});

export default router;

import nodemailer from 'nodemailer';
import 'dotenv/config';

class CotizacionMailer {
    static async sendCotizacion({ nombre, apellido, direccion, telefono, email, marca, modelo }) {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_COTIZACION, // Correo que recibirá las cotizaciones
            bcc: 'contacto@jpmotorsgt.com, prosado@jpmotorsgt.com',
            subject: `Solicitud de cotización para ${marca} ${modelo}`,
            text: `
                Solicitud de cotización de:
                Nombre: ${nombre} ${apellido}
                Dirección: ${direccion}
                Teléfono: ${telefono}
                Email: ${email}
                Marca y Modelo: ${marca} ${modelo}
            `,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            return { success: true, message: 'Cotización enviada exitosamente', info };
        } catch (error) {
            return { success: false, message: 'Error al enviar la cotización', error: error.message };
        }
    }
}

export default CotizacionMailer;

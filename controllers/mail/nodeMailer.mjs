import nodemailer from 'nodemailer';
import 'dotenv/config'; // Asegúrate de que esto esté al principio del archivo

class nodeMailer {
    static async sendMail({ to, subject, message }) {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465, // true para port 465, false para otros puertos
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to, // Destinatario principal
            bcc: 'contacto@jpmotorsgt.com, prosado@jpmotorsgt.com', // 
            subject,
            text: message,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            return { success: true, message: 'Email sent successfully', info };
        } catch (error) {
            return { success: false, message: 'Failed to send email', error: error.message };
        }
    }

    static async getMailStatus(id) {
        return { id, status: 'delivered' };
    }
}

export default nodeMailer;

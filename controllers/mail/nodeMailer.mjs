import nodemailer from 'nodemailer';
import 'dotenv/config';

class nodeMailer {
    static async sendMail({ to, subject, message }) {
        if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            return { success: false, message: 'Missing email configuration in environment variables' };
        }

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
            to,
            bcc: 'contacto@jpmotorsgt.com, prosado@jpmotorsgt.com',
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

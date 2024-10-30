import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendConfirmationEmail = async (email: string, userId: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const confirmationLink = `http://localhost:5000/api/users/confirm-email/${userId}`; // Cambia esto según tu configuración

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Confirma tu correo',
        text: `Por favor, confirma tu correo haciendo clic en el siguiente enlace: ${confirmationLink}`
    };

    await transporter.sendMail(mailOptions);
};

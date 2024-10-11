import nodemailer from 'nodemailer';
import { env } from './env.js';
import { SMTP } from '../constans/index.js';

const transporte = nodemailer.createTransport({
    host: env(SMTP.SMTP_HOST),
    port: env(SMTP.SMTP_PORT),
    auth: {
        user: env(SMTP.SMTP_USER),
        pass: env(SMTP.SMTP_PASSWORD)
    }
});

export const sendMail = async (options) => {
    return await transporte.sendMail(options);
};

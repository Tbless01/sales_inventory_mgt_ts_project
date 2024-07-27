import dotenv from 'dotenv';

dotenv.config();

export const mailConfig = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  secure: process.env.MAIL_SECURE === 'true',
  debug: process.env.MAIL_DEBUG === 'true',
};

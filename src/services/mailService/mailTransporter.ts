import nodemailer from 'nodemailer';
import { promises as fs } from 'fs';
import { mailConfig } from '../../config/mailConfig';
import path from 'path';
import { MailRequest } from '../../models/MailRequest';

const transporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  secure: mailConfig.secure,
  auth: {
    user: mailConfig.auth.user,
    pass: mailConfig.auth.pass,
  },
  debug: mailConfig.debug,
  logger: mailConfig.debug,
});

export const sendMail = async (mailRequest: MailRequest): Promise<void> => {
  const mailOptions = {
    from: mailConfig.auth.user,
    to: mailRequest.recipient,
    subject: mailRequest.subject,
    html: mailRequest.mailBody,
  };

  await transporter.sendMail(mailOptions);
  console.log('Message sent to %s', mailRequest.recipient);
};

export const getFileTemplateFromClasspath = async (filePath: string): Promise<string> => {
  const fullPath = path.join(__dirname, filePath);
  return fs.readFile(fullPath, 'utf-8');
};

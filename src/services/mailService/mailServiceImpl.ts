import { sendMail, getFileTemplateFromClasspath } from './mailTransporter';
// import { encryptionService } from './encryptionService';
// import { configProperties } from '../../config/mailConfig';
import { MailRequest } from '../../models/MailRequest';

const PROFILE_USER_ACTIVATION_EMAIL_TEMPLATE_LOCATION = '../../templates/email-template.html';
const USER_ACTIVATION_EMAIL_SUBJECT = 'User Activation Email';
const USER_ACTIVATION_EMAIL_SENT_SUCCESSFULLY = 'User activation email sent successfully.';

export const sendProfileUserActivationEmail = async (profileUsername: string, name:string): Promise<{ status: number; message: string }> => {
  try {
    // const link = configProperties.verificationLinkUrl;
    // const encryptedEmail = encryptionService.encryptEmailAddress(profileUsername);
    const template = await getFileTemplateFromClasspath(PROFILE_USER_ACTIVATION_EMAIL_TEMPLATE_LOCATION);
    // const mailBody = template.replace('{link}', link).replace('{encryptedEmail}', encryptedEmail);
    const mailBody = template.replace('{name}', name).replace('{encryptedEmail}', profileUsername);

    const mailRequest: MailRequest = {
      subject: USER_ACTIVATION_EMAIL_SUBJECT,
      recipient: profileUsername,
      mailBody: mailBody,
    };

    await sendMail(mailRequest);

    const response: { status: number; message: string } = {
        status: 200,
        message: USER_ACTIVATION_EMAIL_SENT_SUCCESSFULLY,
      };
    console.log(USER_ACTIVATION_EMAIL_SENT_SUCCESSFULLY, mailRequest.recipient);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

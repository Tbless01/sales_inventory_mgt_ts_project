"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendProfileUserActivationEmail = void 0;
const mailTransporter_1 = require("./mailTransporter");
const PROFILE_USER_ACTIVATION_EMAIL_TEMPLATE_LOCATION = '../../templates/email-template.html';
const USER_ACTIVATION_EMAIL_SUBJECT = 'User Activation Email';
const USER_ACTIVATION_EMAIL_SENT_SUCCESSFULLY = 'User activation email sent successfully.';
const sendProfileUserActivationEmail = (profileUsername, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const link = configProperties.verificationLinkUrl;
        // const encryptedEmail = encryptionService.encryptEmailAddress(profileUsername);
        const template = yield (0, mailTransporter_1.getFileTemplateFromClasspath)(PROFILE_USER_ACTIVATION_EMAIL_TEMPLATE_LOCATION);
        // const mailBody = template.replace('{link}', link).replace('{encryptedEmail}', encryptedEmail);
        const mailBody = template.replace('{name}', name).replace('{encryptedEmail}', profileUsername);
        const mailRequest = {
            subject: USER_ACTIVATION_EMAIL_SUBJECT,
            recipient: profileUsername,
            mailBody: mailBody,
        };
        yield (0, mailTransporter_1.sendMail)(mailRequest);
        const response = {
            status: 200,
            message: USER_ACTIVATION_EMAIL_SENT_SUCCESSFULLY,
        };
        console.log(USER_ACTIVATION_EMAIL_SENT_SUCCESSFULLY, mailRequest.recipient);
        return response;
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
});
exports.sendProfileUserActivationEmail = sendProfileUserActivationEmail;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileTemplateFromClasspath = exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = require("fs");
const mailConfig_1 = require("../../config/mailConfig");
const path_1 = __importDefault(require("path"));
const transporter = nodemailer_1.default.createTransport({
    host: mailConfig_1.mailConfig.host,
    port: mailConfig_1.mailConfig.port,
    secure: mailConfig_1.mailConfig.secure,
    auth: {
        user: mailConfig_1.mailConfig.auth.user,
        pass: mailConfig_1.mailConfig.auth.pass,
    },
    debug: mailConfig_1.mailConfig.debug,
    logger: mailConfig_1.mailConfig.debug,
});
const sendMail = (mailRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: mailConfig_1.mailConfig.auth.user,
        to: mailRequest.recipient,
        subject: mailRequest.subject,
        html: mailRequest.mailBody,
    };
    yield transporter.sendMail(mailOptions);
    console.log('Message sent to %s', mailRequest.recipient);
});
exports.sendMail = sendMail;
const getFileTemplateFromClasspath = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fullPath = path_1.default.join(__dirname, filePath);
    return fs_1.promises.readFile(fullPath, 'utf-8');
});
exports.getFileTemplateFromClasspath = getFileTemplateFromClasspath;

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
exports.UserService = void 0;
const userRepository_1 = require("../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfig_1 = require("../config/jwtConfig");
const mailServiceImpl_1 = require("../services/mailService/mailServiceImpl");
const userRepository = new userRepository_1.UserRepository();
class UserService {
    createUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield userRepository.findByUsername(username);
            if (userFound) {
                throw new Error(`User with username ${username} already exists`);
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = { id: 0, username, password: hashedPassword };
            yield userRepository.create(user);
        });
    }
    getUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield userRepository.findByUsername(username);
            const response = yield (0, mailServiceImpl_1.sendProfileUserActivationEmail)(username, "IBK");
            console.log('Response:', response);
            return userFound;
        });
    }
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findByUsername(username);
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                throw new Error('Invalid username or password');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, jwtConfig_1.jwtConfig.secret, { expiresIn: jwtConfig_1.jwtConfig.expiresIn });
            return token;
        });
    }
    getAll(pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository.getAll(pageNumber, pageSize);
        });
    }
}
exports.UserService = UserService;

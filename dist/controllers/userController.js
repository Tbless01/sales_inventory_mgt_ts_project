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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const userService = new userService_1.UserService();
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                yield userService.createUser(username, password);
                const savedUser = yield userService.getUser(username); // Await here to resolve the promise
                if (savedUser) {
                    const { password } = savedUser, userWithoutPassword = __rest(savedUser, ["password"]); // Exclude password from the response
                    res.status(201).json({
                        data: userWithoutPassword,
                        message: 'User registered successfully'
                    });
                }
                else {
                    res.status(404).json({ message: 'User not found after registration' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({ message: error.message });
                }
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const token = yield userService.loginUser(username, password);
                res.status(200).json({ status: res.status,
                    token: token });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({ message: error.message });
                }
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 10;
            try {
                const users = yield userService.getAll(pageNumber, pageSize);
                // Exclude passwords from the response
                const usersWithoutPasswords = users.map(user => {
                    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                    return userWithoutPassword;
                });
                res.status(200).json({
                    data: usersWithoutPasswords,
                    message: 'Users retrieved successfully'
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({ message: error.message });
                }
            }
        });
    }
}
exports.UserController = UserController;

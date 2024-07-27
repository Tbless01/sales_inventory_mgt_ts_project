"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whitelistMiddleware = exports.authenticateToken = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfig_1 = require("../config/jwtConfig");
const appMiddleware = (0, express_1.default)();
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token missing or invalid' });
    }
    jsonwebtoken_1.default.verify(token, jwtConfig_1.jwtConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}
exports.authenticateToken = authenticateToken;
function whitelistMiddleware(req, res, next) {
    const allowedEndpoints = ['/api/login', '/api/register'];
    if (allowedEndpoints.includes(req.path)) {
        next();
    }
    else {
        res.status(403).json({ message: 'Access Forbidden' });
    }
}
exports.whitelistMiddleware = whitelistMiddleware;
exports.default = appMiddleware;

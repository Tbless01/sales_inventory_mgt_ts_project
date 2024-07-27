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
exports.UserRepository = void 0;
const dbConfig_1 = require("../config/dbConfig");
class UserRepository {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConfig_1.pool.query('INSERT INTO user (username, password) VALUES (?, ?)', [user.username, user.password]);
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield dbConfig_1.pool.query('SELECT * FROM user WHERE username = ?', [username]);
            return rows.length > 0 ? rows[0] : null;
        });
    }
    getAll(pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (pageNumber - 1) * pageSize;
            const [rows] = yield dbConfig_1.pool.query('SELECT * FROM user LIMIT ? OFFSET ?', [pageSize, offset]);
            return rows;
        });
    }
}
exports.UserRepository = UserRepository;

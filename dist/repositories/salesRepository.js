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
exports.SalesRepository = void 0;
const dbConfig_1 = require("../config/dbConfig");
class SalesRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield dbConfig_1.pool.query('SELECT * FROM sales');
            return rows;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield dbConfig_1.pool.query('SELECT * FROM sales WHERE id = ?', [id]);
            return rows[0] || null;
        });
    }
    create(sale) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield dbConfig_1.pool.query('INSERT INTO sales (productId, quantity, saleDate) VALUES (?, ?, ?)', [sale.productId, sale.quantity, sale.saleDate]);
                const insertedId = result.insertId;
                const insertedSale = Object.assign(Object.assign({}, sale), { id: insertedId });
                return insertedSale;
            }
            catch (error) {
                console.error('Error inserting sale:', error);
                throw error;
            }
        });
    }
    update(id, sale) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConfig_1.pool.query('UPDATE sales SET productId = ?, quantity = ?, saleDate = ? WHERE id = ?', [sale.productId, sale.quantity, sale.saleDate, id]);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConfig_1.pool.query('DELETE FROM sales WHERE id = ?', [id]);
        });
    }
}
exports.SalesRepository = SalesRepository;

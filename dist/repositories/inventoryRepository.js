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
exports.InventoryRepository = void 0;
const dbConfig_1 = require("../config/dbConfig");
class InventoryRepository {
    getAll(pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (pageNumber - 1) * pageSize;
            const [rows] = yield dbConfig_1.pool.query('SELECT * FROM inventory LIMIT ? OFFSET ?', [pageSize, offset]);
            return rows;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield dbConfig_1.pool.query('SELECT * FROM inventory WHERE id = ?', [id]);
            return rows[0];
        });
    }
    create(inventory) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConfig_1.pool.query('INSERT INTO inventory (productName, quantity, price) VALUES (?, ?, ?)', [inventory.productName, inventory.quantity, inventory.price]);
        });
    }
    update(id, inventory) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = [];
            const values = [];
            if (inventory.productName !== undefined) {
                fields.push('productName = ?');
                values.push(inventory.productName);
            }
            if (inventory.quantity !== undefined) {
                fields.push('quantity = ?');
                values.push(inventory.quantity);
            }
            if (inventory.price !== undefined) {
                fields.push('price = ?');
                values.push(inventory.price);
            }
            if (fields.length === 0) {
                throw new Error('No fields to update');
            }
            values.push(id);
            const query = `UPDATE inventory SET ${fields.join(', ')} WHERE id = ?`;
            yield dbConfig_1.pool.query(query, values);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConfig_1.pool.query('DELETE FROM inventory WHERE id = ?', [id]);
        });
    }
}
exports.InventoryRepository = InventoryRepository;

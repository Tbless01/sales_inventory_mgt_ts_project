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
exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '86248624',
    database: 'sales_inventory_db_ts',
};
exports.pool = promise_1.default.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
function createSalesTable() {
    return __awaiter(this, void 0, void 0, function* () {
        let conn;
        try {
            conn = yield exports.pool.getConnection();
            yield conn.query(`
      CREATE TABLE IF NOT EXISTS sales (
        id INT AUTO_INCREMENT PRIMARY KEY,
        productId INT NOT NULL,
        quantity INT NOT NULL,
        saleDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (productId) REFERENCES inventory(id)
      )
    `);
            console.log('Sales table created successfully');
        }
        catch (error) {
            console.error('Error creating sales table:', error);
        }
        finally {
            if (conn)
                conn.release();
        }
    });
}
function createInventoryTable() {
    return __awaiter(this, void 0, void 0, function* () {
        let conn;
        try {
            conn = yield exports.pool.getConnection();
            yield conn.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        productName VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      )
    `);
            console.log('Inventory table created successfully');
        }
        catch (error) {
            console.error('Error creating inventory table:', error);
        }
        finally {
            if (conn)
                conn.release();
        }
    });
}
function createUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        let conn;
        try {
            conn = yield exports.pool.getConnection();
            yield conn.query(`
        CREATE TABLE IF NOT EXISTS user (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
        )
      `);
            console.log('User table created successfully');
        }
        catch (error) {
            console.error('Error creating user table:', error);
        }
        finally {
            if (conn)
                conn.release();
        }
    });
}
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield createInventoryTable();
            yield createSalesTable();
            yield createUserTable();
        }
        catch (error) {
            console.error('Error creating tables:', error);
        }
    });
}
createTables();

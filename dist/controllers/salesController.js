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
exports.SalesController = void 0;
const salesService_1 = require("../services/salesService");
const inventoryService_1 = require("../services/inventoryService");
const salesService = new salesService_1.SalesService();
const inventoryService = new inventoryService_1.InventoryService();
class SalesController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = yield salesService.getAll();
            res.json(sales);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const sale = yield salesService.getById(id);
            if (sale) {
                res.json(sale);
            }
            else {
                res.status(404).send('Sale not found');
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newSale = req.body;
                const product = yield inventoryService.getById(newSale.productId);
                if (!product)
                    throw new Error('Product not found');
                const currentDate = new Date();
                newSale.saleDate = currentDate;
                const createdSale = yield salesService.create(newSale);
                const sale = yield salesService.getById(createdSale.id);
                res.status(201).json({ data: sale, message: 'Sale successfully created' });
            }
            catch (error) {
                console.error('Error creating sale:', error);
                if (error instanceof Error) {
                    res.status(400).json({ message: error.message });
                }
                else {
                    // Handle unknown or unexpected errors
                    res.status(500).json({ message: 'An unexpected error occurred' });
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const updatedSale = req.body;
            yield salesService.update(id, updatedSale);
            res.send('Sale updated');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            yield salesService.delete(id);
            res.send('Sale deleted');
        });
    }
}
exports.SalesController = SalesController;

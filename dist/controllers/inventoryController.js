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
exports.InventoryController = void 0;
const inventoryService_1 = require("../services/inventoryService");
const inventoryService = new inventoryService_1.InventoryService();
class InventoryController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 10;
            try {
                const inventories = yield inventoryService.getAll(pageNumber, pageSize);
                res.json(inventories);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({ message: error.message });
                }
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const inventory = yield inventoryService.getById(id);
            if (inventory) {
                res.json(inventory);
            }
            else {
                res.status(404).send('Inventory not found');
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newInventory = req.body;
            yield inventoryService.create(newInventory);
            res.status(201).send('Inventory created');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const updatedInventory = req.body;
            try {
                yield inventoryService.update(id, updatedInventory);
                const updatedItem = yield inventoryService.getById(id);
                res.status(200).json({
                    data: updatedItem,
                    message: 'Inventory item updated successfully',
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({ message: error.message });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            try {
                yield inventoryService.delete(id);
                res.status(200).json({ message: 'Inventory successfully deleted' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({ message: error.message });
                }
            }
        });
    }
}
exports.InventoryController = InventoryController;

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
exports.InventoryService = void 0;
const inventoryRepository_1 = require("../repositories/inventoryRepository");
const inventoryRepository = new inventoryRepository_1.InventoryRepository();
class InventoryService {
    getAll(pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield inventoryRepository.getAll(pageNumber, pageSize);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield inventoryRepository.getById(id);
        });
    }
    create(inventory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield inventoryRepository.create(inventory);
        });
    }
    update(id, inventory) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingItem = yield inventoryRepository.getById(id);
            if (!existingItem) {
                throw new Error(`Inventory item with id ${id} not found`);
            }
            return yield inventoryRepository.update(id, inventory);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingItem = yield inventoryRepository.getById(id);
            if (!existingItem) {
                throw new Error(`Inventory item with id ${id} not found`);
            }
            return yield inventoryRepository.delete(id);
        });
    }
}
exports.InventoryService = InventoryService;

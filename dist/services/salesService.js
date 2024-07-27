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
exports.SalesService = void 0;
const salesRepository_1 = require("../repositories/salesRepository");
const salesRepository = new salesRepository_1.SalesRepository();
class SalesService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield salesRepository.getAll();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield salesRepository.getById(id);
        });
    }
    create(newSale) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertedSale = yield salesRepository.create(newSale);
            const createdSale = yield this.getById(insertedSale.id);
            if (!createdSale) {
                throw new Error('Failed to fetch newly created sale');
            }
            return createdSale;
        });
    }
    update(id, sale) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield salesRepository.update(id, sale);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield salesRepository.delete(id);
        });
    }
}
exports.SalesService = SalesService;

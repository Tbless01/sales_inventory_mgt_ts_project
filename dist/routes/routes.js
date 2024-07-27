"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventoryController_1 = require("../controllers/inventoryController");
const salesController_1 = require("../controllers/salesController");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const inventoryController = new inventoryController_1.InventoryController();
const salesController = new salesController_1.SalesController();
const userController = new userController_1.UserController();
// Inventory routes
router.get('/inventory', authMiddleware_1.authenticateToken, (req, res) => inventoryController.getAll(req, res));
router.get('/inventory/:id', authMiddleware_1.authenticateToken, (req, res) => inventoryController.getById(req, res));
router.post('/inventory', authMiddleware_1.authenticateToken, (req, res) => inventoryController.create(req, res));
router.put('/inventory/:id', authMiddleware_1.authenticateToken, (req, res) => inventoryController.update(req, res));
router.delete('/inventory/:id', authMiddleware_1.authenticateToken, (req, res) => inventoryController.delete(req, res));
// Sales routes
router.get('/sales', authMiddleware_1.authenticateToken, (req, res) => salesController.getAll(req, res));
router.get('/sales/:id', authMiddleware_1.authenticateToken, (req, res) => salesController.getById(req, res));
router.post('/sales', authMiddleware_1.authenticateToken, (req, res) => salesController.create(req, res));
router.put('/sales/:id', authMiddleware_1.authenticateToken, (req, res) => salesController.update(req, res));
router.delete('/sales/:id', authMiddleware_1.authenticateToken, (req, res) => salesController.delete(req, res));
// router.put('/inventory/:id', authenticateToken, (req, res) => inventoryController.update(req, res));
router.post('/register', (req, res) => userController.register(req, res));
router.get('/login', (req, res) => userController.login(req, res));
router.get('/users', authMiddleware_1.authenticateToken, (req, res) => userController.getAll(req, res));
exports.default = router;

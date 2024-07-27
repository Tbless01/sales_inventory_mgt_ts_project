import { Router } from 'express';
import { InventoryController } from '../controllers/inventoryController';
import { SalesController } from '../controllers/salesController';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const inventoryController = new InventoryController();
const salesController = new SalesController();
const userController = new UserController();

// Inventory routes
router.get('/inventory', authenticateToken, (req, res) => inventoryController.getAll(req, res));
router.get('/inventory/:id', authenticateToken, (req, res) => inventoryController.getById(req, res));
router.post('/inventory', authenticateToken, (req, res) => inventoryController.create(req, res));
router.put('/inventory/:id', authenticateToken, (req, res) => inventoryController.update(req, res));
router.delete('/inventory/:id', authenticateToken, (req, res) => inventoryController.delete(req, res));

// Sales routes
router.get('/sales', authenticateToken, (req, res) => salesController.getAll(req, res));
router.get('/sales/:id', authenticateToken, (req, res) => salesController.getById(req, res));
router.post('/sales', authenticateToken, (req, res) => salesController.create(req, res));
router.put('/sales/:id', authenticateToken, (req, res) => salesController.update(req, res));
router.delete('/sales/:id', authenticateToken, (req, res) => salesController.delete(req, res));


// router.put('/inventory/:id', authenticateToken, (req, res) => inventoryController.update(req, res));

router.post('/register', (req, res) => userController.register(req, res));
router.get('/login', (req, res) => userController.login(req, res));
router.get('/users', authenticateToken, (req, res) => userController.getAll(req, res));

export default router;

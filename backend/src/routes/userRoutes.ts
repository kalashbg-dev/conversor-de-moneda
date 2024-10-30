import express from 'express';
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { Roles } from '../constants/roles';

const router = express.Router();

// Rutas de autenticación
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Rutas para gestionar usuarios (solo para ADMIN)
const adminRouter = express.Router();
adminRouter.use(authMiddleware, roleMiddleware([Roles.ADMIN]));

adminRouter.get('/', userController.getAllUsers);
adminRouter.get('/:id', userController.getUserById);
adminRouter.put('/:id', userController.updateUser);
adminRouter.delete('/:id', userController.deleteUser);

// Apuntar las rutas del admin al router principal
router.use('/admin', adminRouter);

export default router;

import express from 'express';
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { Roles } from '../constants/roles';
import { userSchema } from '../validators/userValidator';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Rutas de autenticación
router.post('/register', validateRequest(userSchema), userController.registerUser);
router.post('/login', userController.loginUser);

// Ruta para confirmar el correo
router.get('/confirm-email/:userId', userController.confirmEmail);

// Rutas para gestionar usuarios (solo para ADMIN)
const adminRouter = express.Router();
adminRouter.use(authMiddleware, roleMiddleware([Roles.ADMIN]));

adminRouter.get('/', userController.getAllUsers);
adminRouter.get('/:id', userController.getUserById);
adminRouter.put('/:id', validateRequest(userSchema), userController.updateUser);
adminRouter.delete('/:id', userController.deleteUser);

// Apuntar las rutas del admin al router principal
router.use('/admin', adminRouter);

export default router;
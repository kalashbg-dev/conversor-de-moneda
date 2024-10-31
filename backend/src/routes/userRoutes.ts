import { Router } from 'express'
import * as userController from '../controllers/userController'
import { authMiddleware } from '../middleware/authMiddleware'
import { roleMiddleware } from '../middleware/roleMiddleware'
import { Roles } from '../constants/roles'
import { userSchema, authSchema } from '../validators/userValidator'
import { validateRequest } from '../middleware/validateRequest'

const router = Router()

// Rutas de autenticación
router.post('/register', validateRequest(userSchema), userController.registerUser)
router.post('/login', validateRequest(authSchema), userController.loginUser)

// Ruta para confirmar el correo
router.get('/confirm-email/:userId', userController.confirmEmail)

// Rutas para gestionar usuarios (solo para ADMIN)
const adminRouter = Router()
router.use(authMiddleware, roleMiddleware([Roles.ADMIN]))

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.put('/:id', validateRequest(userSchema), userController.updateUser)
router.delete('/:id', userController.deleteUser)

// Apuntar las rutas del admin al router principal
router.use('/admin', adminRouter)

export default router

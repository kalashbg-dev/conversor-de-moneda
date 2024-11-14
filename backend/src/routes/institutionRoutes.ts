import { Router } from 'express';
import {
  createInstitution,
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution,
} from '../controllers/institutionController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { Roles } from '../constants/roles';
// import { institutionSchema } from '../validators/institutionValidator';
import { validateRequest } from '../middleware/validateRequest';
import { institutionSchema } from '../validators/institutionValidator';

const router = Router();



// Rutas protegidas para crear, actualizar y eliminar instituciones
router.use(authMiddleware, roleMiddleware([Roles.ADMIN||Roles.USER])); // Middleware para proteger las siguientes rutas
router.get('/', getAllInstitutions); // Acceso público para obtener todas las instituciones
router.get('/:id', getInstitutionById); // Acceso público para obtener una institución específica
router.post('/',  validateRequest(institutionSchema),createInstitution);
router.put('/:id',  validateRequest(institutionSchema), updateInstitution);
router.delete('/:id', deleteInstitution);

export default router;

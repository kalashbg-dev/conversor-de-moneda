import { Router } from 'express';
import {
  createInstitutionExchangeRate,
  getAllInstitutionExchangeRates,
  getInstitutionExchangeRateById,
  updateInstitutionExchangeRate,
  deleteInstitutionExchangeRate,
} from '../controllers/institutionExchangeRateController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { Roles } from '../constants/roles';
// import { institutionExchangeRateSchema } from '../validators/institutionExchangeRateValidator';
import { validateRequest } from '../middleware/validateRequest';
import { institutionExchangeRateValidator } from '../validators/institutionExchangeRateValidator';

const router = Router();

// Rutas públicas para obtener las tasas de cambio específicas de la institución

// Rutas protegidas para crear, actualizar y eliminar tasas de cambio de institución
router.use(authMiddleware, roleMiddleware([Roles.ADMIN])); // Middleware para proteger las siguientes rutas
router.get('/', getAllInstitutionExchangeRates); // Ver todas las tasas de cambio para instituciones
router.get('/:id', getInstitutionExchangeRateById); // Ver una tasa de cambio específica para institución
router.post('/', validateRequest(institutionExchangeRateValidator), createInstitutionExchangeRate); // Crear tasa de cambio específica de institución
router.put('/:id', validateRequest(institutionExchangeRateValidator),updateInstitutionExchangeRate); // Actualizar tasa de cambio específica de institución
router.delete('/:id', deleteInstitutionExchangeRate); // Eliminar tasa de cambio específica de institución

// Exportar las rutas
export default router;

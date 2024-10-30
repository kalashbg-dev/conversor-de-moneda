import { Router } from 'express';
import {
  createExchangeRate,
  getAllExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
} from '../controllers/exchangeRateController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { Roles } from '../constants/roles';

const router = Router();

// Rutas de tasas de cambio
router.get('/', getAllExchangeRates); // Acceso público para ver todas las tasas de cambio
router.get('/:id', getExchangeRateById); // Acceso público para ver una tasa de cambio específica

// Rutas protegidas para crear, actualizar y eliminar tasas de cambio
router.use(authMiddleware, roleMiddleware([Roles.ADMIN])); // Middleware para proteger las siguientes rutas
router.post('/', createExchangeRate);
router.put('/:id', updateExchangeRate);
router.delete('/:id', deleteExchangeRate);

export default router;

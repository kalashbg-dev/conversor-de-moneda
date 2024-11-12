import { Router } from 'express';
import {
  getExchangeRateHistory,
} from '../controllers/exchangeRateHistoryController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { Roles } from '../constants/roles';

const router = Router();

// Rutas públicas para obtener el historial de tasas de cambio
router.get('/', authMiddleware, getExchangeRateHistory); // Ver todo el historial de tasas de cambio
// router.get('/:id', getExchangeRateHistoryById); // Ver historial de una tasa de cambio específica

// Rutas protegidas para acceder a los historiales (solo ADMIN)
router.use(authMiddleware, roleMiddleware([Roles.ADMIN])); // Middleware para proteger las siguientes rutas

// Exportar las rutas
export default router;

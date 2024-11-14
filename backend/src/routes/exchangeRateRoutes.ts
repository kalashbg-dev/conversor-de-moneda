import { Router } from "express";
import {
  createExchangeRate,
  getAllExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
} from "../controllers/exchangeRateController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Roles } from "../constants/roles";
import { exchangeRateSchema } from "../validators/exchangeRateValidator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Exchange Rates
 *   description: API for managing exchange rates
 */

/**
 * @swagger
 * /exchange-rates:
 *   get:
 *     summary: Get all exchange rates
 *     tags: [Exchange Rates]
 *     responses:
 *       200:
 *         description: List of exchange rates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExchangeRate'
 */

// Rutas de tasas de cambio
router.get("/", getAllExchangeRates); // Acceso público para ver todas las tasas de cambio

/**
 * @swagger
 * /exchange-rates/{id}:
 *   get:
 *     summary: Get exchange rate by ID
 *     tags: [Exchange Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Exchange rate ID
 *     responses:
 *       200:
 *         description: Exchange rate found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeRate'
 *       404:
 *         description: Exchange rate not found
 */

router.get("/:id", getExchangeRateById); // Acceso público para ver una tasa de cambio específica

// Rutas protegidas para crear, actualizar y eliminar tasas de cambio
router.use(authMiddleware, roleMiddleware([Roles.ADMIN])); // Middleware para proteger las siguientes rutas

/**
 * @swagger
 * /exchange-rates:
 *   post:
 *     summary: Create a new exchange rate
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExchangeRate'
 *     responses:
 *       201:
 *         description: Exchange rate created
 *       400:
 *         description: Bad request
 */

router.post("/", validateRequest(exchangeRateSchema), createExchangeRate);

/**
 * @swagger
 * /exchange-rates/{id}:
 *   put:
 *     summary: Update an exchange rate
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Exchange rate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExchangeRate'
 *     responses:
 *       200:
 *         description: Exchange rate updated
 *       404:
 *         description: Exchange rate not found
 */

router.put("/:id", validateRequest(exchangeRateSchema), updateExchangeRate);

/**
 * @swagger
 * /exchange-rates/{id}:
 *   delete:
 *     summary: Delete an exchange rate
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Exchange rate ID
 *     responses:
 *       200:
 *         description: Exchange rate deleted
 *       404:
 *         description: Exchange rate not found
 */

router.delete("/:id", deleteExchangeRate);
export default router;

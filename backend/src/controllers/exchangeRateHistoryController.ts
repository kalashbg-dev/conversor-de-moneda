import { Request, Response } from "express";
import ExchangeRateHistory from "../models/ExchangeRateHistory";

/**
 * @swagger
 * tags:
 *   name: ExchangeRateHistory
 *   description: Endpoints para gestionar el historial de tasas de cambio
 */

/**
 * @swagger
 * /exchange-rate-history:
 *   get:
 *     summary: Obtener el historial completo de tasas de cambio
 *     tags: [ExchangeRateHistory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial de tasas de cambio obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64d9f8123e7a4b3e8f9c8a73"
 *                   currencyFrom:
 *                     type: string
 *                     example: "USD"
 *                   currencyTo:
 *                     type: string
 *                     example: "EUR"
 *                   exchangeRate:
 *                     type: number
 *                     example: 0.89
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-01T14:35:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-02T10:15:00Z"
 *       404:
 *         description: No se encontraron tasas de cambio en el historial
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontraron tasas de cambio en el historial"
 *       500:
 *         description: Error al obtener el historial de tasas de cambio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener el historial de tasas de cambio"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

// Controlador para obtener el historial de tasas de cambio
export const getExchangeRateHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Consultar el historial de tasas de cambio ordenado por fecha de creación (o timestamp)
    const exchangeRateHistory = await ExchangeRateHistory.find().sort({
      createdAt: -1,
    }); // Orden descendente por fecha de creación

    if (!exchangeRateHistory || exchangeRateHistory.length === 0) {
      res
        .status(404)
        .json({ message: "No se encontraron tasas de cambio en el historial" });
      return;
    }

    // Responder con el historial de tasas de cambio
    res.status(200).json(exchangeRateHistory);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el historial de tasas de cambio",
      error,
    });
  }
};

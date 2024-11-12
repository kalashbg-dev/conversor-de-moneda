import { Request, Response } from 'express';
import ExchangeRateHistory from '../models/ExchangeRateHistory';

// Controlador para obtener el historial de tasas de cambio
export const getExchangeRateHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    // Consultar el historial de tasas de cambio ordenado por fecha de creación (o timestamp)
    const exchangeRateHistory = await ExchangeRateHistory.find().sort({ createdAt: -1 }); // Orden descendente por fecha de creación

    if (!exchangeRateHistory || exchangeRateHistory.length === 0) {
      res.status(404).json({ message: 'No se encontraron tasas de cambio en el historial' });
      return;
    }

    // Responder con el historial de tasas de cambio
    res.status(200).json(exchangeRateHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el historial de tasas de cambio', error });
  }
};

// src/controllers/exchangeRateController.ts
import { Request, Response } from 'express';
import ExchangeRate from '../models/ExchangeRate';

// Helper function to handle responses
const handleResponse = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json(data);
};

// Helper function to handle errors
const handleError = (res: Response, error: any, message: string) => {
  console.error(message, error);
  res.status(500).json({ error: message });
};

// Crear una nueva tasa de cambio
export const createExchangeRate = async (req: Request, res: Response) => {
  const { currencyFrom, currencyTo, exchangeRate } = req.body;
  try {
    const newExchangeRate = new ExchangeRate({ currencyFrom, currencyTo, exchangeRate });
    const savedExchangeRate = await newExchangeRate.save();
    handleResponse(res, 201, savedExchangeRate);
  } catch (error) {
    handleError(res, error, 'Error al crear la tasa de cambio');
  }
};

// Obtener todas las tasas de cambio
export const getAllExchangeRates = async (req: Request, res: Response) => {
  try {
    const exchangeRates = await ExchangeRate.find();
    handleResponse(res, 200, exchangeRates);
  } catch (error) {
    handleError(res, error, 'Error al obtener las tasas de cambio');
  }
};

// Obtener una tasa de cambio por ID
export const getExchangeRateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const exchangeRate = await ExchangeRate.findById(req.params.id);
    if (!exchangeRate) {
      return handleResponse(res, 404, { error: 'Tasa de cambio no encontrada' });
    }
    handleResponse(res, 200, exchangeRate);
  } catch (error) {
    handleError(res, error, 'Error al obtener la tasa de cambio');
  }
};

// Actualizar una tasa de cambio
export const updateExchangeRate = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedExchangeRate = await ExchangeRate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExchangeRate) {
      return Promise.reject(new Error('Tasa de cambio no encontrada'));
    }
    handleResponse(res, 200, updatedExchangeRate);
  } catch (error) {
    handleError(res, error, 'Error al actualizar la tasa de cambio');
  }
};

// Eliminar una tasa de cambio
export const deleteExchangeRate = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedExchangeRate = await ExchangeRate.findByIdAndDelete(req.params.id);
    if (!deletedExchangeRate) {
      return Promise.reject(new Error("Tasa de cambio no encontrada"));
    }
    res.status(204).send();
  } catch (error) {
    handleError(res, error, "Error al eliminar la tasa de cambio");
  }
};
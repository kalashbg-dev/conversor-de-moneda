// src/controllers/exchangeRateController.ts
import { Request, Response } from 'express'
import ExchangeRate from '../models/ExchangeRate'

// Helper function to handle responses
const handleResponse = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json(data)
}

// Helper function to handle errors
const handleError = (res: Response, error: any, message: string, statusCode: number) => {
  console.error(message, error)
  res.status(statusCode).json({ error: message })
}

// Crear una nueva tasa de cambio
export const createExchangeRate = async (req: Request, res: Response) => {
  const { currencyFrom, currencyTo, exchangeRate } = req.body

  // check if currencyFrom and currencyTo exists
  const exchangeRateExists = await ExchangeRate.findOne({ currencyFrom, currencyTo })
  if (exchangeRateExists) {
    handleError(
      res,
      new Error('La tasa de cambio ya existe'),
      'La tasa de cambio ya existe',
      409 // status code which represents a conflict
    )
    return
  }

  const newCurrencyFrom = currencyFrom.toUpperCase()
  const newCurrencyTo = currencyTo.toUpperCase()
  try {
    const newExchangeRate = new ExchangeRate({
      currencyFrom: newCurrencyFrom,
      currencyTo: newCurrencyTo,
      exchangeRate,
    })
    const savedExchangeRate = await newExchangeRate.save()
    handleResponse(res, 201, savedExchangeRate)
  } catch (error) {
    handleError(res, error, 'Error al crear la tasa de cambio', 500)
  }
}

// Obtener todas las tasas de cambio
export const getAllExchangeRates = async (req: Request, res: Response) => {
  try {
    const exchangeRates = await ExchangeRate.find()

    if (!exchangeRates) {
      handleError(
        res,
        new Error('No se encontraron tasas de cambio'),
        'No se encontraron tasas de cambio',
        404
      )
      return
    }

    handleResponse(res, 200, exchangeRates)
  } catch (error) {
    handleError(res, error, 'Error al obtener las tasas de cambio', 500)
  }
}

// Obtener una tasa de cambio por ID
export const getExchangeRateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const exchangeRate = await ExchangeRate.findById(req.params.id)
    if (!exchangeRate) {
      handleError(
        res,
        new Error('Tasa de cambio no encontrada'),
        'Tasa de cambio no encontrada',
        404
      )
      return
    }
    handleResponse(res, 200, exchangeRate)
  } catch (error) {
    handleError(res, error, 'Error al obtener la tasa de cambio', 500)
  }
}

// Actualizar una tasa de cambio
export const updateExchangeRate = async (req: Request, res: Response): Promise<void> => {
  const { currencyFrom, currencyTo, exchangeRate } = req.body
  const newCurrencyFrom = currencyFrom.toUpperCase()
  const newCurrencyTo = currencyTo.toUpperCase()
  try {
    const updatedExchangeRate = await ExchangeRate.findByIdAndUpdate(
      req.params.id,
      { currencyFrom: newCurrencyFrom, currencyTo: newCurrencyTo, exchangeRate },
      { new: true }
    )
    if (!updatedExchangeRate) {
      handleError(
        res,
        new Error('Tasa de cambio no encontrada'),
        'Tasa de cambio no encontrada',
        404
      )
      return
    }
    handleResponse(res, 200, updatedExchangeRate)
  } catch (error) {
    handleError(res, error, 'Error al actualizar la tasa de cambio', 500)
  }
}

// Eliminar una tasa de cambio
export const deleteExchangeRate = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedExchangeRate = await ExchangeRate.findByIdAndDelete(req.params.id)
    if (!deletedExchangeRate) {
      handleError(
        res,
        new Error('Tasa de cambio no encontrada'),
        'Tasa de cambio no encontrada',
        404
      )
      return
    }
    res.status(204).send()
  } catch (error) {
    handleError(res, error, 'Error al eliminar la tasa de cambio', 500)
  }
}

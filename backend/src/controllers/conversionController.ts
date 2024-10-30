import { Request, Response } from 'express'
import Conversion from '../models/Conversion'
import ExchangeRate from '../models/ExchangeRate'

// Controlador para registrar conversiones
export const logConversion = async (req: Request, res: Response): Promise<void> => {
  const { currencyFrom, currencyTo, amount } = req.body
  const newCurrencyFrom = currencyFrom.toUpperCase()
  const newCurrencyTo = currencyTo.toUpperCase()

  // conseguir tasa de cambio
  try {
    const exchangeRate = await ExchangeRate.findOne({
      currencyFrom: newCurrencyFrom,
      currencyTo: newCurrencyTo,
    })

    if (!exchangeRate) {
      res.status(404).json({ message: 'No se encontro la tasa de cambio' })
      return
    }

    const result = amount * exchangeRate.exchangeRate
    const conversion = new Conversion({
      currencyFrom: newCurrencyFrom,
      currencyTo: newCurrencyTo,
      amount,
      result,
    })
    const savedConversion = await conversion.save()
    res.status(200).json(savedConversion)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tasa de cambio' })
    return
  }
}

// Controlador para obtener el historial de conversiones (solo para ADMIN)
export const getConversionHistory = async (req: Request, res: Response) => {
  try {
    const conversions = await Conversion.find().sort({ timestamp: -1 }) // Orden descendente por fecha

    if (!conversions) {
      res.status(404).json({ message: 'No se encontro ninguna tasa de cambio' })
      return
    }

    res.status(200).json(conversions)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving conversion history', error })
  }
}

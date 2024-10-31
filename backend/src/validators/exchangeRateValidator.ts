import Joi from 'joi';

const currencyString = (label: string) => ({
  'string.base': `${label} debe ser una cadena.`,
  'any.required': `${label} es obligatoria.`,
  'string.regex': `${label} debe ser una cadena de 3 letras en mayúsculas.`,
});

const exchangeRateNumber = (label: string) => ({
  'number.base': `${label} debe ser un número.`,
  'number.min': `${label} debe ser mayor o igual a 0.`,
  'any.required': `${label} es obligatoria.`,
});

export const exchangeRateSchema = Joi.object({
  currencyFrom: Joi.string().uppercase().regex(/^[A-Z]{3}$/).required().messages(currencyString('La moneda de origen')),
  currencyTo: Joi.string().uppercase().regex(/^[A-Z]{3}$/).required().messages(currencyString('La moneda de destino')),
  exchangeRate: Joi.number().required().min(0).messages(exchangeRateNumber('La tasa de cambio'))
});
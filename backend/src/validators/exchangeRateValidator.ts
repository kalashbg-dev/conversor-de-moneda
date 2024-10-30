import Joi from 'joi';

export const exchangeRateSchema = Joi.object({
  currencyFrom: Joi.string().uppercase().regex(/^[A-Z]{3}$/).required().messages({
    'string.base': 'La moneda de origen debe ser una cadena.',
    'any.required': 'La moneda de origen es obligatoria.',
    'string.regex': 'La moneda de origen debe ser una cadena de 3 letras en mayúsculas.',
  }),
  currencyTo: Joi.string().uppercase().regex(/^[A-Z]{3}$/).required().messages({
    'string.base': 'La moneda de destino debe ser una cadena.',
    'any.required': 'La moneda de destino es obligatoria.',
    'string.regex': 'La moneda de destino debe ser una cadena de 3 letras en mayúsculas.',
  }),
  exchangeRate: Joi.number().required().min(0).messages({
    'number.base': 'La tasa de cambio debe ser un número.',
    'number.min': 'La tasa de cambio debe ser mayor o igual a 0.',
    'any.required': 'La tasa de cambio es obligatoria.'
  })
});

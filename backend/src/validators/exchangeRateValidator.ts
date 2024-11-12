import Joi from 'joi';

// Definir mensajes personalizados para cada campo
const currencyString = (label: string) => ({
  'string.base': `${label} debe ser una cadena de texto.`,
  'any.required': `${label} es un campo obligatorio.`,
  'string.pattern.base': `${label} debe estar en formato de 3 letras mayúsculas, por ejemplo, USD.`,
});

const exchangeRateNumber = (label: string) => ({
  'number.base': `${label} debe ser un número.`,
  'number.min': `${label} debe ser mayor o igual a 0.`,
  'any.required': `${label} es un campo obligatorio.`,
});

// Esquema de validación
export const exchangeRateSchema = Joi.object({
  currencyFrom: Joi.string()
    .uppercase()
    .pattern(/^[A-Z]{3}$/)
    .required()
    .messages(currencyString('La moneda de origen')),
  currencyTo: Joi.string()
    .uppercase()
    .pattern(/^[A-Z]{3}$/)
    .required()
    .messages(currencyString('La moneda de destino')),
  exchangeRate: Joi.number()
    .min(0)
    .required()
    .messages(exchangeRateNumber('La tasa de cambio'))
});

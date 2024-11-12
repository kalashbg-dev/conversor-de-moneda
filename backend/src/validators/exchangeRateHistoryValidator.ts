// src/validators/exchangeRateHistoryValidator.ts
import Joi from 'joi';

export const exchangeRateHistoryValidator = Joi.object({
  currencyFrom: Joi.string()
    .uppercase() // Convertir a mayúsculas automáticamente
    .length(3) // Código de moneda de 3 caracteres
    .required()
    .messages({
      'string.base': 'El tipo de cambio inicial debe ser un texto.',
      'string.length': 'El tipo de cambio inicial debe tener exactamente 3 caracteres.',
      'any.required': 'El tipo de cambio inicial es requerido.'
    }),

  currencyTo: Joi.string()
    .uppercase() // Convertir a mayúsculas automáticamente
    .length(3) // Código de moneda de 3 caracteres
    .required()
    .messages({
      'string.base': 'El tipo de cambio final debe ser un texto.',
      'string.length': 'El tipo de cambio final debe tener exactamente 3 caracteres.',
      'any.required': 'El tipo de cambio final es requerido.'
    }),

  exchangeRate: Joi.number()
    .positive() // Valor positivo
    .precision(6) // Hasta 6 decimales para precisión
    .required()
    .messages({
      'number.base': 'La tasa de cambio debe ser un número.',
      'number.positive': 'La tasa de cambio debe ser un número positivo.',
      'any.required': 'La tasa de cambio es requerida.'
    }),

  institution: Joi.string()
    .optional()
    .pattern(/^[a-fA-F0-9]{24}$/) // Validación para un ObjectId de MongoDB
    .messages({
      'string.base': 'La institución debe ser un identificador válido.',
      'string.pattern.base': 'La institución debe ser un ID válido de MongoDB.'
    }),

  date: Joi.date()
    .default(() => new Date())
    .messages({
      'date.base': 'La fecha debe ser válida.'
    }),
});

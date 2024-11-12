import Joi from 'joi';

// Validación para crear o actualizar InstitutionExchangeRate
export const institutionExchangeRateValidator = Joi.object({
  currencyFrom: Joi.string()
    .uppercase()
    .length(3)
    .required()
    .messages({
      'string.base': 'El campo currencyFrom debe ser un texto.',
      'string.length': 'El campo currencyFrom debe tener exactamente 3 caracteres.',
      'any.required': 'El campo currencyFrom es obligatorio.'
    }),
  
  currencyTo: Joi.string()
    .uppercase()
    .length(3)
    .required()
    .messages({
      'string.base': 'El campo currencyTo debe ser un texto.',
      'string.length': 'El campo currencyTo debe tener exactamente 3 caracteres.',
      'any.required': 'El campo currencyTo es obligatorio.'
    }),

  exchangeRate: Joi.number()
    .positive()
    .precision(4)
    .required()
    .messages({
      'number.base': 'El campo exchangeRate debe ser un número.',
      'number.positive': 'El campo exchangeRate debe ser un número positivo.',
      'number.precision': 'El campo exchangeRate debe tener un máximo de 4 decimales.',
      'any.required': 'El campo exchangeRate es obligatorio.'
    }),

  institution: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'El campo institution_id debe ser un ID de MongoDB válido.',
      'any.required': 'El campo institution_id es obligatorio.'
    }),

  update_date: Joi.date()
    .optional()
    .default(() => new Date())
    .messages({
      'date.base': 'El campo update_date debe ser una fecha válida.'
    })
});



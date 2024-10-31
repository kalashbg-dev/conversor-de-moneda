import Joi from 'joi';

const currencyString = (label: string) => ({
  'string.base': `${label} debe ser una cadena.`,
  'any.required': `${label} es obligatoria.`,
  'string.regex': `${label} debe ser una cadena de 3 letras en mayúsculas.`,
});

export const conversionSchema = Joi.object({
  amount: Joi.number().required().min(0).messages({
    'number.base': 'El monto debe ser un número.',
    'number.min': 'El monto debe ser mayor o igual a 0.',
    'any.required': 'El monto es obligatorio.'
  }),
  currencyFrom: Joi.string().uppercase().regex(/^[A-Z]{3}$/).required().messages(currencyString('La moneda de origen')),
  currencyTo: Joi.string().uppercase().regex(/^[A-Z]{3}$/).required().messages(currencyString('La moneda de destino'))
});
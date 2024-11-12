import Joi from 'joi';

const stringRequired = (label: string) => ({
  'string.base': `${label} debe ser una cadena de texto.`,
  'string.empty': `${label} no puede estar vacío.`,
  'any.required': `${label} es un campo obligatorio.`
});

const stringMin = (label: string, limit: number) => ({
  'string.min': `${label} debe tener al menos ${limit} caracteres.`
});

const stringMax = (label: string, limit: number) => ({
  'string.max': `${label} no puede tener más de ${limit} caracteres.`
});

export const institutionSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      ...stringRequired('Nombre'),
      ...stringMin('Nombre', 3),
      ...stringMax('Nombre', 100)
    }),
  country: Joi.string()
    .optional()
    .allow(null, '')
    .messages({
      'string.base': 'El país debe ser una cadena de texto o estar vacío.'
    })
});
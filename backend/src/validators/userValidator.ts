import Joi from 'joi'

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(50).required().messages({
    'string.base': 'El nombre de usuario debe ser un texto.',
    'string.alphanum': 'El nombre de usuario solo debe contener caracteres alfanuméricos.',
    'string.min': 'El nombre de usuario debe tener al menos 3 caracteres.',
    'string.max': 'El nombre de usuario debe tener un máximo de 50 caracteres.',
    'any.required': 'El nombre de usuario es requerido.',
  }),
  password: Joi.string().min(8).required().messages({
    'string.base': 'La contraseña debe ser un texto.',
    'string.min': 'La contraseña debe tener al menos 8 caracteres.',
    'any.required': 'La contraseña es requerida.',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'El correo electrónico debe ser una cadena.',
    'string.email': 'El correo electrónico debe ser válido.',
    'any.required': 'El correo electrónico es obligatorio.',
  }),
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'El nombre debe ser una cadena.',
    'any.required': 'El nombre es obligatorio.',
    'string.min': 'El nombre debe tener al menos 3 caracteres.',
    'string.max': 'El nombre de usuario debe tener un máximo de 50 caracteres.',
  }),
  role: Joi.string().valid('user', 'admin').optional().messages({
    'string.base': 'El rol debe ser una cadena.',
    'any.only': 'El rol debe ser "user" o "admin".',
  }),
})

export const authSchema = Joi.object({
  email: Joi.string().email().messages({
    'string.base': 'El correo electrónico debe ser una cadena.',
    'string.email': 'El correo electrónico debe ser válido.',
  }),
  password: Joi.string().min(8).messages({
    'string.base': 'La contraseña debe ser un texto.',
    'string.min': 'La contraseña debe tener al menos 8 caracteres.',
  }),
})

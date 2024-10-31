import Joi from 'joi';

const stringRequired = (label: string) => ({
    'string.base': `${label} debe ser una cadena.`,
    'string.required': `${label} es requerido.`,
});

const stringMin = (label: string, min: number) => ({
    'string.min': `${label} debe tener al menos ${min} caracteres.`,
});

const stringMax = (label: string, max: number) => ({
    'string.max': `${label} debe tener un máximo de ${max} caracteres.`,
});

export const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required().messages({
        ...stringRequired('Nombre de usuario'),
        'string.alphanum': 'El nombre de usuario solo debe contener caracteres alfanuméricos.',
        ...stringMin('Nombre de usuario', 3),
        ...stringMax('Nombre de usuario', 20),
    }),
    password: Joi.string().min(8).required().messages({
        ...stringRequired('Contraseña'),
        ...stringMin('Contraseña', 8),
    }),
    email: Joi.string().email().required().messages(stringRequired('Correo electrónico')),
    name: Joi.string().min(3).max(50).required().messages({
        ...stringRequired('Nombre'),
        ...stringMin('Nombre', 3),
        ...stringMax('Nombre', 50),
    }),
    role: Joi.string().valid('user', 'admin').optional().messages({
        'any.only': 'El rol debe ser "user" o "admin".',
    }),
});

export const authSchema = Joi.object({
    username: Joi.string().required().messages(stringRequired('Nombre de usuario')),
    password: Joi.string().min(8).required().messages(stringRequired('Contraseña')),
});



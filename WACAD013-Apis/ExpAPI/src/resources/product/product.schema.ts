import Joi from 'joi';

export const createSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().required(),
    stock: Joi.number().integer().required()
});

export const updateSchema = Joi.object({
    name: Joi.string().min(3).max(100),
    price: Joi.number(),
    stock: Joi.number().integer()
});
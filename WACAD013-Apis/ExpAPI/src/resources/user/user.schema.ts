import Joi from 'joi';

export const createSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    userTypeId: Joi.string().default('1')
});

export const updateSchema = Joi.object({
    name: Joi.string().min(3).max(100),
    email: Joi.string().email(),
    password: Joi.string().min(6)
});

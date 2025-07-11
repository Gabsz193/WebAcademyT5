import Joi from 'joi';

export const addToCartSchema = Joi.object({
  id: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required()
});

export const updateCartItemSchema = Joi.object({
  quantity: Joi.number().integer().min(0).required()
});

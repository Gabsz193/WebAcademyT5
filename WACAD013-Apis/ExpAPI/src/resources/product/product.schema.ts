import Joi from 'joi';
import {CreateProductDTO, UpdateProductDTO} from "./product.types";

export const createSchema = Joi.object<CreateProductDTO>({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().required(),
    stockQuantity: Joi.number().integer().required()
});

export const updateSchema = Joi.object<UpdateProductDTO>({
    name: Joi.string().min(3).max(100),
    price: Joi.number(),
    stockQuantity: Joi.number().integer()
});
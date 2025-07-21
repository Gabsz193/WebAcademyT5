import Joi from 'joi';
import {ProductCreateDTO, ProductUpdateDTO} from "../types/product";

export const createSchema = Joi.object<ProductCreateDTO>({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().required(),
});

export const updateSchema = Joi.object<ProductUpdateDTO>({
  name: Joi.string().min(3).max(100),
  price: Joi.number(),
});
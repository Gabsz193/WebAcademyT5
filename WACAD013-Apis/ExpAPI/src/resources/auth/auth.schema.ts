import Joi from 'joi';
import {LoginDTO, SignUpDTO} from "./auth.types";

export const loginSchema = Joi.object<LoginDTO>({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().required()
});

export const signupSchema = Joi.object<SignUpDTO>({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).required(),
});
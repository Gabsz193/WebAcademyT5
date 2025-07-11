import Joi from 'joi';
import { UserTypes } from '../userType/userType.constants';
import {CreateUserDTO, UpdateUserDTO} from "./user.types";

export const createSchema = Joi.object<CreateUserDTO>({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    userTypeId: Joi.string().default(UserTypes.CLIENT)
});

export const updateSchema = Joi.object<UpdateUserDTO>({
    name: Joi.string().min(3).max(100),
    email: Joi.string().email(),
    password: Joi.string().min(6)
});

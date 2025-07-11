import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import {StatusCodes} from "http-status-codes";

const validate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false
        });

        if (error) res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: error.details });
        else next();
    };
};

export default validate;
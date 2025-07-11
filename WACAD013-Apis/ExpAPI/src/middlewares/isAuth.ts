import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.uid) {
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({message: 'Authentication required'});
  }

};
import { Response, Request, NextFunction } from "express";

const setLangCookie = (req : Request, res : Response, next: NextFunction) => {
    if(!('lang' in req.cookies)) res.cookie('lang', 'pt-BR');
    next();
}

export default setLangCookie;
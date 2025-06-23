import { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

type LoggerType = 'complete' | 'simple';
type LoggerMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export function logger(type: LoggerType): LoggerMiddleWare | never {
  const log_path = process.env['LOGS_PATH'] ?? 'logs';
  const date = new Date();
  const filename = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.log`;
  const full_path = path.join(log_path, filename);

  return async (req: Request, res: Response, next: NextFunction) => {
    let message: string = `${new Date().toISOString()}, ${req.url}, ${req.method}`;

    if (type === 'complete') {
      message += `, ${req.httpVersion}, ${req.get('User-Agent')}`;
    } else if (type !== 'simple') {
      throw new Error(
        "Indique um tipo válido para o logger: 'simple', 'complete'"
      );
    }

    try {
      await fs.access(log_path, fs.constants.F_OK);
    } catch (e) {
      const w_e = e as Error;
      console.log(`Criando pasta de logs: ${w_e.message}`);
      await fs.mkdir(log_path);
    }
    await fs.appendFile(full_path, message + '\n');
    next();
  };
}

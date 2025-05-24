import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";

type LoggerType = "complete" | "simple";
type LoggerMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export function logger(type: LoggerType): LoggerMiddleWare | never {
  const log_path = process.env["LOGS_PATH"] ?? "logs";
  const date = new Date();
  const filename = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.log`;
  const full_path = path.join(log_path, filename);

  async function returnedFunction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const message =
      `${new Date().toISOString()}, ${req.url}, ${req.method}` +
      (type === "complete"
        ? `${req.httpVersion}, ${req.get("User-Agent")}`
        : "");

    await fs.writeFile(full_path, message + "\n", { flag: "a" });
    next();
  }

  return returnedFunction;
}

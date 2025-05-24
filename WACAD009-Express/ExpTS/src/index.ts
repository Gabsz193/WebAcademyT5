import dotenv from "dotenv";
import express from "express";
import validateEnv from "./utils/validateEnv";
import { logger } from "./middlewares/logger";
import router from "./router/router";

dotenv.config();
validateEnv();

const PORT = process.env["PORT"] ?? 5000;
const app = express();

app.use(logger("simple"));

// app.use(logger("complete"));

app.use(router);

app.listen(PORT, (err: Error | undefined) => {
  if (err) throw new Error(err.message);
  console.log(`Listening on http://localhost:${PORT}/`);
});

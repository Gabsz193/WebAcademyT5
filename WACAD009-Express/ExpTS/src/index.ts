import dotenv from "dotenv";
import express from "express";
import validateEnv from "./utils/validateEnv";
import { logger } from "./middlewares/logger";
import loremRouter from "./router/lorem/router";
import handlebarsRouter from "./router/handlebars/router";
import mainRouter from "./router/main/router";
import { engine } from "express-handlebars";
import path from "path";

dotenv.config();
validateEnv();

const PORT = process.env["PORT"] ?? 5000;
const app = express();

app.use(logger("simple"));

// app.use(logger("complete"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(loremRouter);
app.use(handlebarsRouter);
app.use(mainRouter);

app.listen(PORT, (err: Error | undefined) => {
  if (err) throw new Error(err.message);
  console.log(`Listening on http://localhost:${PORT}/`);
});

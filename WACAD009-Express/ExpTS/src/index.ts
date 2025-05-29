import dotenv from "dotenv";
import express from "express";
import validateEnv from "./utils/validateEnv";
import { logger } from "./middlewares/logger";
import loremRouter from "./router/lorem/router";
import handlebarsRouter from "./router/handlebars/router";
import mainRouter from "./router/main/router";
import productRouter from "./router/product/router";
import { engine } from "express-handlebars";
import helpers from "./views/helpers/helpers";
import path from "path";
import sass from "node-sass-middleware";

dotenv.config();
validateEnv();

const PORT = process.env["PORT"] ?? 5000;
const app = express();

app.use(logger("simple"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(logger("complete"));

app.engine(
  "hbs",
  engine({
    layoutsDir: path.join(__dirname, "views", "layouts"),
    defaultLayout: "main",
    helpers: helpers
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(loremRouter);
app.use(handlebarsRouter);
app.use(mainRouter);
app.use(productRouter);

app.use("/img", express.static(path.join(process.cwd(), "public/img")));
app.use("/css", express.static(path.join(process.cwd(), "public/css")));
app.use("/js", express.static(path.join(process.cwd(), "public/js")));
app.use(
  "/favicon.ico",
  express.static(path.join(process.cwd(), "public/favicon.ico"))
);
app.use(
  sass({
    src: path.join(process.cwd(), "public/scss"),
    dest: path.join(process.cwd(), "public/css"),
    outputStyle: "compressed",
    prefix: "/css"
  })
);

app.listen(PORT, (err: Error | undefined) => {
  if (err) throw new Error(err.message);
  console.log(`Listening on http://localhost:${PORT}/`);
});

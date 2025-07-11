declare module 'express-session' {
    interface SessionData {
        uid: string;
        cart: Cart
    }
}
import {Cart} from "./resources/compra/compra.types";
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import router from './router/index';
import setLangCookie from "./middlewares/setLangCookie";
import session from "express-session";
import {v4 as uuidv4} from "uuid";
import validateEnv from "./utils/validateEnv";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json";

dotenv.config();
validateEnv();

const SESSION_SECRET = process.env.SESSION_SECRET as string;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    genid: (req) => uuidv4(),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser());
app.use(express.json());
app.use(setLangCookie);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello");
});
app.get("/about", (req, res) => {
    res.send("About us");
});
app.listen(PORT, (err) => {
    if (err)
        throw new Error(err.message);
    console.log(`Listening on http://localhost:${PORT}/`);
});

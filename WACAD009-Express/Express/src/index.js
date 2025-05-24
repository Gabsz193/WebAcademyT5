const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const PORT = process.env.PORT ?? 5000;
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, (err) => {
    if(err) throw new Error(err.message);
    console.log(`Listening on http://localhost:${PORT}/`)
});
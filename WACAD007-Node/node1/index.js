const http = require("http");
const fs = require("fs");
require("dotenv").config();

const PORT = process.env.PORT ?? 3000;

if(process.argv.length != 3) {
    throw new Error("Quantidade de argumentos inválida");
}

const directory_name = process.argv[2];

let file_names = [];

fs.readdir(directory_name, (err, files) => {
    if(err) throw new Error("Ocorreu um erro: " + err.message);
    file_names = files;
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
    file_names.forEach((file) => {
        res.write(file);
        res.write("</br>");
    })
    res.end();
});

server.listen(PORT, () => {
    console.log(`Ouvindo na porta: http://localhost:${PORT}/`);
});
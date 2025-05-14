import http from "http";
import fs from "fs";
import dotenv from "dotenv"
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT ?? 3000;

if(process.argv.length != 3) {
    throw new Error("Quantidade de argumentos inválida");
}

let directory_name = process.argv[2];

let file_names = [];

fs.readdir(directory_name, (err, files) => {
    if(err) throw new Error("Ocorreu um erro: " + err.message);
    file_names = files;
});

const server = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") {
        res.writeHead(404);
        res.end();
        return;
    }

    if(req.url === "/") {
        fs.readdir(directory_name, (err, files) => {
            if(err) throw new Error("Ocorreu um erro: " + err.message);

            res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
            res.write("<a href='/'>Voltar</a><br/>")
            files.forEach((file) => {
                res.write(`<a href='${directory_name}/${file}'>${file}</a>`);
                res.write("</br>");
            })
            res.end();
        });
    } else {
        const path = directory_name + req.url
        fs.stat(path, (err, stats) => {
            if(err) throw new Error(err);
            if(stats.isDirectory()) {
                fs.readdir(path, (err, files) => {
                    if(err) throw new Error("Ocorreu um erro: " + err.message);
                    res.write(`<a href='..'>Voltar</a><br/>`);
                    files.forEach((file) => {
                        res.write(`<a href='${req.url.endsWith("/") ? req.url : req.url + "/"}${file}'>${file}</a>`);
                        res.write("</br>");
                    })
                    res.end();
                });
            } else {
                fs.readFile(path, (err, content) => {
                    if(err) throw new Error(err);
                    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
                    res.write(`<a href='.'>Voltar</a><br/>`)
                    res.write("<pre>");
                    res.write(content.toString());
                    res.write("</pre>");
                    res.end();
                })
            }
        })
    }
    
});

server.listen(PORT, () => {
    console.log(`Ouvindo na porta: http://localhost:${PORT}/`);
});
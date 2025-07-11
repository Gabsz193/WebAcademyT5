const http = require("http");

const PORT = process.env.APP_PORT ?? 8000;

const server = http.createServer((req, res) => {
  res.end("<h1>Use Docker. Gostoso demais.</h1>");
});

server.listen(PORT, () => {
  console.log(`Servidor escutando em: http://localhost:${PORT}/`);
});

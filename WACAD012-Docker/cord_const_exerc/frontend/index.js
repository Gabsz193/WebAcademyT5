const http = require("http");

const PORT = process.env.PORT ?? 3000;

const backend_hostname = process.env.BACKEND_HOSTNAME ?? "webacademy-backend";

const backend_port = process.env.BACKEND_PORT ?? "4000";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(`
    <h1>Digite uma mensagem</h1>

    <form method='POST' action='http://${backend_hostname}:${backend_port}/data'>
        <input name='message' type='text' placeholder='Digite a mensagem' />
        <input type='submit'/>
    </form>
`);
});

server.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});

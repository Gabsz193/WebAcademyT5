import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

dotenv.config();

const PORT = process.env['PORT'] ?? 5000;
const app = express();

app.get('/', (req : Request, res : Response) => {
	res.send('Hello World');
});

app.listen(PORT, (err : Error | undefined) => {
	if (err) throw new Error(err.message);
	console.log(`Listening on http://localhost:${PORT}/`);
});

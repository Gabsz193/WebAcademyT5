import dotenv from 'dotenv';
import express from 'express';
import validateEnv from './utils/validateEnv';

dotenv.config();

validateEnv();

const PORT = process.env['PORT'] ?? 5000;
const app = express();

app.get('/', (req, res) => {
	res.send('Hello');
});

app.get('/about', (req, res) => {
	res.send('About us');
});

app.listen(PORT, (err) => {
	if (err) throw new Error(err.message);
	console.log(`Listening on http://localhost:${PORT}/`);
});

import dotenv from 'dotenv';
import express from 'express';
import validateEnv from './utils/validateEnv';
import { logger } from './middlewares/logger';
import { engine } from 'express-handlebars';

dotenv.config();

validateEnv();

const PORT = process.env['PORT'] ?? 5000;
const app = express();

app.use(logger('simple'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

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

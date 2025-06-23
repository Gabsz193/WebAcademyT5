import dotenv from 'dotenv';
import express from 'express';
import validateEnv from './utils/validateEnv';
import { logger } from './middlewares/logger';
import productRoutes from './routes/productRoutes';

dotenv.config();
validateEnv();

const PORT = process.env['PORT'] ?? 5000;
const app = express();

app.use(logger('simple'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register the product routes
app.use(productRoutes);

app.listen(PORT, (err?: Error) => {
  if (err) throw new Error(err.message);
  console.log(`Listening on http://localhost:${PORT}/`);
  console.log(`API routes available at http://localhost:${PORT}/v1/products`);
});

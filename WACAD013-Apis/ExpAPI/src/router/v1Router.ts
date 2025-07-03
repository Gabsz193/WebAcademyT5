import { Router } from 'express';
import productRouter from '../resources/product/product.router';

const router = Router();

router.use('/product', productRouter);

export default router;
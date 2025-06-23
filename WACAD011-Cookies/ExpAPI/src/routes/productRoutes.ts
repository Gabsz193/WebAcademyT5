import { Router } from 'express';
import { productController } from '../controllers/productController';

const router = Router();

// All routes start with /v1/products as per requirements
router.get('/v1/products', productController.getAllProducts);
router.post('/v1/products', productController.createProduct);
router.get('/v1/products/:id', productController.getProductById);
router.put('/v1/products/:id', productController.updateProduct);
router.delete('/v1/products/:id', productController.deleteProduct);

export default router;

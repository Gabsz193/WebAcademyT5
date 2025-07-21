import { Router } from 'express';
import { productController } from '../controllers/productController';
import validate from "../middlewares/validate";
import {createSchema, updateSchema} from "../schemas/productSchema";

const router = Router();

// All routes start with /v1/products as per requirements
router.get('/v1/products', productController.getAllProducts);
router.post('/v1/products', validate(createSchema), productController.createProduct);
router.get('/v1/products/:id', productController.getProductById);
router.put('/v1/products/:id', validate(updateSchema), productController.updateProduct);
router.delete('/v1/products/:id', productController.deleteProduct);

export default router;

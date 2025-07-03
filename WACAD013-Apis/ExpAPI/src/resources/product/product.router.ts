import {Router} from 'express';
import productController from './product.controller';

const router = Router();

router.get("/", productController.index);
router.post("/", productController.create);
router.get("/:id", productController.read);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);

export default router;
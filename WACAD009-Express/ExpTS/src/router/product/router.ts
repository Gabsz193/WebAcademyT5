import { Router } from "express";
import controller from "../../controllers/product";

const router = Router();

router.get("/product", controller.index);
router.all("/product/create", controller.create);
router.all("/product/update/:id", controller.update);
router.get("/product/:id", controller.read);
router.all("/product/delete/:id", controller.remove);

export default router;

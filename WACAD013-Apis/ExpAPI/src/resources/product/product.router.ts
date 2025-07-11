import {Router} from 'express';
import productController from './product.controller';
import validate from "../../middlewares/validate";
import {createSchema, updateSchema} from "./product.schema";
import {isAuth} from "../../middlewares/isAuth";

const router = Router();

router.use(isAuth);
router.get("/", productController.index);
router.post("/", validate(createSchema), productController.create);
router.get("/:id", productController.read);
router.put("/:id", validate(updateSchema), productController.update);
router.delete("/:id", productController.remove);

export default router;
import { Router } from 'express';
import userController from './user.controller';
import validate from "../../middlewares/validate";
import { createSchema, updateSchema } from "./user.schema";
import isAdmin from "../../middlewares/isAdmin";

const router = Router();

router.use(isAdmin);
router.get("/", userController.index);
router.post("/", validate(createSchema), userController.create);
router.get("/:id", userController.read);
router.put("/:id", validate(updateSchema), userController.update);
router.delete("/:id", userController.remove);

export default router;

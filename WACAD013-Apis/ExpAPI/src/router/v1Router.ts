import {Router} from 'express';
import productRouter from '../resources/product/product.router';
import userRouter from '../resources/user/user.router';
import languageRouter from "../resources/language/language.router";
import authRouter from "../resources/auth/auth.router";
import compraRouter from "../resources/compra/compra.router"

const router = Router();

router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/language', languageRouter);
router.use('/carrinho', compraRouter);
router.use('/', authRouter);

export default router;
import {Router} from 'express';
import productRouter from '../resources/product/product.router';
import userRouter from '../resources/user/user.router';
import languageRouter from "../resources/language/language.router";
import authRouter from "../resources/auth/auth.router";
import compraRouter from "../resources/compra/compra.router"

const router = Router();

router.use('/product',
  // #swagger.tags = ['Produto']
  productRouter
);
router.use('/user',
  // #swagger.tags = ['Usuário']
  userRouter
);
router.use('/language',
  // #swagger.tags = ['Linguagem']
  languageRouter
);
router.use('/cart',
  // #swagger.tags = ['Carrinho']
  compraRouter
);
router.use('/auth',
  // #swagger.tags = ['Autenticação']
  authRouter
);

export default router;
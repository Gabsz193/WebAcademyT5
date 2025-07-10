import express from 'express';
import { isAuth } from '../../middlewares/isAuth';
import { addToCartSchema, updateCartItemSchema } from './compra.schema';
import {
  addProductToCart,
  checkout,
  getCart,
  getPurchaseById,
  getUserPurchases,
  removeProductFromCart,
  updateCartItem
} from './compra.controller';
import validate from "../../middlewares/validate";

const router = express.Router();

// All routes require authentication
router.use(isAuth);

// Cart routes
router.get('/', getCart);
router.post('/', validate(addToCartSchema), addProductToCart);
router.delete('/:productId', removeProductFromCart);
router.patch('/:productId', validate(updateCartItemSchema), updateCartItem);

// Checkout route
router.post('/checkout', checkout);

// Purchase history routes
router.get('/history', getUserPurchases);
router.get('/history/:id', getPurchaseById);

export default router;

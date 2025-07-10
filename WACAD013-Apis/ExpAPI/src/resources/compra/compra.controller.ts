import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addToCart, completePurchase, getCompra, getUserCompras, removeFromCart, updateCartItemQuantity } from './compra.service';
import { Cart } from './compra.types';

// Initialize cart in session if it doesn't exist
const initializeCart = (req: Request): Cart => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  return req.session.cart as Cart;
};

export const getCart = (req: Request, res: Response) => {
  const cart = initializeCart(req);
  res.status(StatusCodes.OK).json(cart);
};

export const addProductToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.session.uid as string;
    const cart = initializeCart(req);

    const updatedCart = await addToCart(userId, req.body, cart);
    req.session.cart = updatedCart;

    res.status(StatusCodes.OK).json(updatedCart);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const removeProductFromCart = (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const cart = initializeCart(req);

    const updatedCart = removeFromCart(productId, cart);
    req.session.cart = updatedCart;

    res.status(StatusCodes.OK).json(updatedCart);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = initializeCart(req);

    const updatedCart = await updateCartItemQuantity(productId, quantity, cart);
    req.session.cart = updatedCart;

    res.status(StatusCodes.OK).json(updatedCart);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const checkout = async (req: Request, res: Response) => {
  try {
    const userId = req.session.uid as string;
    const cart = initializeCart(req);

    if (cart.length === 0) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Cart is empty' });
    }

    const compra = await completePurchase(userId, cart);

    // Clear cart after successful purchase
    req.session.cart = [];

    res.status(StatusCodes.CREATED).json(compra);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const getUserPurchases = async (req: Request, res: Response) => {
  try {
    const userId = req.session.uid as string;
    const compras = await getUserCompras(userId);

    res.status(StatusCodes.OK).json(compras);
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const compra = await getCompra(id);

    if (!compra) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Purchase not found' });
    } else {
      // Check if the purchase belongs to the user
      if (compra.userId !== req.session.uid as string) {
        res.status(StatusCodes.FORBIDDEN).json({ message: 'Access denied' });
      }

      res.status(StatusCodes.OK).json(compra);
    }

  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

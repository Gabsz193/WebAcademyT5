import { PrismaClient } from '@prisma/client';
import { AddToCartDTO, Cart, CartItem, Compra } from './compra.types';
import { getProduct } from '../product/product.service';

const prisma = new PrismaClient();

// Adds a product to the cart in the session
export const addToCart = async (userId: string, dto: AddToCartDTO, cart: Cart): Promise<Cart> => {
  const { productId, quantity } = dto;

  // Get product details
  const product = await getProduct(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Check if product has enough stock
  if (product.stockQuantity < quantity) {
    throw new Error('Not enough stock available');
  }

  // Check if product already in cart
  const existingItemIndex = cart.findIndex(item => item.productId === productId);

  if (existingItemIndex >= 0) {
    // Update quantity if product already in cart
    const newQuantity = cart[existingItemIndex].quantity + quantity;

    // Check if new quantity exceeds stock
    if (newQuantity > product.stockQuantity) {
      throw new Error('Not enough stock available');
    }

    cart[existingItemIndex].quantity = newQuantity;
  } else {
    // Add new item to cart
    const cartItem: CartItem = {
      productId,
      quantity,
      product
    };
    cart.push(cartItem);
  }

  return cart;
};

// Removes an item from the cart
export const removeFromCart = (productId: string, cart: Cart): Cart => {
  return cart.filter(item => item.productId !== productId);
};

// Updates item quantity in the cart
export const updateCartItemQuantity = async (
  productId: string, 
  quantity: number, 
  cart: Cart
): Promise<Cart> => {
  const itemIndex = cart.findIndex(item => item.productId === productId);

  if (itemIndex === -1) {
    throw new Error('Product not found in cart');
  }

  // Get product to check stock
  const product = await getProduct(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Check if quantity exceeds stock
  if (quantity > product.stockQuantity) {
    throw new Error('Not enough stock available');
  }

  // Update quantity or remove if quantity is 0
  if (quantity <= 0) {
    return removeFromCart(productId, cart);
  }

  cart[itemIndex].quantity = quantity;
  return cart;
};

// Completes purchase by saving cart items to database
export const completePurchase = async (userId: string, cart: Cart): Promise<Compra> => {
  // Check if cart is empty
  if (cart.length === 0) {
    throw new Error('Cart is empty');
  }

  // Start transaction to ensure data consistency
  return await prisma.$transaction(async (tx) => {
    // Create purchase record
    const compra = await tx.compra.create({
      data: {
        userId,
        items: {
          create: cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Update product stock quantities
    for (const item of cart) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stockQuantity: { decrement: item.quantity }
        }
      });
    }

    return compra as unknown as Compra;
  });
};

// Gets all purchases for a user
export const getUserCompras = async (userId: string): Promise<Compra[]> => {
  return await prisma.compra.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  }) as unknown as Compra[];
};

// Gets a specific purchase by ID
export const getCompra = async (id: string): Promise<Compra | null> => {
  return await prisma.compra.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  }) as unknown as Compra | null;
};

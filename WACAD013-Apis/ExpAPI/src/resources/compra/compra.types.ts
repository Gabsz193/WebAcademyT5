import { Decimal } from '@prisma/client/runtime/library';
import { Product } from '../product/product.types';

export type CartItem = {
  productId: string;
  quantity: number;
  product: Product;
};

export type Cart = CartItem[];

export type AddToCartDTO = {
  productId: string;
  quantity: number;
};

export type CompraItem = {
  id: string;
  compraId: string;
  productId: string;
  quantity: number;
  discount?: Decimal;
  createdAt: Date;
  updatedAt: Date;
  product?: Product;
};

export type Compra = {
  id: string;
  userId: string;
  items: CompraItem[];
  createdAt: Date;
  updatedAt: Date;
};

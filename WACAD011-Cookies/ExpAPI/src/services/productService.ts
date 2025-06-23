import { Product, ProductCreateDTO, ProductUpdateDTO } from '../types/product';
import prisma from '../lib/prisma';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    return await prisma.product.findMany();
  },

  async getProductById(id: number): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return product;
  },

  async createProduct(product: ProductCreateDTO): Promise<Product> {
    return await prisma.product.create({
      data: product
    });
  },

  async updateProduct(id: number, product: ProductUpdateDTO): Promise<Product> {
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    return await prisma.product.update({
      where: { id },
      data: product
    });
  },

  async deleteProduct(id: number): Promise<void> {
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    await prisma.product.delete({
      where: { id }
    });
  }
};

import {PrismaClient} from '@prisma/client';
import {CreateProductDTO, Product, UpdateProductDTO} from "./product.types";

const prisma = new PrismaClient();

export const getProducts = async (): Promise<Product[]> => {
    return await prisma.product.findMany();
};

export const getProduct = async (id: string): Promise<Product | null> => {
    return await prisma.product.findUnique({
        where: {id}
    });
}

export const createProduct = async (product: CreateProductDTO): Promise<Product> => {
    return await prisma.product.create({
        data: {
            name: product.name,
            price: product.price,
            stockQuantity: parseInt(product.stockQuantity)
        }
    });
}

export const updateProduct = async (id: string, product: UpdateProductDTO): Promise<Product | null> => {
    try {
        return await prisma.product.update({
            where: {id},
            data: {...product, stockQuantity: product.stockQuantity ? parseInt(product?.stockQuantity) : undefined}
        });
    } catch (error) {
        // If record doesn't exist, Prisma will throw an error
        return null;
    }
}

export const deleteProduct = async (id: string): Promise<boolean> => {
    try {
        await prisma.product.delete({
            where: {id}
        });
        return true;
    } catch (error) {
        // If record doesn't exist, Prisma will throw an error
        return false;
    }
}
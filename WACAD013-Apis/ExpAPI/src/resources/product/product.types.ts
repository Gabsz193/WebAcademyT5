import {Decimal} from '@prisma/client/runtime/library';

export type Product = {
    id: string;
    name: string;
    price: Decimal;
    stockQuantity: number;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateProductDTO = {
    name: string;
    price: string;
    stockQuantity: string;
};

export type ReadProductDTO = Pick<Product, 'id'>

export type UpdateProductDTO = Partial<CreateProductDTO>;
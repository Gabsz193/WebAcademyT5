export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
};

export type CreateProductDTO = Omit<Product, 'id'>;

export type ReadProductDTO = Pick<Product, 'id'>

export type UpdateProductDTO = Partial<Omit<Product, 'id'>>;
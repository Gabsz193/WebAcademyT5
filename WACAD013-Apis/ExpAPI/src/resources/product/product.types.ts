export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
};

export type CreateProductDTO = Omit<Product, 'id'>;
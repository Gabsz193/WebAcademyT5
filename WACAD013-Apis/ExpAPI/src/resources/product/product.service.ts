import {CreateProductDTO, Product} from "./product.types";

let products: Product[] = [];

export const getProducts = () : Promise<Product[]> => {
    return new Promise<Product[]>((resolve) => {
        resolve(products);
    })
};

export const createProduct = (product: CreateProductDTO) : Promise<Product> => {
    return new Promise<Product>((resolve) => {
        const newProduct = {
            id: products.length + 1,
            ...product
        };
        products.push(newProduct);
        resolve(newProduct);
    })
}
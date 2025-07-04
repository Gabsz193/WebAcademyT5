import {CreateProductDTO, Product, UpdateProductDTO} from "./product.types";

let products: Product[] = [];

export const getProducts = () : Promise<Product[]> => {
    return new Promise<Product[]>((resolve) => {
        resolve(products);
    })
};

export const getProduct = (id: number) : Promise<Product | null> => {
    return new Promise<Product | null>((resolve) => {
        const product = products.find(p => p.id === id);
        if(product) resolve(product);
        else resolve(null);
    })
}

export const createProduct = (product: CreateProductDTO) : Promise<Product> => {
    return new Promise<Product>((resolve) => {
        const newProduct : Product = {
            id: products.length + 1,
            ...product
        };
        products.push(newProduct);
        resolve(newProduct);
    })
}

export const updateProduct = (id: number, product: UpdateProductDTO) : Promise<Product | null> => {
    return new Promise<Product | null>((resolve) => {
        const productIndex = products.findIndex(p => p.id === id);
        if(productIndex >= 0) {
            products[productIndex] = {
                ...products[productIndex],
                ...product
            };
            resolve(products[productIndex]);
        } else {}
    })
}

export const deleteProduct = (id: number) : Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
        const productIndex = products.findIndex(p => p.id === id);
        if(productIndex >= 0) {
            products.splice(productIndex, 1);
            resolve(true);
        }
        resolve(false);
    })
}
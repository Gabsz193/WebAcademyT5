export interface Product {
  id: number;
  name: string;
  price: number;
}

export type ProductCreateDTO = Omit<Product, 'id'>;
export type ProductUpdateDTO = Partial<ProductCreateDTO>;

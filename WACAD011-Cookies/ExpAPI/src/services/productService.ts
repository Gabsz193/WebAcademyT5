import axios from 'axios';
import { Product, ProductCreateDTO, ProductUpdateDTO } from '../types/product';

const API_URL = 'http://localhost:5001/products';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await axios.get<Product>(`${API_URL}/${id}`);
    return response.data;
  },

  async createProduct(product: ProductCreateDTO): Promise<Product> {
    const response = await axios.post<Product>(API_URL, product);
    return response.data;
  },

  async updateProduct(id: number, product: ProductUpdateDTO): Promise<Product> {
    const response = await axios.put<Product>(`${API_URL}/${id}`, product);
    return response.data;
  },

  async deleteProduct(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  }
};

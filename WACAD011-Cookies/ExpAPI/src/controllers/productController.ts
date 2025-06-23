import { Request, Response } from 'express';
import { productService } from '../services/productService';
import { ProductCreateDTO, ProductUpdateDTO } from '../types/product';

export const productController = {
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  },

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid product ID' });
        return;
      }

      const product = await productService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      console.error(`Error fetching product:`, error);
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.status(500).json({ message: 'Server error while fetching product' });
      }
    }
  },

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData: ProductCreateDTO = req.body;

      if (!productData.name || typeof productData.price !== 'number') {
        res.status(400).json({ message: 'Invalid product data. Name and price are required.' });
        return;
      }

      const newProduct = await productService.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Error creating product' });
    }
  },

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid product ID' });
        return;
      }

      const productData: ProductUpdateDTO = req.body;
      const updatedProduct = await productService.updateProduct(id, productData);
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.status(500).json({ message: 'Error updating product' });
      }
    }
  },

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid product ID' });
        return;
      }

      await productService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting product:', error);
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.status(500).json({ message: 'Error deleting product' });
      }
    }
  }
};

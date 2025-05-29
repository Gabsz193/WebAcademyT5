import { Produto } from "../types/products";
import { initializeAxios } from "./db";
import { isProduto } from "./validate";
import { FetchResult } from "../types/fetch";

export async function getProducts(
  id?: string
): Promise<FetchResult<Produto | Produto[]>> {
  const db = initializeAxios();

  let result: FetchResult<Produto | Produto[]>;

  try {
    if (id) {
      const response = await db.get(`/products/${id}`);

      result = {
        success: true,
        message: "Produtos recuperados com sucesso",
        data: response.data
      };
    } else {
      const response = await db.get("/products");

      result = {
        success: true,
        message: "Produto recuperado com sucesso",
        data: response.data
      };
    }
  } catch (e) {
    const error_message = (e as Error).message;

    result = {
      success: false,
      message: error_message
    };
  }

  if (!result.success) throw new Error(result.message);

  return result;
}

export async function createProduct(
  product: Omit<Produto, "id">
): Promise<FetchResult<Produto>> {
  const db = initializeAxios();

  const inserted_product: Produto = {
    ...product,
    id: crypto.randomUUID()
  };

  let result: FetchResult<Produto>;

  if (isProduto(inserted_product)) {
    try {
      await db.post("/products", inserted_product);

      result = {
        success: true,
        message: "Produto criado com sucesso",
        data: inserted_product
      };
    } catch (e) {
      const error_message = (e as Error).message;

      result = {
        success: false,
        message: error_message
      };
    }
  } else {
    result = {
      success: false,
      message: "Produto inválido"
    };
  }

  if (!result.success) throw new Error(result.message);

  return result;
}

export async function updateProduct(
  product: Produto
): Promise<FetchResult<Produto>> {
  const db = initializeAxios();

  let result: FetchResult<Produto>;

  if (isProduto(product)) {
    try {
      await db.put(`/products/${product.id}`, product);

      result = {
        success: true,
        message: "Produto atualizado com sucesso",
        data: product
      };
    } catch (e) {
      const error_message = (e as Error).message;

      result = {
        success: false,
        message: error_message
      };
    }
  } else {
    result = {
      success: false,
      message: "Produto inválido"
    };
  }

  if (!result.success) throw new Error(result.message);

  return result;
}

export async function removeProduct(id: string): Promise<FetchResult<string>> {
  const db = initializeAxios();

  let result: FetchResult<string>;

  try {
    await db.delete(`/products/${id}`);

    result = {
      success: true,
      message: "Produto removido com sucesso",
      data: id
    };
  } catch (e) {
    const error_message = (e as Error).message;

    result = {
      success: false,
      message: error_message
    };
  }

  if (!result.success) throw new Error(result.message);

  return result;
}

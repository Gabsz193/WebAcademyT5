import { Produto } from "../types/products";

export function isProdutoNoID(obj: unknown): obj is Omit<Produto, "id"> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    "price" in obj &&
    "stock" in obj
  );
}

export function isProduto(obj: unknown): obj is Produto {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    "id" in obj &&
    "price" in obj &&
    "stock" in obj
  );
}

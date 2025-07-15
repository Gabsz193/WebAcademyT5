import {Produto} from "@/types/produto";
import {favoritosApi, produtosApi} from "@/app/services/api";

export async function getListaProduto(): Promise<Produto[]> {
  return produtosApi.get("/produto").then((response) => response.data);
}

export async function getProduto(name: string): Promise<Produto> {
  return produtosApi.get(`/produto/${name}`).then((response) => response.data);
}

export async function getFavoritos(): Promise<Produto[]> {
  return favoritosApi.get("/favoritos").then((response) => response.data);
}

export async function addProductFavorito(produto: Produto) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return favoritosApi
  .post<Produto>("/favoritos", produto)
  .then((response) => response.data);
}

export async function removeProductFavorito(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return favoritosApi
  .delete(`/favoritos/${id}`)
  .then((response) => response.data);
}
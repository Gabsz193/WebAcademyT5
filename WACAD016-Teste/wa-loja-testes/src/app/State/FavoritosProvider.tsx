"use client";
import React, { createContext, useContext, useState } from "react";
import { calculaValorComPorcentagemDeDesconto } from "../helpers";

interface IFavoritos {
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export const FavoritosContext = createContext<IFavoritos>({
  favoritos: [] as Produto[],
  setFavoritos: () => {},
});

interface FavoritosProviderProps {
  children: React.ReactNode;
}

export const FavoritosProvider = ({ children }: FavoritosProviderProps) => {
  const [favoritos, setFavoritos] = useState<Produto[] | []>([]);

  return (
    <FavoritosContext.Provider value={{ favoritos, setFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritosContext = () => {
  const favoritosContext = useContext(FavoritosContext);

  return favoritosContext;
};

export const useProdutoFavorito = (id: string) => {
  const { favoritos } = useContext(FavoritosContext);

  const produtoFavorito = favoritos.some((item) => item.id === id);

  return produtoFavorito;
};

export const useProdutosFavoritos = () => {
  const { favoritos } = useContext(FavoritosContext);

  return favoritos;
};

export const useValorTotalFavoritos = () => {
  const { favoritos } = useContext(FavoritosContext);

  const valorTotal = favoritos.reduce((acc, produto) => {
    return (
      acc +
      calculaValorComPorcentagemDeDesconto(
        Number(produto.preco),
        produto.desconto
      )
    );
  }, 0);

  return valorTotal;
};

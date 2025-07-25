"use client";
import React, {useContext, useState} from 'react';
import {FavoritoContext} from "@/app/context/FavoritoContext";
import {calculaValorComPorcentagemDeDesconto} from "@/app/helpers";

function FavoritoProvider({children}: Readonly<{ children: React.ReactNode; }>) {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  return (
    <FavoritoContext.Provider value={{favoritos, setFavoritos}}>
      {children}
    </FavoritoContext.Provider>
  );
}

export function useFavoritosContext() {
  return useContext(FavoritoContext);
}

export function useIsFavorito(id: string) {
  const {favoritos} = useFavoritosContext();
  return favoritos.some((item) => item.id === id);
}

export function useRemoveFavorito() {
  const {setFavoritos} = useFavoritosContext();

  return (id: string) => {
    setFavoritos((favoritos) => favoritos.filter((item) => item.id !== id));
  };
}

export function useAddFavorito() {
  const {favoritos, setFavoritos} = useFavoritosContext();

  return (produto: Produto) => {
    const ehFavorito = favoritos.some((item) => item.id === produto.id);
    if (ehFavorito) {
      return;
    }

    setFavoritos([...favoritos, produto]);
  }

}

export function useCalculateValorFavoritos() {
  const {favoritos} = useFavoritosContext();

  return favoritos.reduce((acc, produto) => {
    return (
      acc +
      calculaValorComPorcentagemDeDesconto(
        Number(produto.preco),
        produto.desconto
      )
    );
  }, 0);
}

export default FavoritoProvider;
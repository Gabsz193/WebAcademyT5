import React, {createContext} from "react";

export interface IFavoritoContext {
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export const FavoritoContext = createContext<IFavoritoContext>({
  favoritos: [],
  setFavoritos: () => {}
});
"use client";
import React, {useState} from 'react';
import {FavoritoContext} from "@/app/context/FavoritoContext";

function FavoritoProvider({children}: Readonly<{ children: React.ReactNode; }>) {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  return (
    <FavoritoContext.Provider value={{favoritos, setFavoritos}}>
      {children}
    </FavoritoContext.Provider>
  );
}

export default FavoritoProvider;
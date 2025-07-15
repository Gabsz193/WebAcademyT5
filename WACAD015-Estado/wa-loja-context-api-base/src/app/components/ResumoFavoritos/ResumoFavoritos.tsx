import CardProduto from "../CardProduto/CardProduto";
import {FavoritoContext} from "@/app/context/FavoritoContext";
import {useContext} from "react";

export default function ResumoFavoritos() {
  const { favoritos, setFavoritos } = useContext(FavoritoContext);

  const ultimosFavoritos = favoritos.slice(-3).reverse();

  return (
    <>
      <h5 className="mb-3 mt-4 mt-lg-0 ms-1">Últimos favoritados:</h5>

      <div className="row row-cols-1 g-3 border rounded-1 pb-3 mt-3 bg-light ms-1">
        {ultimosFavoritos.length === 0 ? (
          <div>
            <p className="text-muted">Sua lista está vazia</p>
          </div>
        ) : (
          ultimosFavoritos.map((produto) => (
            <CardProduto
              key={produto.id}
              produto={produto}
              mostrarImagem={false}
              mostrarBotao={false}
            />
          ))
        )}
      </div>
    </>
  );
}

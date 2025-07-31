import CardProduto from "../CardProduto/CardProduto";
import { useFavoritosContext } from "@/app/State/FavoritosProvider";

interface IListagemProdutos {
  produtos: Produto[];
}

export default function ListagemProdutos({ produtos }: IListagemProdutos) {
  const { setFavoritos } = useFavoritosContext();

  return (
    <>
      <h5 className="mb-3 fw-bold">Produtos disponíveis:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            setFavoritos={setFavoritos}
          />
        ))}
      </div>
    </>
  );
}

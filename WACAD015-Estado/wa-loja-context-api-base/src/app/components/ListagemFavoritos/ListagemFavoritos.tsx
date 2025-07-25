import ItemFavorito from "../ItemFavorito/ItemFavorito";
import {useCalculateValorFavoritos, useFavoritosContext} from "@/app/provider/FavoritoProvider";

export default function ListagemFavoritos() {

  const { favoritos : produtosFavoritos } = useFavoritosContext();

  const valorTotalFavoritos = useCalculateValorFavoritos();

  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-bold">Lista de favoritos:</h5>

        {produtosFavoritos.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Desconto</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {produtosFavoritos.map((item) => (
                  <ItemFavorito
                    key={item.id}
                    itemFavorito={item}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Sua lista de favoritos está vazia.</p>
        )}
      </div>
      <div className="card-footer d-flex flex-column">
        <small className="text-muted">
          Quantidade de produtos: {produtosFavoritos.length}
        </small>

        <small className="text-muted">
          Valor total: R$ {valorTotalFavoritos}
        </small>
      </div>
    </div>
  );
}

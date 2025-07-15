"use client";
import React from "react";
import useListaFavoritos from "@/app/hooks/useListaFavoritos";
import ItemFavorito from "@/app/components/ListagemFavoritos/ItemFavorito";

export default function ListagemFavoritos() {
  const {favoritos, isError, isPending: isPending} = useListaFavoritos();

  if (isPending) return <h5>Carregando...</h5>;

  if (isError) return <h5>Erro ao carregar produtos.</h5>;

  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">
          Produtos favoritados
        </h5>
        {favoritos?.length === 0 ? "Não há produtos favoritados." :
          <div className="table-responsive">
            <table className="table ">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Valor</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {favoritos?.map(produto => (
                    <ItemFavorito key={produto.id} produto={produto}/>
                  )
                )}
              </tbody>
            </table>
          </div>
        }

      </div>
    </div>
  );
}

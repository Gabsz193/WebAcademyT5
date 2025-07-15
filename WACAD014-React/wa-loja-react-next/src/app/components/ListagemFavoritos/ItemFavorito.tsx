import React from "react";
import {Produto} from "@/types/produto";
import {useRemoveFavorito} from "@/app/hooks/useRemoveFavorito";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";

interface ItemFavoritoProps {
  produto: Produto
}

export default function ItemFavorito({ produto }: ItemFavoritoProps) {
  const queryClient = useQueryClient();

  const {removeFavorito, isPending} = useRemoveFavorito(
    () => {
      toast.success("Produto removido dos favoritos!");
      queryClient.invalidateQueries({ queryKey: ["listaFavoritos"] });
    },
    () => toast.error("Algo deu errado")
  );

  return (
    <tr>
      <td>{produto.nome}</td>
      <td>R$ {produto.preco}</td>
      <td>
        <button disabled={isPending} onClick={() => removeFavorito(produto.id)}
                className="btn btn-danger btn-sm">Remover
        </button>
      </td>
    </tr>
  );
}

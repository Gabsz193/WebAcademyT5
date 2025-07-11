import React from "react";
import {ItemCarrinho as ItemCarrinhoType} from "@/types/itemCarrinho";

interface ItemCarrinhoProps {
  itemCarrinho: ItemCarrinhoType;
}

export default function ItemCarrinho({
  itemCarrinho
}: ItemCarrinhoProps) {
  const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number
  ): number => precoUnitario * quantidade;

  return (
    <tr>
      <td>{itemCarrinho.nome}</td>
      <td>R$ {(itemCarrinho.preco).toFixed(2)}</td>
      <td>{itemCarrinho.quantidade}</td>

      <td>R$ {valorTotalProduto(itemCarrinho.preco, 2).toFixed(2)}</td>
      <td>
        <button className="btn btn-danger btn-sm">
          Remover
        </button>
      </td>
    </tr>
  );
}

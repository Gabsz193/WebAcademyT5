import React from "react";
import CardProduto from "@/app/components/CardProduto";
import {Produto} from "@/types/produto";

interface ListagemProdutosProps {
  produtos: Produto[];
  handleAdiciona: (produto: Produto) => void;
}

export default function ListagemProdutos({
  produtos,
  handleAdiciona
}: ListagemProdutosProps) {
  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {produtos.map(produto => (
          <CardProduto handleAdiciona={handleAdiciona} key={produto.id} produto={produto} />
        ))}
      </div>
    </>
  );
}

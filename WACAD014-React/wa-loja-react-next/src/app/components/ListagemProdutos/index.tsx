import React from "react";
import CardProduto from "@/app/components/CardProduto";
import {Produto} from "@/types/produto";
import {useListaProdutos} from "@/app/hooks/useListaProdutos";

interface ListagemProdutosProps {
  handleAdiciona: (produto: Produto) => void;
}

export default function ListagemProdutos({
  handleAdiciona
}: ListagemProdutosProps) {
  const { produtos, isPending, isError } = useListaProdutos();

  if(isPending) return <h5>Carregando...</h5>;

  if(isError) return <h5>Erro ao carregar produtos.</h5>;

  if(!produtos) return <h5>Não há produtos disponíveis no momento.</h5>

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

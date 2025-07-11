"use client";
import React, {useState} from "react";
import ResumoCarrinho from "@/app/components/ResumoCarrinho";
import ListagemProdutos from "@/app/components/ListagemProdutos";
import {Produto} from "@/types/produto";
import {mockProdutos} from "@/mocks/produtos";

export default function ProdutosPage() {
  const [produtos] = useState<Produto[]>(mockProdutos)
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);

  const adicionarAoCarrinho = (produto: Produto) => {
    setValorTotal((total) => total + parseFloat(produto.preco));
    setQuantidadeTotal((total) => total + 1);
  }

  return (
    <div className="container p-5">
      <ResumoCarrinho
        quantidadeTotal={quantidadeTotal}
        valorTotal={valorTotal}
      />

      <ListagemProdutos handleAdiciona={adicionarAoCarrinho} produtos={produtos}/>
    </div>
  );
}
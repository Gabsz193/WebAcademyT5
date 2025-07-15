"use client";
import React, {useState} from "react";
import ResumoCarrinho from "@/app/components/ResumoCarrinho";
import ListagemProdutos from "@/app/components/ListagemProdutos";
import {Produto} from "@/types/produto";

export default function ProdutosPage() {
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);

  const adicionarAoCarrinho = (produto: Produto) => {
    setValorTotal((total) => total + parseFloat(produto.preco));
    setQuantidadeTotal((total) => total + 1);
  }

  return (
    <main>
      <div className="container p-5">
        <ResumoCarrinho
          quantidadeTotal={quantidadeTotal}
          valorTotal={valorTotal}
        />

        <ListagemProdutos handleAdiciona={adicionarAoCarrinho} />
      </div>
    </main>
  );
}
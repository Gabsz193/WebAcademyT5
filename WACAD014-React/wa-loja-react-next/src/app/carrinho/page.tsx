"use client";
import React, {useState} from "react";
import ResumoCarrinho from "@/app/components/ResumoCarrinho";
import ListagemCarrinho from "@/app/components/ListagemCarrinho";
import {mockItensCarrinho} from "@/mocks/itensCarrinho";
import {ItemCarrinho} from "@/types/itemCarrinho";

export default function CarrinhoPage() {
  const [itensCarrinho] = useState<ItemCarrinho[]>(mockItensCarrinho);

  return (
    <main>
      <div className="container p-5">
        <ListagemCarrinho itensCarrinho={itensCarrinho} />

        <ResumoCarrinho
          quantidadeTotal={itensCarrinho.length}
          valorTotal={itensCarrinho.reduce(
            (total, item) => total + item.preco, 0
          )}
        />
      </div>
    </main>
  );
}
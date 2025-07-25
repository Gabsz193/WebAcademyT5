import React from "react";
import ItemCarrinho from "@/app/components/ItemCarrinho";
import { ItemCarrinho as ItemCarrinhoType } from '@/types/itemCarrinho'



interface ListagemCarrinhoProps {
  itensCarrinho: ItemCarrinhoType[];
  handleRemoverItem: (id: string) => void;
}

export default function ListagemCarrinho({
  itensCarrinho,
  handleRemoverItem
}: ListagemCarrinhoProps) {

  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">
          Produtos selecionados
        </h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {itensCarrinho.map((item) => (
                <ItemCarrinho handleRemover={handleRemoverItem} key={item.id} itemCarrinho={item}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

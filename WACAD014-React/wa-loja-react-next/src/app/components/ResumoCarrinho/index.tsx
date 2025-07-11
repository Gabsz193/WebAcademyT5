import React from "react";

interface ResumoCarrinhoProps {
  quantidadeTotal: number;
  valorTotal: number;
}

export default function ResumoCarrinho({
  quantidadeTotal,
  valorTotal
}: ResumoCarrinhoProps) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
        <p className="card-text fw-medium">Quantidade total: {quantidadeTotal}</p>
        <p className="card-text fw-medium">
          Valor total: R${valorTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

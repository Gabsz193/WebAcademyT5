import Image from "next/image";
import React from "react";
import {Produto} from "@/types/produto";
import {useAddFavorito} from "@/app/hooks/useAddFavorito";
import {toast} from "react-toastify";
import Link from "next/link";

interface CardProdutoProps {
  produto: Produto;
  handleAdiciona: (produto: Produto) => void;
}

export default function CardProduto({
  produto,
  handleAdiciona
}: CardProdutoProps) {
  const {isPending, addFavorito} = useAddFavorito(
    () => toast.success("Produto adicionado aos favoritos!"),
    () => toast.error("Algo deu errado")
  )

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={produto.fotos[0].src}
          className="card-img-top"
          alt={produto.fotos[0].titulo}
          width={300}
          height={320}
        />

        <div className="card-body bg-light">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title mb-0">{produto.nome}</h5>
            <button disabled={isPending} onClick={() => addFavorito(produto)} className="btn btn-link text-danger p-0"
                    type="button">
              {isPending ? <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div> : <i className="bi bi-heart"></i>}
            </button>
          </div>
          <p className="card-text text-secondary">R$ {produto.preco}</p>
          <Link href={`/produto/${produto.id}`} className="btn btn-light d-block w-100 mb-2" type="button">
            Visualizar detalhes
          </Link>
          <button onClick={() => handleAdiciona(produto)} className="btn btn-dark d-block w-100" type="button">
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

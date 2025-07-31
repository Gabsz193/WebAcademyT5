import { useProdutoFavorito } from "@/app/State/FavoritosProvider";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import Image from "next/image";

interface CardProdutoProps {
  produto: Produto;
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export default function CardProduto({
  produto,
  setFavoritos,
}: CardProdutoProps) {
  const ehFavorito = useProdutoFavorito(produto.id);

  const adicionarAosFavoritos = (produto: Produto) => {
    setFavoritos((favoritos) => [...favoritos, produto]);
  };

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

        <div className="card-body bg-ligth">
          <span className="badge text-bg-success text-white mb-2">
            {produto.desconto}% de desconto
          </span>
          <h5 className="card-title fw-bold">{produto.nome}</h5>
          <span className="text-secondary">De R$ {produto.preco}</span>
          <h5 className="card-text">
            Por R${" "}
            {calculaValorComPorcentagemDeDesconto(
              Number(produto.preco),
              produto.desconto
            )}
          </h5>

          <button
            className={
              ehFavorito
                ? "btn btn-success d-block w-100"
                : "btn btn-secondary d-block w-100"
            }
            type="button"
            onClick={() => adicionarAosFavoritos(produto)}
            disabled={ehFavorito}
          >
            {ehFavorito
              ? "Adicionado aos favoritos"
              : "Adicionar aos favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}

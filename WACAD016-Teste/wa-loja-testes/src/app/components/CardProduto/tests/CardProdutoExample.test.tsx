import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardProduto from "../CardProduto";
import { mockProdutos } from "@/app/mocks/produtos";
import {
  FavoritosProvider,
  useProdutoFavorito,
} from "../../../State/FavoritosProvider";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";

jest.mock("../../../State/FavoritosProvider", () => ({
  ...jest.requireActual("../../../State/FavoritosProvider"),
  useProdutoFavorito: jest.fn(),
}));

describe("CardProduto", () => {
  it("deve renderizar corretamente as informações de produto", () => {
    const useProdutoFavoritoMock = useProdutoFavorito as jest.Mock;
    useProdutoFavoritoMock.mockReturnValue(false);

    const produtoMockado = mockProdutos[0];
    const { nome, preco, fotos, desconto } = produtoMockado;

    const precoComDesconto = calculaValorComPorcentagemDeDesconto(
      Number(produtoMockado.preco),
      produtoMockado.desconto
    );

    render(
      <FavoritosProvider>
        <CardProduto produto={produtoMockado} setFavoritos={() => {}} />
      </FavoritosProvider>
    );

    expect(screen.getByText(`${desconto}% de desconto`)).toBeInTheDocument();
    expect(screen.getByText(nome)).toBeInTheDocument();
    expect(screen.getByText(`De R$ ${preco}`)).toBeInTheDocument();
    expect(screen.getByText(`Por R$ ${precoComDesconto}`)).toBeInTheDocument();
    expect(screen.getByAltText(fotos[0].titulo)).toBeInTheDocument();
  });

  it("deve ser possível clicar no botão adicionar aos favoritos", async () => {
    const setFavoritos = jest.fn();
    const useProdutoFavoritoMock = useProdutoFavorito as jest.Mock;
    useProdutoFavoritoMock.mockReturnValue(false);

    render(
      <FavoritosProvider>
        <CardProduto produto={mockProdutos[0]} setFavoritos={setFavoritos} />
      </FavoritosProvider>
    );

    const botao = screen.getByRole("button", {
      name: /Adicionar aos favoritos/i,
    });

    await userEvent.click(botao);

    expect(setFavoritos).toHaveBeenCalledTimes(1);
  });

  it("não deve ser possível clicar no botão adicionar aos favoritos se ja for favoritado", async () => {
    const setFavoritos = jest.fn();
    const useProdutoFavoritoMock = useProdutoFavorito as jest.Mock;
    useProdutoFavoritoMock.mockReturnValue(true);

    render(
      <FavoritosProvider>
        <CardProduto produto={mockProdutos[0]} setFavoritos={setFavoritos} />
      </FavoritosProvider>
    );

    const botao = screen.getByRole("button", {
      name: /Adicionado/i,
    });

    await userEvent.click(botao);

    expect(setFavoritos).not.toHaveBeenCalled();
  });
});

import {mockProdutos} from "@/app/mocks/produtos";
import {calculaValorComPorcentagemDeDesconto} from "@/app/helpers";
import {render, screen} from "@testing-library/react";
import ItemFavorito from "@/app/components/ItemFavorito/ItemFavorito";
import userEvent from "@testing-library/user-event";

const producoMock = mockProdutos[0];

describe('ItemFavorito', () => {
  it('deve renderizar corretamente as informações do item favorito', () => {
    const precoComDesconto = calculaValorComPorcentagemDeDesconto(
      Number(producoMock.preco),
      producoMock.desconto
    ).toFixed(2);

    render(
      <ItemFavorito itemFavorito={producoMock} setFavoritos={() => {
      }}/>
    )

    expect(screen.getByText(producoMock.nome)).toBeInTheDocument();
    expect(screen.getByText(producoMock.descricao)).toBeInTheDocument()
    expect(screen.getByText(`R$ ${precoComDesconto}`)).toBeInTheDocument();
    expect(screen.getByText(`${producoMock.desconto}%`));
  })

  it('deve chamar a função de remover favorito ao clicar no botão', async () => {
    const setFavoritosMock = jest.fn();

    render(
      <ItemFavorito itemFavorito={producoMock} setFavoritos={setFavoritosMock}/>
    )

    const botaoRemover = screen.getByRole('button', {name: /Remover/i});
    await userEvent.click(botaoRemover);

    expect(setFavoritosMock).toHaveBeenCalledTimes(1);

  })
})
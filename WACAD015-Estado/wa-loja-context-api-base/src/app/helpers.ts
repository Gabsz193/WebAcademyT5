export const calculaValorComPorcentagemDeDesconto = (
  preco: number,
  desconto: number
) => {
  return preco - (preco * desconto) / 100;
};

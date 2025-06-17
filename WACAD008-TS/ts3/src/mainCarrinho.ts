// Importações necessárias
import { Produto } from "./produto.js";
import { DOMManager } from "./dom_manager.js";
import { SessionStorage } from "./session.js";
import {CarrinhoDeCompras} from "./carrinho.js";
import {ID} from "./types.js";

const domManager = new DOMManager();
const storageProdutos = new SessionStorage<Produto>("produtos"); // Armazena os produtos disponíveis
const storageCarrinho = new SessionStorage<Produto & { id_carrinho: ID }>("carrinho"); // Armazena os itens do carrinho
let produtosDisponiveis: Produto[] = [];
const carrinho: CarrinhoDeCompras = new CarrinhoDeCompras(storageCarrinho.getAll());

// Função para carregar produtos disponíveis no select
function carregarProdutosDisponiveis(): void {
  produtosDisponiveis = storageProdutos.getAll();
  document.dispatchEvent(new Event("updateProdutoSelect")); // Atualiza select
}

// Função para carregar itens do carrinho
function carregarCarrinhoPersistido(): void {
  document.dispatchEvent(new Event("updateRenderCarrinho")); // Atualiza interface
}

// Evento para exibir produtos disponíveis no select
document.addEventListener("updateProdutoSelect", () => {
  const produtoSelect = document.getElementById("produtoSelect") as HTMLSelectElement;

  // Reseta as opções
  produtoSelect.innerHTML = `<option value="" selected disabled>Selecione um produto...</option>`;

  // Adiciona os produtos disponíveis
  produtosDisponiveis.forEach((produto) => {
    const option = document.createElement("option");
    option.value = produto.id; // Usa o modelo como identificador
    option.textContent = `${produto.modelo} - ${produto.fabricante} (R$ ${produto.valor.toFixed(2)})`;
    produtoSelect.appendChild(option);
  });
});

// Evento para adicionar um produto ao carrinho
document.addEventListener("addProdutoCarrinho", (e: any) => {
  const idSelecionado = e.detail;

  // Encontra o produto nos disponíveis
  const produtoSelecionado = produtosDisponiveis.find((p) => p.id === idSelecionado);

  if (produtoSelecionado) {
    const id = carrinho.adicionarItem(produtoSelecionado);
    storageCarrinho.push({...produtoSelecionado, id_carrinho: id}); // Salva o carrinho atualizado

    // Atualiza a tabela de carrinho
    document.dispatchEvent(new Event("updateRenderCarrinho"));

    alert("Produto adicionado ao carrinho!");
  } else {
    alert("Produto selecionado é inválido!");
  }
});

// Evento para remover produto do carrinho
document.addEventListener("removeProdutoCarrinho", (e: any) => {
  const idSelecionado = e.detail;
  // Remove o produto do carrinho
  carrinho.removerItem(idSelecionado);
  storageCarrinho.deleteByKey("id_carrinho", idSelecionado); // Atualiza no storage

  // Atualiza a tabela de carrinho
  document.dispatchEvent(new Event("updateRenderCarrinho"));
});

// Evento para renderizar o carrinho
document.addEventListener("updateRenderCarrinho", () => {
  domManager.renderCarrinho(carrinho, (id) => {
    document.dispatchEvent(new CustomEvent("removeProdutoCarrinho", { detail: id }));
  });
});

// Adicionar produto ao carrinho ao clicar no botão
const addProdutoCarrinhoBtn = document.getElementById("addProdutoCarrinhoBtn") as HTMLButtonElement;
addProdutoCarrinhoBtn.addEventListener("click", () => {
  const produtoSelect = document.getElementById("produtoSelect") as HTMLSelectElement;
  const idSelecionado = produtoSelect.value;

  if (idSelecionado) {
    document.dispatchEvent(new CustomEvent("addProdutoCarrinho", { detail: idSelecionado }));
  } else {
    alert("Por favor, selecione um produto válido!");
  }
});

// Inicialização ao carregar a página
carregarProdutosDisponiveis();
carregarCarrinhoPersistido();
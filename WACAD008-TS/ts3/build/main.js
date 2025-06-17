// Importações necessárias
import { TV, Celular, Bicicleta } from "./produto.js";
import { DOMManager } from "./dom_manager.js";
import { SessionStorage } from "./session.js";
import { isBicicleta, isCelular, isTV } from "./utils.js";
const domManager = new DOMManager();
const storage = new SessionStorage("produtos"); // SessionStorage para produtos
let produtos = [];
// Função para carregar produtos já persistidos
function carregarProdutosPersistidos() {
    produtos = storage.getAll();
    produtos = produtos.map(prod => {
        if (isTV(prod)) {
            return new TV(prod.id, prod.modelo, prod.resolucao, prod.tamanhoPolegadas, prod.fabricante, prod.valor);
        }
        else if (isCelular(prod)) {
            return new Celular(prod.id, prod.modelo, prod.memoria, prod.fabricante, prod.valor);
        }
        else if (isBicicleta(prod)) {
            return new Bicicleta(prod.id, prod.modelo, prod.tamanhoAro, prod.fabricante, prod.valor);
        }
        else {
            throw new Error("Produto desconhecido");
        }
    });
    document.dispatchEvent(new Event("updateRenderProdutos")); // Atualiza interface
}
// Criação de um novo produto com base no tipo
function criarProduto(tipo, dados) {
    const id = crypto.randomUUID();
    switch (tipo) {
        case "tv":
            return new TV(id, dados.modelo, dados.resolucao, dados.tamanhoPolegadas, dados.fabricante, dados.valor);
        case "celular":
            return new Celular(id, dados.modelo, dados.memoria, dados.fabricante, dados.valor);
        case "bicicleta":
            return new Bicicleta(id, dados.modelo, dados.tamanhoAro, dados.fabricante, dados.valor);
        default:
            throw new Error("Tipo de produto inválido!");
    }
}
// Evento para adicionar um produto
document.addEventListener("addProduto", (e) => {
    const produto = e.detail;
    // Adiciona o produto à lista e salva no sessionStorage
    produtos.push(produto);
    storage.push(produto);
    // Atualiza a interface
    document.dispatchEvent(new Event("updateRenderProdutos"));
});
// Evento para remover um produto
document.addEventListener("removeProduto", (e) => {
    const produtoId = e.detail;
    produtos = produtos.filter((p) => p.id !== produtoId); // Filtra o produto a ser removido no array
    storage.deleteByKey("id", produtoId); // Remove do sessionStorage
    // Atualiza a interface
    document.dispatchEvent(new Event("updateRenderProdutos"));
});
// Evento para editar um produto
document.addEventListener("editProduto", (e) => {
    const produtoId = e.detail;
    const produto = produtos.find((p) => p.id === produtoId);
    if (produto) {
        // Preencher os campos do modal de edição com os dados do produto
        document.getElementById("editProdutoId").value = produto.id;
        document.getElementById("editProdutoModelo").value = produto.modelo;
        document.getElementById("editProdutoFabricante").value = produto.fabricante;
        document.getElementById("editProdutoValor").value = produto.valor.toString();
        // Abrir o modal
        const modalElement = document.getElementById("editProdutoModal");
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
});
// Evento para salvar os dados do produto editado
const editProdutoForm = document.getElementById("editProdutoForm");
editProdutoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const produtoId = document.getElementById("editProdutoId").value;
    const produto = produtos.find((p) => p.id === produtoId);
    if (produto) {
        // Atualiza os dados do produto
        produto.modelo = document.getElementById("editProdutoModelo").value;
        produto.fabricante = document.getElementById("editProdutoFabricante").value;
        produto.valor = parseFloat(document.getElementById("editProdutoValor").value);
        // Atualiza no storage
        storage.updateByKey("id", produtoId, produto);
        // Atualiza a tabela
        document.dispatchEvent(new Event("updateRenderProdutos"));
        // Fecha o modal
        const modalElement = document.getElementById("editProdutoModal");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance?.hide();
    }
});
// Evento para atualizar a interface com os produtos
document.addEventListener("updateRenderProdutos", () => {
    domManager.renderProdutos(produtos, (produto) => document.dispatchEvent(new CustomEvent("editProduto", { detail: produto.id })), (produto) => document.dispatchEvent(new CustomEvent("removeProduto", { detail: produto.id })));
});
// Captura o evento de envio do formulário para adicionar um novo produto
const addProdutoForm = document.getElementById("addProdutoForm");
addProdutoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const tipoEl = document.getElementById("produtoTipo");
    const modeloEl = document.getElementById("produtoModelo");
    const fabricanteEl = document.getElementById("produtoFabricante");
    const valorEl = document.getElementById("produtoValor");
    const tipo = tipoEl.value;
    const dados = {
        modelo: modeloEl.value,
        fabricante: fabricanteEl.value,
        valor: parseFloat(valorEl.value),
    };
    // Ajusta os dados específicos para cada tipo de produto
    if (tipo === "tv") {
        dados.resolucao = document.getElementById("produtoResolucao").value;
        dados.tamanhoPolegadas = parseInt(document.getElementById("produtoTamanhoPolegadas").value, 10);
    }
    else if (tipo === "celular") {
        dados.memoria = document.getElementById("produtoMemoria").value;
    }
    else if (tipo === "bicicleta") {
        dados.tamanhoAro = parseInt(document.getElementById("produtoTamanhoAro").value, 10);
    }
    try {
        // Cria o produto da classe específica
        const novoProduto = criarProduto(tipo, dados);
        // Emite evento para adicionar o produto
        document.dispatchEvent(new CustomEvent("addProduto", { detail: novoProduto }));
        // Reseta o formulário e fecha o modal
        addProdutoForm.reset();
        const modalElement = document.getElementById("addProdutoModal");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance?.hide();
    }
    catch (error) {
        // Exibe o erro em um alerta
        if (error instanceof Error)
            alert(error.message);
    }
});
// Carregar os produtos persistidos ao iniciar
carregarProdutosPersistidos();

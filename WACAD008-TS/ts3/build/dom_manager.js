export class DOMManager {
    produtosTableEl;
    carrinhoTableEl;
    constructor() {
        // Elementos para renderizar os produtos e carrinho
        this.produtosTableEl = document.getElementById("produtosTable");
        this.carrinhoTableEl = document.getElementById("carrinhoTable");
    }
    /**
     * Renderiza os produtos na tela de produtos (`index.html`)
     */
    renderProdutos(produtos, onEdit, onDelete) {
        if (!this.produtosTableEl)
            return;
        this.produtosTableEl.innerHTML = produtos.length
            ? ""
            : '<tr id="semProdutos"><td colspan="6" class="text-center">Nenhum produto adicionado.</td></tr>';
        produtos.forEach((produto, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${produto.modelo}</td>
        <td>${produto.fabricante}</td>
        <td>R$ ${produto.valor.toFixed(2)}</td>
        <td>${produto.getDetalhes()}</td>
        <td>
          <button class="btn btn-warning btn-sm me-2">Editar</button>
          <button class="btn btn-danger btn-sm me-2">Remover</button>
        </td>
      `;
            // Adiciona os listeners para cada uma das ações
            tr.querySelector(".btn-warning")?.addEventListener("click", () => onEdit(produto));
            tr.querySelector(".btn-danger")?.addEventListener("click", () => onDelete(produto));
            this.produtosTableEl?.appendChild(tr);
        });
    }
    /**
     * Renderiza os itens no carrinho (`carrinho.html`)
     */
    renderCarrinho(carrinho, onRemove) {
        if (!this.carrinhoTableEl)
            return;
        const itens = carrinho.listarItens();
        this.carrinhoTableEl.innerHTML = itens.length
            ? ""
            : '<tr id="carrinhoVazio"><td colspan="5" class="text-center">Seu carrinho está vazio.</td></tr>';
        let totalItens = 0;
        let valorTotal = 0;
        console.log(itens);
        itens.forEach((item, index) => {
            totalItens++;
            valorTotal += item.valor;
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.modelo}</td>
        <td>${item.fabricante}</td>
        <td>R$ ${item.valor.toFixed(2)}</td>
        <td>${item.getDetalhes()}</td>
        <td>
          <button class="btn btn-danger btn-sm">Remover</button>
        </td>
      `;
            // Botão para remover item do carrinho
            tr.querySelector(".btn-danger")?.addEventListener("click", () => onRemove(item.id_carrinho));
            this.carrinhoTableEl?.appendChild(tr);
        });
        // Atualiza estatísticas do carrinho
        const totalItensEl = document.getElementById("totalItens");
        const valorTotalEl = document.getElementById("valorTotal");
        if (totalItensEl)
            totalItensEl.textContent = totalItens.toString();
        if (valorTotalEl)
            valorTotalEl.textContent = valorTotal.toFixed(2);
    }
}

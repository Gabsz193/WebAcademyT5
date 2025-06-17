// Carrinho de compras genérico
import {Bicicleta, Celular, Produto, TV} from "./produto.js";
import {ID} from "./types";
import {isBicicleta, isCelular, isTV} from "./utils.js";

export class CarrinhoDeCompras {
    private itens: Array<Produto & { id_carrinho: ID }> = []; // Produtos no carrinho

    constructor(itens: Array<Produto & { id_carrinho: ID }> = []) {
        this.itens = itens.map(prod => {
            let item : any;
            if(isTV(prod)) {
                item = new TV(prod.id, prod.modelo, prod.resolucao, prod.tamanhoPolegadas, prod.fabricante, prod.valor)
            } else if(isCelular(prod)) {
                item = new Celular(prod.id, prod.modelo, prod.memoria, prod.fabricante, prod.valor)
            } else if(isBicicleta(prod)) {
                item = new Bicicleta(prod.id, prod.modelo, prod.tamanhoAro, prod.fabricante, prod.valor)
            }
            item.id_carrinho = prod.id_carrinho
            return item
        });
    }

    adicionarItem(item: Produto): ID {
        const id_carrinho = crypto.randomUUID()
        this.itens.push({...item, id_carrinho});
        this.itens = this.itens.map(prod => {
            let item : any;
            if(isTV(prod)) {
                item = new TV(prod.id, prod.modelo, prod.resolucao, prod.tamanhoPolegadas, prod.fabricante, prod.valor)
            } else if(isCelular(prod)) {
                item = new Celular(prod.id, prod.modelo, prod.memoria, prod.fabricante, prod.valor)
            } else if(isBicicleta(prod)) {
                item = new Bicicleta(prod.id, prod.modelo, prod.tamanhoAro, prod.fabricante, prod.valor)
            }
            item.id_carrinho = prod.id_carrinho
            return item
        });
        return id_carrinho;
    }

    removerItem(id: ID): void {
        const index = this.itens.findIndex((item) => item.id_carrinho === id);
        if (index > -1) {
            this.itens.splice(index, 1);
            console.log(`${id} removido do carrinho.`);
        } else {
            console.log(`Produto com id ${id} não encontrado no carrinho.`);
        }
    }

    calcularTotal(): number {
        return this.itens.reduce((total, item) => total + item.valor, 0);
    }

    listarItens(): Array<Produto & { id_carrinho: ID }> {
        return this.itens;
    }
}

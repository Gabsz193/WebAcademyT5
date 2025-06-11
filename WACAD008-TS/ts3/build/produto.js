// Classes específicas para os Produtos
export class TV {
    id;
    modelo;
    resolucao;
    tamanhoPolegadas;
    fabricante;
    valor;
    constructor(id, modelo, resolucao, tamanhoPolegadas, fabricante, valor) {
        this.id = id;
        this.modelo = modelo;
        this.resolucao = resolucao;
        this.tamanhoPolegadas = tamanhoPolegadas;
        this.fabricante = fabricante;
        this.valor = valor;
        this.valor = valor;
        this.id = id;
        this.modelo = modelo;
        this.resolucao = resolucao;
        this.tamanhoPolegadas = tamanhoPolegadas;
        this.fabricante = fabricante;
    }
    getDetalhes() {
        return `Resolução: ${this.resolucao}, Tamanho em polegadas: ${this.tamanhoPolegadas}`;
    }
}
export class Celular {
    id;
    modelo;
    memoria;
    fabricante;
    valor;
    constructor(id, modelo, memoria, fabricante, valor) {
        this.id = id;
        this.modelo = modelo;
        this.memoria = memoria;
        this.fabricante = fabricante;
        this.valor = valor;
        this.valor = valor;
        this.id = id;
        this.modelo = modelo;
        this.memoria = memoria;
        this.fabricante = fabricante;
    }
    getDetalhes() {
        return `Memória: ${this.memoria}`;
    }
}
export class Bicicleta {
    id;
    modelo;
    tamanhoAro;
    fabricante;
    valor;
    constructor(id, modelo, tamanhoAro, fabricante, valor) {
        this.id = id;
        this.modelo = modelo;
        this.tamanhoAro = tamanhoAro;
        this.fabricante = fabricante;
        this.valor = valor;
        this.valor = valor;
        this.id = id;
        this.modelo = modelo;
        this.tamanhoAro = tamanhoAro;
        this.fabricante = fabricante;
    }
    getDetalhes() {
        return `Tamanho do Aro: ${this.tamanhoAro}`;
    }
}

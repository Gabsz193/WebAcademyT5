import {ID} from "./types";

// Interface base para os produtos
export interface Produto {
    id: ID;
    modelo: string;
    fabricante: string;
    valor: number;
    getDetalhes: () => string;
}

// Classes específicas para os Produtos
export class TV implements Produto {
    constructor(
        public id: ID,
        public modelo: string,
        public resolucao: string,
        public tamanhoPolegadas: number,
        public fabricante: string,
        public valor: number
    ) {
        this.valor = valor;
        this.id = id;
        this.modelo = modelo;
        this.resolucao = resolucao;
        this.tamanhoPolegadas = tamanhoPolegadas;
        this.fabricante = fabricante
    }

    public getDetalhes() : string {
        return `Resolução: ${this.resolucao}, Tamanho em polegadas: ${this.tamanhoPolegadas}`;
    }

}

export class Celular implements Produto {
    constructor(
        public id: ID,
        public modelo: string,
        public memoria: string,
        public fabricante: string,
        public valor: number
    ) {
        this.valor = valor;
        this.id = id;
        this.modelo = modelo;
        this.memoria = memoria;
        this.fabricante = fabricante
    }

    public getDetalhes() : string {
        return `Memória: ${this.memoria}`;
    }
}

export class Bicicleta implements Produto {
    constructor(
        public id: ID,
        public modelo: string,
        public tamanhoAro: number,
        public fabricante: string,
        public valor: number
    ) {
        this.valor = valor;
        this.id = id;
        this.modelo = modelo;
        this.tamanhoAro = tamanhoAro;
        this.fabricante = fabricante
    }

    public getDetalhes() : string {
        return `Tamanho do Aro: ${this.tamanhoAro}`;
    }

}

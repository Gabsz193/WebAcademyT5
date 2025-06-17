import { ID } from "./types";

export class Aluno {
    declare private _id: ID;
    declare private _nome: string;
    declare private _sobrenome: string;
    declare private _dt_nascimento: Date;
    declare private _altura: number;
    declare private _peso: number;

    public constructor(
        nome : string,
        sobrenome: string,
        dt_nascimento: Date,
        altura: number,
        peso: number,
        id? : ID,
    ) {
        this._id = id ? id : crypto.randomUUID();
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dt_nascimento = dt_nascimento;
        this.altura = altura;
        this.peso = peso;
    }

    public get id(): ID {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }

    public get sobrenome(): string {
        return this._sobrenome;
    }

    public get dt_nascimento(): Date {
        return this._dt_nascimento;
    }

    public getIdade(): number {
        return this.calc_idade(this.dt_nascimento);
    }

    public get altura(): number {
        return this._altura;
    }

    public get peso(): number {
        return this._peso;
    }

    public set nome(nome: string) {
        this._nome = nome;
    }

    public set sobrenome(sobrenome: string) {
        this._sobrenome = sobrenome;
    }

    public calc_idade(dt_nascimento: Date) : number {
        const hoje = new Date();
        let idade = hoje.getFullYear() - dt_nascimento.getFullYear();
        const mesAtual = hoje.getMonth();
        const diaAtual = hoje.getDate();
        const mesNascimento = dt_nascimento.getMonth();
        const diaNascimento = dt_nascimento.getDate();

        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
            idade--;
        }
        return idade;
    }

    public set dt_nascimento(dt_nascimento: Date) {
        const idade = this.calc_idade(dt_nascimento);
        if(idade <= 0) throw new Error("Idade deve ser um valor valor positivo");
        if(idade > 120) throw new Error("Idade ser menor de 120 anos");
        this._dt_nascimento = dt_nascimento;
    }

    public set altura(altura: number) {
        if(altura <= 0) throw new Error("Altura deve ser um valor positivo");
        this._altura = altura;
    }

    public set peso(peso: number) {
        if(peso <= 0) throw new Error("Peso deve ser um valor positivo");
        this._peso = peso;
    }

}
import { Aluno } from './aluno.js'

export class Turma {
    declare private _id: string;
    declare private _nome: string;
    declare private _lista_alunos: Aluno[];

    public constructor(
        nome: string,
    ) {
        this._id = crypto.randomUUID();
        this.nome = nome;
        this._lista_alunos = [];
    }

    public set nome(nome: string) {
        this._nome = nome
    }

    public append_aluno(aluno: Aluno) : void {
        this._lista_alunos.push(aluno);
    }

    public remove_aluno(aluno: Aluno) : void {
        this._lista_alunos = this._lista_alunos.filter(aluno_lista => aluno_lista.id !== aluno.id);
    }

    public get id(): string {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }

    public get lista_alunos(): Aluno[] {
        return this._lista_alunos;
    }

    public getNumAlunos(): number {
        return this._lista_alunos.length;
    }

    public getMediaIdades(): number {
        if (this._lista_alunos.length === 0) {
            return 0;
        }
        const totalIdades = this._lista_alunos.reduce((sum, aluno) => sum + aluno.getIdade(), 0);
        return totalIdades / this._lista_alunos.length;
    }

    public getMediaAlturas(): number {
        if (this._lista_alunos.length === 0) {
            return 0;
        }
        const totalAlturas = this._lista_alunos.reduce((sum, aluno) => sum + aluno.altura, 0);
        return totalAlturas / this._lista_alunos.length;
    }

    public getMediaPesos(): number {
        if (this._lista_alunos.length === 0) {
            return 0;
        }
        const totalPesos = this._lista_alunos.reduce((sum, aluno) => sum + aluno.peso, 0);
        return totalPesos / this._lista_alunos.length;
    }

}
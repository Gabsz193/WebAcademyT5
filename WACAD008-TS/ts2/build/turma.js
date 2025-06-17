export class Turma {
    constructor(nome) {
        this._id = crypto.randomUUID();
        this.nome = nome;
        this._lista_alunos = [];
    }
    set nome(nome) {
        this._nome = nome;
    }
    append_aluno(aluno) {
        this._lista_alunos.push(aluno);
    }
    remove_aluno(aluno) {
        this._lista_alunos = this._lista_alunos.filter(aluno_lista => aluno_lista.id !== aluno.id);
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get lista_alunos() {
        return this._lista_alunos;
    }
    getNumAlunos() {
        return this._lista_alunos.length;
    }
    getMediaIdades() {
        if (this._lista_alunos.length === 0) {
            return 0;
        }
        const totalIdades = this._lista_alunos.reduce((sum, aluno) => sum + aluno.getIdade(), 0);
        return totalIdades / this._lista_alunos.length;
    }
    getMediaAlturas() {
        if (this._lista_alunos.length === 0) {
            return 0;
        }
        const totalAlturas = this._lista_alunos.reduce((sum, aluno) => sum + aluno.altura, 0);
        return totalAlturas / this._lista_alunos.length;
    }
    getMediaPesos() {
        if (this._lista_alunos.length === 0) {
            return 0;
        }
        const totalPesos = this._lista_alunos.reduce((sum, aluno) => sum + aluno.peso, 0);
        return totalPesos / this._lista_alunos.length;
    }
}

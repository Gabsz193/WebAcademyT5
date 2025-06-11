export class Aluno {
    constructor(nome, sobrenome, dt_nascimento, altura, peso, id) {
        this._id = id ? id : crypto.randomUUID();
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dt_nascimento = dt_nascimento;
        this.altura = altura;
        this.peso = peso;
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get sobrenome() {
        return this._sobrenome;
    }
    get dt_nascimento() {
        return this._dt_nascimento;
    }
    getIdade() {
        return this.calc_idade(this.dt_nascimento);
    }
    get altura() {
        return this._altura;
    }
    get peso() {
        return this._peso;
    }
    set nome(nome) {
        this._nome = nome;
    }
    set sobrenome(sobrenome) {
        this._sobrenome = sobrenome;
    }
    calc_idade(dt_nascimento) {
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
    set dt_nascimento(dt_nascimento) {
        const idade = this.calc_idade(dt_nascimento);
        if (idade <= 0)
            throw new Error("Idade deve ser um valor valor positivo");
        if (idade > 120)
            throw new Error("Idade ser menor de 120 anos");
        this._dt_nascimento = dt_nascimento;
    }
    set altura(altura) {
        if (altura <= 0)
            throw new Error("Altura deve ser um valor positivo");
        this._altura = altura;
    }
    set peso(peso) {
        if (peso <= 0)
            throw new Error("Peso deve ser um valor positivo");
        this._peso = peso;
    }
}

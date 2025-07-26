const { primeiroNome, verificarDisponibilidadeEstoque, calcularPrecoTotal } = require('./validacoes');

describe('primeiroNome', () => {
    it('deve retornar o primeiro nome quando o nome completo é fornecido', () => {
        const fullName = 'John Doe Etc';
        const result = primeiroNome(fullName);
        expect(result).toBe('John');
    });

    it('deve retornar o mesmo nome quando não há espaço em branco', () => {
        const name = "Alice";
        const result = primeiroNome(name);
        expect(result).toBe(name);
    });

    it('deve retornar o primeiro nome corretamente quando há espaço em branco no início', () => {
        const name = " Alice Test";
        const result = primeiroNome(name);
        expect(result).toBe('Alice');
    });

    it("deve retornar o primeiro nome corretamente quando há espaço branco no final", () => {
        const name = "Alice Test ";
        const result = primeiroNome(name);
        expect(result).toBe('Alice');
    })
});

describe('verificarDisponibilidadeEstoque', () => {
    it('deve retornar true quando o produto está disponível em quantidade suficiente', () => {
        const tipoProduto = 'laptop';
        const quantidade = 5;
        const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
        expect(result).toBe(true);
    });

    it('deve retornar false quando o produto está indisponível no estoque', () => {
        const tipoProduto = 'livro';
        const quantidade = 1;
        const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
        expect(result).toBe(false);
    });

    it('deve retornar false quando a quantidade solicitada é maior que a disponível', () => {
        const tipoProduto = 'headphone';
        const quantidade = 10;
        const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
        expect(result).toBe(false);
    });

    it('deve retornar false quando a quantidade solicitada é zero', () => {
        const tipoProduto = 'smartphone';
        const quantidade = 0;
        const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
        expect(result).toBe(false);
    });

    it('deve retornar false quando o tipo de produto não existe no estoque', () => {
        const tipoProduto = 'mouse';
        const quantidade = 1;
        const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
        expect(result).toBe(false);
    });
});

describe('calcularPrecoTotal', () => {
    it('deve calcular o preço total corretamente para uma lista de produtos válida', () => {
        const produtos = [
            { nome: 'Produto 1', preco: 10, quantidade: 2 },
            { nome: 'Produto 2', preco: 15, quantidade: 3 },
            { nome: 'Produto 3', preco: 20, quantidade: 1 }
        ];
        const result = calcularPrecoTotal(produtos);
        expect(result).toBe(85); // (10*2) + (15*3) + (20*1) = 85
    });

    it('deve retornar 0 quando o array de produtos está vazio', () => {
        const produtos = [];
        const result = calcularPrecoTotal(produtos);
        expect(result).toBe(0);
    });

    it('deve considerar 0 como resultado quando quantidade não é definida', () => {
        const produtos = [
            { nome: 'Produto 1', preco: 10 },
            { nome: 'Produto 2', preco: 15 }
        ];
        const result = calcularPrecoTotal(produtos);
        expect(result).toBe(0); // Sem quantidade, total deve ser 0
    });

    it('deve considerar 0 como resultado quando o preço não é definido', () => {
        const produtos = [
            { nome: 'Produto 1', quantidade: 2 },
            { nome: 'Produto 2', quantidade: 3 }
        ];
        const result = calcularPrecoTotal(produtos);
        expect(result).toBe(0); // Sem preço definido, total deve ser 0
    });

    it('deve calcular corretamente com valores decimais', () => {
        const produtos = [
            { nome: 'Produto 1', preco: 10.5, quantidade: 2 },
            { nome: 'Produto 2', preco: 5.25, quantidade: 3 }
        ];
        const result = calcularPrecoTotal(produtos);
        expect(result).toBe(36.75); // (10.5*2) + (5.25*3) = 36.75
    });

    it('deve tratar valores inválidos como 0', () => {
        const produtos = [
            { nome: 'Produto 1', preco: 10, quantidade: -1 }, // quantidade negativa
            { nome: 'Produto 2', preco: null, quantidade: 2 }, // preço nulo
            { nome: 'Produto 3', preco: 20, quantidade: NaN } // quantidade inválida
        ];
        const result = calcularPrecoTotal(produtos);
        expect(result).toBe(0); // Todos os valores são inválidos
    });
});



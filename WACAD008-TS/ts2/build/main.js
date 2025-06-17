import { Aluno } from "./aluno.js";
import { Turma } from "./turma.js";
import { DOMManager } from "./dom_manager.js";
import { SessionStorage } from "./session.js";
// Instâncias principais
const turma = new Turma("Educação Física");
const domManager = new DOMManager();
const storage = new SessionStorage("alunos"); // Trabalha com objetos plain (serializados)
// Função para carregar alunos do sessionStorage
function carregarAlunosPersistidos() {
    const alunosSerializados = storage.getAll(); // Recebe objetos do sessionStorage
    alunosSerializados.forEach((alunoData) => {
        // Reconstrói um objeto da Classe Aluno a partir dos dados salvos
        const aluno = new Aluno(alunoData.nome, alunoData.sobrenome, new Date(alunoData.dt_nascimento), alunoData.altura, alunoData.peso, alunoData.id);
        turma.append_aluno(aluno); // Adiciona na turma
    });
    document.dispatchEvent(new Event("updateRender")); // Atualiza interface
}
document.addEventListener("addAluno", (e) => {
    const aluno = e.detail;
    turma.append_aluno(aluno);
    // Salva no storage, convertendo o aluno em formato JSON-friendly
    storage.push({
        id: aluno.id,
        nome: aluno.nome,
        sobrenome: aluno.sobrenome,
        dt_nascimento: aluno.dt_nascimento,
        altura: aluno.altura,
        peso: aluno.peso,
    });
    document.dispatchEvent(new Event("updateRender")); // Atualiza a interface
});
document.addEventListener("removeAluno", (e) => {
    const alunoId = e.detail;
    const aluno = turma.lista_alunos.find((aluno) => aluno.id === alunoId);
    if (aluno) {
        turma.remove_aluno(aluno);
        storage.deleteByKey("id", aluno.id); // Remove do storage
        document.dispatchEvent(new Event("updateRender"));
    }
});
document.addEventListener("updateRender", () => {
    domManager.render(turma); // Atualiza tabela e estatísticas
});
// Evento para abrir o modal de edição com os dados do aluno
document.addEventListener("editAluno", (e) => {
    const alunoId = e.detail;
    const aluno = turma.lista_alunos.find((aluno) => aluno.id === alunoId);
    if (aluno) {
        // Preencher os campos do modal com os dados do aluno
        document.getElementById("editAlunoId").value = aluno.id;
        document.getElementById("editNome").value = aluno.nome;
        document.getElementById("editSobrenome").value = aluno.sobrenome;
        document.getElementById("editDtNascimento").value = aluno.dt_nascimento.toISOString().split("T")[0];
        document.getElementById("editAltura").value = aluno.altura.toString();
        document.getElementById("editPeso").value = aluno.peso.toString();
        // Abrir o modal
        const modalElement = document.getElementById("editAlunoModal");
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
});
document.getElementById("editAlunoModal")?.addEventListener("hidden.bs.modal", (event) => {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }
});
// Evento para salvar as alterações realizadas no modal
const editAlunoForm = document.getElementById("editAlunoForm");
editAlunoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const alunoId = document.getElementById("editAlunoId").value;
    const aluno = turma.lista_alunos.find((aluno) => aluno.id === alunoId);
    if (aluno) {
        try {
            // Atualizar os dados do aluno
            aluno.nome = document.getElementById("editNome").value;
            aluno.sobrenome = document.getElementById("editSobrenome").value;
            aluno.dt_nascimento = new Date(document.getElementById("editDtNascimento").value);
            aluno.altura = parseFloat(document.getElementById("editAltura").value);
            aluno.peso = parseFloat(document.getElementById("editPeso").value);
            // Atualizar no sessionStorage
            storage.updateByKey("id", alunoId, {
                id: aluno.id,
                nome: aluno.nome,
                sobrenome: aluno.sobrenome,
                dt_nascimento: aluno.dt_nascimento,
                altura: aluno.altura,
                peso: aluno.peso,
            });
            // Atualizar a tabela
            document.dispatchEvent(new Event("updateRender"));
            // Fechar o modal
            const modalElement = document.getElementById("editAlunoModal");
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
        }
        catch (error) {
            // Exibe o erro em um alerta
            if (error instanceof Error)
                alert(error.message);
        }
    }
});
// Captura de evento de envio do formulário para adicionar um novo aluno
const addAlunoForm = document.getElementById("addAlunoForm");
addAlunoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nomeEl = document.getElementById("addNome");
    const sobrenomeEl = document.getElementById("addSobrenome");
    const dtNascimentoEl = document.getElementById("addDtNascimento");
    const alturaEl = document.getElementById("addAltura");
    const pesoEl = document.getElementById("addPeso");
    try {
        // Criar um novo aluno a partir dos dados fornecidos
        const novoAluno = new Aluno(nomeEl.value, sobrenomeEl.value, new Date(dtNascimentoEl.value), parseFloat(alturaEl.value), parseFloat(pesoEl.value));
        // Emitir evento para adicionar o aluno
        document.dispatchEvent(new CustomEvent("addAluno", { detail: novoAluno }));
        // Reseta o formulário e fecha o modal
        addAlunoForm.reset();
        const modalElement = document.getElementById("addAlunoModal");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance?.hide();
    }
    catch (error) {
        // Exibe o erro em um alerta
        if (error instanceof Error)
            alert(error.message);
    }
});
const popularTurmaBtn = document.getElementById("popularTurmaBtn");
if (popularTurmaBtn) {
    popularTurmaBtn.addEventListener("click", () => {
        (async (qtd_results) => {
            try {
                const response = await fetch(`https://randomuser.me/api/?results=${qtd_results}`);
                const data = await response.json();
                const list_mockup = data.results;
                list_mockup.forEach(mockup => {
                    const aluno = new Aluno(mockup.name.first, mockup.name.last, new Date(mockup.dob.date), Number((Math.random() * (2 - 1.5) + 1.5).toFixed(2)), // Random height between 1.5 and 2.0 
                    Number((Math.random() * (100 - 45) + 45).toFixed(2)));
                    turma.append_aluno(aluno);
                });
                document.dispatchEvent(new Event("updateRender"));
            }
            catch (e) {
                console.error(e);
            }
        })(30);
    });
}
// Carregamento dos dados ao iniciar aplicação
carregarAlunosPersistidos();

import { Aluno } from "./aluno.js";
import { Turma } from "./turma.js";
import { DOMManager } from "./dom_manager.js";
import { SessionStorage } from "./session.js";
import {MockupData} from "./types";


declare var bootstrap : any;

// Instâncias principais
const turma = new Turma("Educação Física");
const domManager = new DOMManager();
const storage = new SessionStorage<Partial<Aluno>>("alunos"); // Trabalha com objetos plain (serializados)

// Função para carregar alunos do sessionStorage
function carregarAlunosPersistidos(): void {
    const alunosSerializados = storage.getAll(); // Recebe objetos do sessionStorage

    alunosSerializados.forEach((alunoData) => {
        // Reconstrói um objeto da Classe Aluno a partir dos dados salvos
        const aluno = new Aluno(
            alunoData.nome!,
            alunoData.sobrenome!,
            new Date(alunoData.dt_nascimento as Date),
            alunoData.altura!,
            alunoData.peso!,
            alunoData.id
        );
        turma.append_aluno(aluno); // Adiciona na turma
    });

    document.dispatchEvent(new Event("updateRender")); // Atualiza interface
}

document.addEventListener("addAluno", (e: any) => {
    const aluno: Aluno = e.detail;
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

document.addEventListener("removeAluno", (e: any) => {
    const alunoId: string = e.detail;
    const aluno = turma.lista_alunos.find((aluno) => aluno.id === alunoId)!;

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
document.addEventListener("editAluno", (e: any) => {
    const alunoId = e.detail;
    const aluno = turma.lista_alunos.find((aluno) => aluno.id === alunoId);

    if (aluno) {
        // Preencher os campos do modal com os dados do aluno
        (document.getElementById("editAlunoId") as HTMLInputElement).value = aluno.id;
        (document.getElementById("editNome") as HTMLInputElement).value = aluno.nome;
        (document.getElementById("editSobrenome") as HTMLInputElement).value = aluno.sobrenome;
        (document.getElementById("editDtNascimento") as HTMLInputElement).value = aluno.dt_nascimento.toISOString().split("T")[0];
        (document.getElementById("editAltura") as HTMLInputElement).value = aluno.altura.toString();
        (document.getElementById("editPeso") as HTMLInputElement).value = aluno.peso.toString();

        // Abrir o modal
        const modalElement = document.getElementById("editAlunoModal") as HTMLElement;
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
});

document.getElementById("editAlunoModal")?.addEventListener("hidden.bs.modal", (event: any) => {
    const backdrop = document.querySelector('.modal-backdrop') as HTMLElement;
    if (backdrop) {
        backdrop.remove();
    }
});


// Evento para salvar as alterações realizadas no modal
const editAlunoForm = document.getElementById("editAlunoForm") as HTMLFormElement;

editAlunoForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const alunoId = (document.getElementById("editAlunoId") as HTMLInputElement).value;
    const aluno = turma.lista_alunos.find((aluno) => aluno.id === alunoId);

    if (aluno) {
        try {
            // Atualizar os dados do aluno
            aluno.nome = (document.getElementById("editNome") as HTMLInputElement).value;
            aluno.sobrenome = (document.getElementById("editSobrenome") as HTMLInputElement).value;
            aluno.dt_nascimento = new Date((document.getElementById("editDtNascimento") as HTMLInputElement).value);
            aluno.altura = parseFloat((document.getElementById("editAltura") as HTMLInputElement).value);
            aluno.peso = parseFloat((document.getElementById("editPeso") as HTMLInputElement).value);

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
            const modalElement = document.getElementById("editAlunoModal") as HTMLElement;
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
        } catch (error) {
            // Exibe o erro em um alerta
            if (error instanceof Error) alert(error.message);
        }

    }
});

// Captura de evento de envio do formulário para adicionar um novo aluno
const addAlunoForm = document.getElementById("addAlunoForm") as HTMLFormElement;

addAlunoForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const nomeEl = document.getElementById("addNome") as HTMLInputElement;
    const sobrenomeEl = document.getElementById("addSobrenome") as HTMLInputElement;
    const dtNascimentoEl = document.getElementById("addDtNascimento") as HTMLInputElement;
    const alturaEl = document.getElementById("addAltura") as HTMLInputElement;
    const pesoEl = document.getElementById("addPeso") as HTMLInputElement;

    try {
        // Criar um novo aluno a partir dos dados fornecidos
        const novoAluno = new Aluno(
            nomeEl.value,
            sobrenomeEl.value,
            new Date(dtNascimentoEl.value),
            parseFloat(alturaEl.value),
            parseFloat(pesoEl.value)
        );

        // Emitir evento para adicionar o aluno
        document.dispatchEvent(new CustomEvent("addAluno", { detail: novoAluno }));

        // Reseta o formulário e fecha o modal
        addAlunoForm.reset();
        const modalElement = document.getElementById("addAlunoModal") as HTMLElement;
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance?.hide();

    } catch (error) {
        // Exibe o erro em um alerta
        if (error instanceof Error) alert(error.message);
    }

});

const popularTurmaBtn = document.getElementById("popularTurmaBtn");

if (popularTurmaBtn) {
    popularTurmaBtn.addEventListener("click", () => {
        (async (qtd_results: number) => {
            try {
                const response = await fetch(`https://randomuser.me/api/?results=${qtd_results}`);
                const data : { results: MockupData[] } = await response.json();
                const list_mockup = data.results;

                list_mockup.forEach(mockup => {
                    const aluno = new Aluno(
                        mockup.name.first,
                        mockup.name.last,
                        new Date(mockup.dob.date),
                        Number((Math.random() * (2 - 1.5) + 1.5).toFixed(2)), // Random height between 1.5 and 2.0 
                        Number((Math.random() * (100 - 45) + 45).toFixed(2)), // Random weight between 45 and 100
                    );
                    turma.append_aluno(aluno);
                });

                document.dispatchEvent(new Event("updateRender"));


            } catch (e) {
                console.error(e);
            }
        })(30);
    });
}


// Carregamento dos dados ao iniciar aplicação
carregarAlunosPersistidos();
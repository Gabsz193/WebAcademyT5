import { Turma } from "./turma.js";
import { Aluno } from "./aluno";

export class DOMManager {
    private tabelaAlunosEl: HTMLElement;
    private semAlunosEl: HTMLElement;

    private totalAlunosEl: HTMLElement;
    private mediaIdadesEl: HTMLElement;
    private mediaAlturasEl: HTMLElement;
    private mediaPesosEl: HTMLElement;

    constructor() {
        this.tabelaAlunosEl = document.getElementById("tabelaAlunos")!;
        this.semAlunosEl = document.getElementById("semAlunos")!;

        this.totalAlunosEl = document.getElementById("totalAlunosEstatisticas")!;
        this.mediaIdadesEl = document.getElementById("mediaIdadesEstatisticas")!;
        this.mediaAlturasEl = document.getElementById("mediaAlturasEstatisticas")!;
        this.mediaPesosEl = document.getElementById("mediaPesosEstatisticas")!;
    }

    public updateAlunoList(turma: Turma): void {
        const alunos = turma.lista_alunos;
        this.tabelaAlunosEl.innerHTML = alunos.length ? "" : this.semAlunosEl.outerHTML;

        alunos.forEach((aluno) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${aluno.nome} ${aluno.sobrenome}</td>
                <td>${aluno.getIdade()}</td>
                <td>${aluno.altura}</td>
                <td>${aluno.peso}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-id="${aluno.id}" data-bs-toggle="modal" data-bs-target="#editAlunoModal">Editar</button>
                    <button class="btn btn-danger btn-sm" data-id="${aluno.id}">Remover</button>
                </td>
            `;

            // Evento para abrir modal de edição
            tr.querySelector(".btn-warning")?.addEventListener("click", () => {
                document.dispatchEvent(new CustomEvent("editAluno", { detail: aluno.id }));
            });

            // Evento para remover aluno
            tr.querySelector(".btn-danger")?.addEventListener("click", () => {
                document.dispatchEvent(new CustomEvent("removeAluno", { detail: aluno.id }));
            });

            this.tabelaAlunosEl.appendChild(tr);
        });
    }

    public updateStatistics(turma: Turma): void {
        this.totalAlunosEl.textContent = `Total: ${turma.getNumAlunos()}`;
        this.mediaIdadesEl.textContent = `Média: ${turma.getMediaIdades().toFixed(2)}`;
        this.mediaAlturasEl.textContent = `Média: ${turma.getMediaAlturas().toFixed(2)}`;
        this.mediaPesosEl.textContent = `Média: ${turma.getMediaPesos().toFixed(2)}`;
    }

    public render(turma: Turma): void {
        this.updateAlunoList(turma);
        this.updateStatistics(turma);
    }
}
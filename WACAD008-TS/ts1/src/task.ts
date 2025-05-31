import { SessionStorage } from "./session.js";
import { ID, Task } from "./types.js";
import { dateToString, formatDate, isTask } from "./utils.js";

const taskManager : SessionStorage<Task> = new SessionStorage('tasks');

export function createTask(task: Task) : void | never {
    if(isTask(task)) {
        taskManager.push(task);
    } else {
        throw new Error("Task inválida");
    }
}

export function getTaskById(id: ID) : Task | undefined {
    return taskManager.getByKey("id", id) as Task;
}

export function getAllTasks() : Task[] {
    return taskManager.getAll();
}

export function updateTaskById(id: ID, new_task: Task) : void | never {
    if(isTask(new_task)) {
        taskManager.updateByKey("id", id, new_task);
    } else {
        throw new Error("Task inválida");
    }
}


export function deleteTaskById(id: ID) : void {
    taskManager.deleteByKey("id", id);
}

function createTaskHTML(task: Task) : HTMLElement | never {

    function createTaskHeader(task: Task) {
        return `
            <div>
                <h5 class="card-title">${task.titulo}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Criado em: ${dateToString(task.date_created)}${task.date_deadline ? ` | Deadline: ${dateToString(task.date_deadline)}` : ""}</h6>
                ${task.descricao ? `<p class="card-text">${task.descricao}</p>` : ""}
            </div>
        `
    }

    function createTaskActions(task: Task) {
        const htmlActions = document.createElement("div");
        htmlActions.innerHTML = `
            <div class="task-actions">
                <div class="btn-group dropdown">
                    <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Mudar Status">
                        <i class="bi bi-check2-square"></i> <span class="sr-only">Mudar Status</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" data-task-id="${task.id}" data-status="todo" href="#">Todo</a>
                        <a class="dropdown-item" data-task-id="${task.id}" data-status="doing" href="#">Doing</a>
                        <a class="dropdown-item" data-task-id="${task.id}" data-status="done" href="#">Done</a>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-primary edit_button" data-task-id="${task.id}" title="Editar Task"><i data-task-id="${task.id}" class="bi bi-pencil-fill"></i> <span class="sr-only">Editar</span></button>
                <button class="btn btn-sm btn-outline-danger delete_button" data-task-id="${task.id}" title="Deletar Task"><i data-task-id="${task.id}" class="bi bi-trash-fill"></i> <span class="sr-only">Deletar</span></button>
            </div>
        `

        return htmlActions.innerHTML
    }


    if(isTask(task)) {
        const taskHTML = `
<div class="card task-card" data-task-id="${task.id}">
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
            ${createTaskHeader(task)}
            <div class="d-flex flex-column align-items-end">
                <span class="badge badge-warning status-badge mb-2">${task.status}</span>
                ${createTaskActions(task)}
            </div>
        </div>
    </div>
</div>
        `
    const parser = new DOMParser();

    return parser.parseFromString(taskHTML, 'text/html').body.firstChild as HTMLElement;
    } else {
        throw new Error("Task inválida");
    }
}



export function createTasksHTML(tasks: Task[]) : HTMLElement[] {
    const htmlElements = tasks.map(createTaskHTML);

    return htmlElements;
}
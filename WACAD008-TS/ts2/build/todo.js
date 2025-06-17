import { createTask, createTasksHTML, deleteTaskById, getAllTasks, getTaskById, updateTaskById } from "./task";
import { dateToString, formatDate, isTask } from "./utils";
const addTaskForm = document.getElementById("addTaskForm");
const updateTaskForm = document.getElementById("updateTaskForm");
const taskList = document.getElementById("taskList");
const no_tasks = document.getElementById("no-tasks");
function updateContent() {
    document.dispatchEvent(new CustomEvent("updateContent"));
}
function getTaskFromForm(formData) {
    const titulo = formData.get("titulo");
    const descricao = formData.get("descricao") ?
        formData.get("descricao")
        : undefined;
    const date_created = new Date();
    const date_deadline = formData.get("date_deadline") ?
        formatDate(formData.get("date_deadline"))
        : undefined;
    const task = {
        titulo,
        descricao,
        status: "Todo",
        date_created,
        date_deadline,
        id: crypto.randomUUID()
    };
    if (isTask(task)) {
        return task;
    }
    else {
        throw new Error("Task inválida");
    }
}
addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addTaskForm);
    const addTaskModal = new bootstrap.Modal('#addTaskModal');
    try {
        const task = getTaskFromForm(formData);
        createTask(task);
        addTaskModal.hide();
        updateContent();
    }
    catch (e) {
        alert("Insira uma task válida");
        addTaskModal.hide();
    }
});
updateTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(updateTaskForm);
    const updateTaskModal = new bootstrap.Modal('#updateTaskModal');
    try {
        let task = getTaskFromForm(formData);
        const task_id = document.getElementById("update_task_id").value;
        task.id = task_id;
        task.status = formData.get("status");
        updateTaskById(task.id, task);
        updateTaskModal.hide();
        updateContent();
    }
    catch (e) {
        alert("Insira uma task válida");
        updateTaskModal.hide();
    }
});
document.addEventListener("updateContent", (e) => {
    e.preventDefault();
    taskList.innerHTML = "";
    const tasks = getAllTasks();
    if (tasks.length > 0) {
        no_tasks.style.display = "none";
        taskList.style.display = "block";
        const htmlTasks = createTasksHTML(tasks);
        htmlTasks.forEach(html => {
            taskList.appendChild(html);
            html.querySelector(".delete_button")?.addEventListener("click", (e) => {
                const target = e.target;
                const task_id = target.getAttribute("data-task-id");
                const current_task = getTaskById(task_id);
                if (confirm("Tem certeza que quer excluir " + current_task?.titulo + "?")) {
                    deleteTaskById(task_id);
                    updateContent();
                }
            });
            html.querySelector(".edit_button")?.addEventListener("click", (e) => {
                const target = e.target;
                const updateTaskModal = new bootstrap.Modal('#updateTaskModal');
                const task_id = target.getAttribute("data-task-id");
                const current_task = getTaskById(task_id);
                const titulo = document.getElementById("update_titulo");
                const descricao = document.getElementById("update_descricao");
                const date_deadline = document.getElementById("update_date_deadline");
                const status = document.getElementById("update_status");
                const task_id_input = document.getElementById("update_task_id");
                titulo.value = current_task?.titulo;
                descricao.value = current_task?.descricao ? current_task?.descricao : "";
                date_deadline.value = current_task?.date_deadline ? dateToString(current_task.date_deadline) : "";
                status.value = current_task?.status;
                task_id_input.value = current_task?.id;
                updateTaskModal.show();
            });
            html.querySelectorAll(".dropdown-item").forEach(item => {
                item.addEventListener("click", (e) => {
                    const status = item.getAttribute("data-status");
                    const task_id = item.getAttribute("data-task-id");
                    let current_task = getTaskById(task_id);
                    const todos = {
                        todo: "Todo",
                        doing: "Doing",
                        done: "Done"
                    };
                    if (current_task) {
                        updateTaskById(task_id, { ...current_task, status: todos[status] });
                    }
                    updateContent();
                });
            });
        });
    }
    else {
        taskList.style.display = "none";
        no_tasks.style.display = "block";
    }
});
document.addEventListener("DOMContentLoaded", updateContent);

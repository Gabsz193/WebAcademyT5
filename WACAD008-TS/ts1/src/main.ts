const create_task_form =
  document.querySelector<HTMLFormElement>("#submit-task-form");
const todo_list = document.querySelector<HTMLUListElement>("#task-list");
const form_input_titulo =
  document.querySelector<HTMLInputElement>("#titulo-input");
const form_input_descricao =
  document.querySelector<HTMLTextAreaElement>("#descricao-input");
const form_input_date_deadline = document.querySelector<HTMLInputElement>(
  "#deadline-date-input"
);
const form_input_time_deadline = document.querySelector<HTMLInputElement>(
  "#deadline-time-input"
);

const list_tasks: Task[] = [];

function createTask(
  values: [string, string | undefined, string | undefined, string | undefined]
): Task | never {
  const titulo = values[0];
  const descricao = values[1];
  const dt_deadline = values[2];
  const time_deadline = values[3];

  let new_task: Task = {
    titulo,
    descricao,
    status: "Todo",
    usuario_created_id: 1,
    date_created: new Date(),
  };

  if (dt_deadline && time_deadline) {
    console.log(dt_deadline, time_deadline);
    const deadline = new Date(`${dt_deadline}T${time_deadline}`);
    new_task.date_deadline = deadline;
  }

  return new_task;
}

function createTaskItem(task: Task): Element {
  const list_item = document.createElement("li");
  list_item.classList.add("list-group-item");

  const top_section = document.createElement("div");
  top_section.classList.add(
    "d-flex",
    "gap-1",
    "align-items-center",
    "justify-content-between"
  );

  const title = document.createElement("div");
  title.classList.add("fw-bold");
  title.textContent = task.titulo;

  const status_badge = document.createElement("span");
  status_badge.classList.add(
    "badge",
    "text-bg-primary",
    "rounded-pill",
    "align-self-start"
  );
  status_badge.textContent = task.status;

  top_section.appendChild(title);
  top_section.appendChild(status_badge);

  const description = document.createElement("p");

  if (task.descricao) {
    description.textContent = task.descricao;
  }

  const bottom_section = document.createElement("div");
  bottom_section.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-end"
  );

  const dates_container = document.createElement("div");
  dates_container.classList.add("d-block");

  const creation_date = document.createElement("p");
  creation_date.classList.add("m-0");
  creation_date.textContent = `Data de criação: ${task.date_created.toLocaleDateString()}`;

  dates_container.appendChild(creation_date);

  if (task.date_deadline) {
    const deadline_date = document.createElement("p");
    deadline_date.classList.add("m-0");
    deadline_date.textContent = `Data de conclusão: ${task.date_deadline.toLocaleString()}`;
    dates_container.appendChild(deadline_date);
  }

  const actions_container = document.createElement("div");

  const edit_button = document.createElement("button");
  edit_button.type = "button";
  edit_button.classList.add("btn", "btn-link");
  edit_button.textContent = "Editar";
  edit_button.setAttribute("data-bs-toggle", "modal");
  edit_button.setAttribute("data-bs-target", "#submit-task");
  edit_button.addEventListener("click", (e) => handle_edit_task(e, task));

  const delete_button = document.createElement("button");
  delete_button.type = "button";
  delete_button.classList.add("btn", "btn-link");
  delete_button.textContent = "Excluir";

  actions_container.appendChild(edit_button);
  actions_container.appendChild(delete_button);

  bottom_section.appendChild(dates_container);
  bottom_section.appendChild(actions_container);

  list_item.appendChild(top_section);
  list_item.appendChild(description);
  list_item.appendChild(bottom_section);

  return list_item;
}

function reset_form_values() {
  form_input_titulo?.value ? (form_input_titulo.value = "") : undefined;
  form_input_descricao?.value ? (form_input_descricao.value = "") : undefined;
  form_input_date_deadline?.value
    ? (form_input_date_deadline.value = "")
    : undefined;
  form_input_time_deadline?.value
    ? (form_input_time_deadline.value = "")
    : undefined;
}

declare const bootstrap: any;

create_task_form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const new_task_titulo = form_input_titulo?.value;
  const new_task_descricao = form_input_descricao?.value;
  const new_task_date_deadline = form_input_date_deadline?.value;
  const new_task_time_deadline = form_input_time_deadline?.value;

  if (new_task_titulo) {
    const newTask = createTask([
      new_task_titulo,
      new_task_descricao,
      new_task_date_deadline,
      new_task_time_deadline,
    ]);

    list_tasks.push(newTask);

    todo_list?.appendChild(createTaskItem(newTask));
  } else {
    throw new Error("Os campos título e descrição não foram preenchidos");
  }

  reset_form_values();

  const modalElement = document.querySelector<HTMLDivElement>("#submit-task");

  if (modalElement) {
    const modalInstance =
      bootstrap.Modal.getInstance(modalElement) ||
      new bootstrap.Modal(modalElement);
    modalInstance.hide();
  }
});

function handle_edit_task(e: Event, task: Task) {
    console.log("Aqui")
  form_input_titulo?.value
    ? (form_input_titulo.value = task.titulo)
    : undefined;
  form_input_descricao?.value && task.descricao
    ? (form_input_descricao.value = task.descricao)
    : undefined;
  if (task.date_deadline) {
    form_input_date_deadline?.value
      ? (form_input_date_deadline.value = task.date_deadline.toDateString())
      : undefined;
    form_input_time_deadline?.value
      ? (form_input_time_deadline.value = task.date_deadline.toDateString())
      : undefined;
  }
}

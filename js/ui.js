import {
    getTasks,
    getTaskStatistics
} from "./tasks.js";

import { isOverdue } from "./utils.js";

const tasksContainer = document.querySelector("#tasks-container");
const emptyState = document.querySelector("#empty-state");

// Seletores baseados nas tags reais do index.html
const emptyStateTitle = emptyState ? emptyState.querySelector("h3") : null;
const emptyStateMessage = emptyState ? emptyState.querySelector("p") : null;

export function renderTasks(tasksToRender = getTasks()) {
    if (!tasksContainer) return;
    
    tasksContainer.replaceChildren();

    const allTasks = getTasks();

    if (tasksToRender.length === 0) {
        if (emptyState) {
            emptyState.hidden = false;
            
            if (allTasks.length === 0) {
                if (emptyStateTitle) emptyStateTitle.textContent = "Nenhuma tarefa encontrada";
                if (emptyStateMessage) emptyStateMessage.textContent = "Você ainda não possui tarefas cadastradas.";
            } else {
                if (emptyStateTitle) emptyStateTitle.textContent = "Nenhum resultado";
                if (emptyStateMessage) emptyStateMessage.textContent = "Nenhuma tarefa corresponde aos filtros selecionados.";
            }
        }
        renderDashboard();
        return;
    }

    if (emptyState) emptyState.hidden = true;

    tasksToRender.forEach(task => {
        const element = createTaskElement(task);
        tasksContainer.appendChild(element);
    });

    renderDashboard();
}

function createTaskElement(task) {
    const article = document.createElement("article");
    article.classList.add("task-card");

    if (task.status === "CONCLUIDA") {
        article.classList.add("task-completed");
    }

    if (isOverdue(task)) {
        article.classList.add("task-overdue");
    }

    // Header
    const header = document.createElement("div");
    header.classList.add("task-card-header");

    const title = document.createElement("h3");
    title.textContent = task.title;

    const priority = document.createElement("span");
    priority.classList.add("priority", `priority-${task.priority.toLowerCase()}`);
    priority.textContent = formatPriority(task.priority);

    header.append(title, priority);

    // Descrição
    const description = document.createElement("p");
    description.classList.add("task-description");
    description.textContent = task.description || "Sem descrição";

    // Informações
    const metadata = document.createElement("div");
    metadata.classList.add("task-metadata");

    const status = document.createElement("span");
    status.textContent = `Status: ${formatStatus(task.status)}`;

    const dueDate = document.createElement("span");
    dueDate.textContent = task.dueDate
        ? `Vencimento: ${formatDate(task.dueDate)}`
        : "Sem vencimento";

    metadata.append(status, dueDate);

    // Ações
    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    const statusButton = document.createElement("button");
    statusButton.type = "button";
    statusButton.classList.add("btn", "btn-secondary");
    statusButton.dataset.action = task.status === "CONCLUIDA" ? "reopen" : "complete";
    statusButton.dataset.id = task.id;
    statusButton.textContent = task.status === "CONCLUIDA" ? "Reabrir" : "Concluir";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = task.id;
    deleteButton.textContent = "Excluir";

    actions.append(statusButton, deleteButton);

    article.append(header, description, metadata, actions);

    return article;
}

function formatPriority(priority) {
    const labels = {
        BAIXA: "Baixa",
        MEDIA: "Média",
        ALTA: "Alta",
        URGENTE: "Urgente"
    };
    return labels[priority] || priority;
}

function formatStatus(status) {
    const labels = {
        PENDENTE: "Pendente",
        EM_ANDAMENTO: "Em andamento",
        CONCLUIDA: "Concluída",
        ATRASADA: "Atrasada"
    };
    return labels[status] || status;
}

function formatDate(date) {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

export function renderDashboard() {
    const statistics = getTaskStatistics();
    const allTasks = getTasks();

    const overdueCount = allTasks.filter(task => isOverdue(task)).length;

    const elTotal = document.querySelector("#total-tasks");
    const elPending = document.querySelector("#pending-tasks");
    const elProgress = document.querySelector("#progress-tasks");
    const elCompleted = document.querySelector("#completed-tasks");
    const elOverdue = document.querySelector("#overdue-tasks");

    if (elTotal) elTotal.textContent = statistics.total;
    if (elPending) elPending.textContent = statistics.pending;
    if (elProgress) elProgress.textContent = statistics.inProgress;
    if (elCompleted) elCompleted.textContent = statistics.completed;
    if (elOverdue) elOverdue.textContent = overdueCount;
}

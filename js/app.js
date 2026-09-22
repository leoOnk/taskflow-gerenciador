// 1. Imports centralizados no topo
import {
    createTask,
    completeTask,
    reopenTask,
    deleteTask
} from "./tasks.js";

import {
    renderTasks
} from "./ui.js";

// 2. Seleção dos elementos do DOM
const taskForm = document.querySelector("#task-form");
const tasksContainer = document.querySelector("#tasks-container");
const searchInput = document.querySelector("#search-task");
const statusFilter = document.querySelector("#filter-status");
const priorityFilter = document.querySelector("#filter-priority");
const sortSelect = document.querySelector("#sort-tasks");
const clearFiltersButton = document.querySelector("#clear-filters");

// 3. Ouvintes de Eventos (Event Listeners)
if (searchInput) searchInput.addEventListener("input", applyFilters);
if (statusFilter) statusFilter.addEventListener("change", applyFilters);
if (priorityFilter) priorityFilter.addEventListener("change", applyFilters);
if (sortSelect) sortSelect.addEventListener("change", applyFilters);
if (clearFiltersButton) clearFiltersButton.addEventListener("click", clearFilters);
if (tasksContainer) tasksContainer.addEventListener("click", handleTaskAction);

// Escutador do formulário envelopado para bloquear o recarregamento imediatamente
if (taskForm) {
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Trava o recarregamento nativo do HTML
        handleTaskSubmit(event);
    });
}

// 4. Função de Manipulação do Formulário (Apenas UMA declaração)
function handleTaskSubmit(event) {
    if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
    }

    const formData = new FormData(taskForm);

    const taskData = {
        title: formData.get("title") ? formData.get("title").toString() : "",
        description: formData.get("description") ? formData.get("description").toString() : "",
        priority: formData.get("priority") ? formData.get("priority").toString() : "MEDIA",
        dueDate: formData.get("dueDate") ? formData.get("dueDate").toString() : ""
    };

    const result = createTask(taskData);

    clearValidationErrors();

    if (!result.success) {
        showValidationErrors(result.errors);
        return;
    }

    taskForm.reset();
    renderTasks();
}

function handleTaskAction(event) {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const action = button.dataset.action;
    const id = button.dataset.id;

    switch (action) {
        case "complete":
            completeTask(id);
            renderTasks();
            break;
        case "reopen":
            reopenTask(id);
            renderTasks();
            break;
        case "delete":
            handleDelete(id);
            break;
    }
}

function handleDelete(id) {
    const confirmed = window.confirm("Tem certeza que deseja excluir esta tarefa?");

    if (!confirmed) return;

    const result = deleteTask(id);

    if (result.success) {
        renderTasks();
    }
}

function applyFilters() {
    renderTasks(); 
}

function clearFilters() {
    if (searchInput) searchInput.value = "";
    if (statusFilter) statusFilter.value = "TODAS";
    if (priorityFilter) priorityFilter.value = "TODAS";
    if (sortSelect) sortSelect.value = "RECENTES";
    applyFilters();
}

function showValidationErrors(errors) {
    const titleError = document.querySelector("#title-error");
    if (titleError) {
        titleError.textContent = errors.title || "";
    }
}

function clearValidationErrors() {
    const titleError = document.querySelector("#title-error");
    if (titleError) {
        titleError.textContent = "";
    }
}

// 5. Inicialização do sistema
renderTasks();

import {
    saveTasks,
    loadTasks
} from "./storage.js";

import {
    generateId,
    getCurrentDateTime
} from "./utils.js";

import {
    validateTask
} from "./validation.js";

let tasks = loadTasks();

export function getTasks() {
    return [...tasks];
}

export function createTask(data) {
    const task = {
        id: generateId(),
        title: data.title.trim(),
        description: data.description.trim(),
        priority: data.priority,
        status: "PENDENTE",
        dueDate: data.dueDate || null,
        createdAt: getCurrentDateTime(),
        updatedAt: getCurrentDateTime(),
        completedAt: null
    };

    const validation = validateTask(task);

    if (!validation.valid) {
        return {
            success: false,
            errors: validation.errors
        };
    }

    tasks.push(task);
    saveTasks(tasks);

    return {
        success: true,
        task
    };
}

export function updateTask(id, data) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return {
            success: false,
            errors: { general: "Tarefa não encontrada." }
        };
    }

    const currentTask = tasks[taskIndex];
    const updatedTask = {
        ...currentTask,
        title: data.title.trim(),
        description: data.description.trim(),
        priority: data.priority,
        dueDate: data.dueDate || null,
        updatedAt: getCurrentDateTime()
    };

    const validation = validateTask(updatedTask);

    if (!validation.valid) {
        return {
            success: false,
            errors: validation.errors
        };
    }

    tasks[taskIndex] = updatedTask;
    saveTasks(tasks);

    return {
        success: true,
        task: updatedTask
    };
}

export function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = "CONCLUIDA";
        task.completedAt = getCurrentDateTime();
        task.updatedAt = getCurrentDateTime();
        saveTasks(tasks);
        return { success: true };
    }
    return { success: false };
}

export function reopenTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = "PENDENTE";
        task.completedAt = null;
        task.updatedAt = getCurrentDateTime();
        saveTasks(tasks);
        return { success: true };
    }
    return { success: false };
}

export function deleteTask(id) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        saveTasks(tasks);
        return { success: true };
    }
    return { success: false };
}

export function getTaskStatistics() {
    const total = tasks.length;
    const pending = tasks.filter(task => task.status === "PENDENTE").length;
    const inProgress = tasks.filter(task => task.status === "EM_ANDAMENTO").length;
    const completed = tasks.filter(task => task.status === "CONCLUIDA").length;

    return {
        total,
        pending,
        inProgress,
        completed
    };
}

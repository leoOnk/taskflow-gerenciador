export function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

export function getCurrentDateTime() {
    return new Date().toISOString();
}

export function normalizeText(text) {
    return text.trim().toLowerCase();
}

export function isOverdue(task) {
    if (!task.dueDate || task.status === "CONCLUIDA") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(`${task.dueDate}T00:00:00`);
    return dueDate < today;
}

import { isOverdue } from "./utils.js";

const PRIORITY_ORDER = {
    URGENTE: 4,
    ALTA: 3,
    MEDIA: 2,
    BAIXA: 1
};

export function filterTasks(tasks, filters) {
    const {
        search = "",
        status = "TODOS",
        priority = "TODAS",
        sortBy = "RECENTES"
    } = filters;

    const normalizedSearch = search.trim().toLowerCase();

    let result = [...tasks];

    // Busca
    if (normalizedSearch) {
        result = result.filter(task => {
            const title = task.title.toLowerCase();
            const description = task.description.toLowerCase();

            return (
                title.includes(normalizedSearch) ||
                description.includes(normalizedSearch)
            );
        });
    }

    // Filtro por status
    if (status !== "TODOS") {
        result = result.filter(task => task.status === status);
    }

    // Filtro por prioridade
    if (priority !== "TODAS") {
        result = result.filter(task => task.priority === priority);
    }

    // Ordenação
    result.sort((a, b) => {
        switch (sortBy) {

            case "ANTIGAS":
                return new Date(a.createdAt) - new Date(b.createdAt);

            case "VENCIMENTO":
                return compareDueDates(a, b);

            case "PRIORIDADE":
                return (
                    PRIORITY_ORDER[b.priority] -
                    PRIORITY_ORDER[a.priority]
                );

            case "TITULO":
                return a.title.localeCompare(
                    b.title,
                    "pt-BR",
                    { sensitivity: "base" }
                );

            case "RECENTES":
            default:
                return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    return result;
}

function compareDueDates(taskA, taskB) {
    if (!taskA.dueDate && !taskB.dueDate) {
        return 0;
    }

    if (!taskA.dueDate) {
        return 1;
    }

    if (!taskB.dueDate) {
        return -1;
    }

    return (
        new Date(`${taskA.dueDate}T00:00:00`) -
        new Date(`${taskB.dueDate}T00:00:00`)
    );
}
const STORAGE_KEY = "taskflow_tasks";


export function saveTasks(tasks) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );
}


export function loadTasks() {

    const data =
        localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    try {

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Erro ao carregar tarefas:",
            error
        );

        return [];
    }
}


export function clearTasks() {

    localStorage.removeItem(
        STORAGE_KEY
    );
}
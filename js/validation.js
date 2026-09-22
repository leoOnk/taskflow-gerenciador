export function validateTask(task) {

    const errors = {};


    if (!task.title) {

        errors.title =
            "O título é obrigatório.";

    } else if (task.title.length < 3) {

        errors.title =
            "O título deve possuir pelo menos 3 caracteres.";

    } else if (task.title.length > 100) {

        errors.title =
            "O título deve possuir no máximo 100 caracteres.";
    }


    if (
        task.description &&
        task.description.length > 500
    ) {

        errors.description =
            "A descrição deve possuir no máximo 500 caracteres.";
    }


    const validPriorities = [
        "BAIXA",
        "MEDIA",
        "ALTA",
        "URGENTE"
    ];


    if (
        !validPriorities.includes(
            task.priority
        )
    ) {

        errors.priority =
            "Prioridade inválida.";
    }


    return {
        valid:
            Object.keys(errors).length === 0,

        errors
    };
}
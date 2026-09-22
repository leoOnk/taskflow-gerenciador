import { validateTask } from "./validation.js";

describe("🎯 Testes Unitários - Regras de Validação (validation.js)", () => {
    
    // —— CAMINHO FELIZ ——
    test("Deve validar com sucesso uma tarefa com todos os dados corretos", () => {
        const tarefaValida = {
            title: "Desenvolver Testes Unitários",
            description: "Escrever cenários de teste para o validador utilizando o Jest.",
            priority: "ALTA"
        };

        const resultado = validateTask(tarefaValida);

        expect(resultado.valid).toBe(true);
        expect(resultado.errors).toEqual({});
    });

    // —— CAMINHOS DE EXCEÇÃO (VALIDAÇÕES DO TÍTULO) ——
    test("Deve retornar erro se o título não for preenchido (vazio)", () => {
        const tarefaSemTitulo = {
            title: "",
            priority: "MEDIA"
        };

        const resultado = validateTask(tarefaSemTitulo);

        expect(resultado.valid).toBe(false);
        expect(resultado.errors.title).toBe("O título é obrigatório.");
    });

    test("Deve retornar erro se o título tiver menos de 3 caracteres", () => {
        const tarefaTituloCurto = {
            title: "Ok",
            priority: "MEDIA"
        };

        const resultado = validateTask(tarefaTituloCurto);

        expect(resultado.valid).toBe(false);
        expect(resultado.errors.title).toBe("O título deve possuir pelo menos 3 caracteres.");
    });

    test("Deve retornar erro se o título estourar o limite de 100 caracteres", () => {
        const tarefaTituloLongo = {
            title: "a".repeat(101), // Cria uma string de 101 caracteres 'a'
            priority: "MEDIA"
        };

        const resultado = validateTask(tarefaTituloLongo);

        expect(resultado.valid).toBe(false);
        expect(resultado.errors.title).toBe("O título deve possuir no máximo 100 caracteres.");
    });

    // —— CAMINHOS DE EXCEÇÃO (VALIDAÇÃO DA DESCRIÇÃO) ——
    test("Deve retornar erro se a descrição estourar o limite de 500 caracteres", () => {
        const tarefaDescricaoLonga = {
            title: "Título Válido",
            description: "d".repeat(501),
            priority: "BAIXA"
        };

        const resultado = validateTask(tarefaDescricaoLonga);

        expect(resultado.valid).toBe(false);
        expect(resultado.errors.description).toBe("A descrição deve possuir no máximo 500 caracteres.");
    });

    // —— CAMINHOS DE EXCEÇÃO (VALIDAÇÃO DA PRIORIDADE) ——
    test("Deve retornar erro se a prioridade enviada for inválida ou inexistente", () => {
        const tarefaPrioridadeInvalida = {
            title: "Título Válido",
            priority: "SUPER_URGENTE" // Prioridade fora do array permitido
        };

        const resultado = validateTask(tarefaPrioridadeInvalida);

        expect(resultado.valid).toBe(false);
        expect(resultado.errors.priority).toBe("Prioridade inválida.");
    });
});

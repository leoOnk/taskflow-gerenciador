import { jest } from '@jest/globals';
import { saveTasks, loadTasks, clearTasks } from "./storage.js";

// Configuração do Mock do localStorage para o ambiente Node.js
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        })
    };
})();

// Injeta o mock no objeto global do ambiente de testes
Object.defineProperty(global, "localStorage", {
    value: localStorageMock
});

describe("💾 Testes Unitários - Persistência de Dados (storage.js)", () => {
    
    beforeEach(() => {
        // Limpa o armazenamento simulado e os históricos de chamadas antes de cada teste
        localStorage.clear();
        jest.clearAllMocks();
    });

    test("Deve salvar uma lista de tarefas corretamente no localStorage", () => {
        const tarefasExemplo = [
            { id: "1", title: "Testar o Storage", status: "PENDENTE" }
        ];

        saveTasks(tarefasExemplo);

        // Verifica se a função nativa do localStorage foi chamada com a chave e valor corretos
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "taskflow_tasks",
            JSON.stringify(tarefasExemplo)
        );
    });

    test("Deve retornar uma lista vazia [] se não houver dados salvos", () => {
        const resultado = loadTasks();

        expect(resultado).toEqual([]);
        expect(localStorage.getItem).toHaveBeenCalledWith("taskflow_tasks");
    });

    test("Deve recuperar as tarefas convertidas em objeto com sucesso", () => {
        const tarefasExemplo = [
            { id: "2", title: "Tarefa Recuperada", status: "CONCLUIDA" }
        ];
        
        // Simula um dado já existente no banco do navegador
        localStorage.setItem("taskflow_tasks", JSON.stringify(tarefasExemplo));

        const resultado = loadTasks();

        expect(resultado).toHaveLength(1);
        expect(resultado[0].title).toBe("Tarefa Recuperada");
    });

    test("Deve retornar uma lista vazia [] e capturar o erro se o JSON estiver corrompido", () => {
        // Injeta uma string inválida que quebra o JSON.parse
        localStorage.setItem("taskflow_tasks", "{json-invalido---");

        // Espiona o console.error para garantir que o erro foi devidamente logado
        const spyConsole = jest.spyOn(console, "error").mockImplementation(() => {});

        const resultado = loadTasks();

        expect(resultado).toEqual([]);
        expect(spyConsole).toHaveBeenCalled();

        spyConsole.mockRestore();
    });

    test("Deve remover a chave do armazenamento ao disparar clearTasks", () => {
        clearTasks();

        expect(localStorage.removeItem).toHaveBeenCalledWith("taskflow_tasks");
    });
});

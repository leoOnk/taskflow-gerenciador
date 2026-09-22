describe('🎨 Automação de Interface - Sistema TaskFlow', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5500/index.html');
        
        // FORÇA O BLOQUEIO DE SUBMIT NATIVO DIRETAMENTE NA TELA
        cy.get('#task-form').then(($form) => {
            $form.on('submit', (e) => e.preventDefault());
        });
    });

    it('Cenário 1: Deve criar uma nova tarefa com sucesso e atualizar o dashboard', () => {
        cy.get('#task-title').type('Aprender Automação E2E');
        cy.get('#task-description').type('Criar scripts de testes robustos utilizando Cypress.');
        cy.get('#task-priority').select('ALTA');
        cy.get('#task-due-date').type('2026-12-31');

        cy.get('#submit-task-btn').click();

        cy.get('#task-title').should('have.value', '');
        cy.get('#tasks-container').should('contain', 'Aprender Automação E2E');
        cy.get('#total-tasks').should('have.text', '1');
    });

    it('Cenário 2: Deve exibir mensagem de erro se tentar enviar o título em branco', () => {
        // Ignora a trava required nativa do Chrome para testar a estilização
        cy.get('#task-form').invoke('attr', 'novalidate', 'novalidate');
        
        cy.get('#submit-task-btn').click();

        cy.get('#title-error')
            .should('be.visible');
    });
});

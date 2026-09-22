# ⚡ TaskFlow — Gerenciador de Tarefas com Qualidade de Software Integrada

[![Acesse o Projeto](https://shields.io)]


O **TaskFlow** é uma aplicação web moderna e responsiva voltada para o gerenciamento eficiente de tarefas diárias. O grande diferencial deste projeto não está apenas na sua interface limpa e intuitiva, mas sim na sua arquitetura de código guiada por boas práticas de engenharia de software, contando com uma esteira robusta de **Testes Unitários** e **Testes de Interface Automatizados (End-to-End)**.

---

## 🚀 Tecnologias Utilizadas

### Core da Aplicação
* **HTML5 & CSS3:** Estruturação semântica e estilização moderna baseada em variáveis e design responsivo.
* **JavaScript Nativo (ES6+):** Lógica de negócios modularizada utilizando módulos nativos do navegador (`type="module"`).
* **LocalStorage API:** Persistência de dados local no navegador do usuário para garantir retenção de informações pós-recarregamento.

### Ferramental de Testes & Qualidade
* **Jest:** Framework de testes unitários utilizado para validar de forma isolada a camada de lógica e regras de negócio.
* **Cypress:** Ferramenta de automação de testes End-to-End (E2E) para simular o comportamento real do usuário na interface gráfica.
* **Babel:** Transpilador utilizado para garantir a compatibilidade de módulos modernos (ES6) no ambiente de testes corporativos.

---

## 🏛️ Arquitetura do Projeto

O sistema foi desenhado separando estritamente as responsabilidades de cada componente para facilitar a manutenção e escalabilidade do código:

```text
📂 taskflow
 ┣ 📂 css               # Estilizações modulares (reset, variáveis e estilo geral)
 ┣ 📂 js
 ┃ ┣ 📄 app.js          # Orquestrador central e gerenciador de eventos do DOM
 ┃ ┣ 📄 storage.js      # Camada de persistência isolada (LocalStorage)
 ┃ ┣ 📄 tasks.js        # Regras de negócio e gerenciamento do estado das tarefas
 ┃ ┣ 📄 ui.js           # Renderização e manipulação visual dinâmica dos componentes
 ┃ ┣ 📄 utils.js        # Funções utilitárias auxiliares de data e identificadores
 ┃ ┗ 📄 validation.js   # Validador de dados e consistência de campos do formulário
 ┣ 📂 cypress/e2e       # Scripts de automação visual de ponta a ponta
 ┣ 📄 babel.config.js   # Configuração do Babel para o ambiente Node.js
 ┣ 📄 jest.config.cjs   # Configuração de transpilagem do Jest
 ┗ 📄 package.json      # Manifesto de dependências e scripts do ecossistema Node
```

---

## 🧪 Estratégia de Testes

Para garantir estabilidade contínua ao projeto, foram mapeados **Cenários Felizes** e **Cenários de Exceção (Falhas)** nas duas principais camadas do software:

### 1. Testes Unitários (Camada Lógica)
Utilizando o **Jest**, isolamos o comportamento do motor da aplicação através de *mocks* simulados. Foram validados:
* **Persistência de dados:** Salvamento, recuperação de JSON íntegro e tratamento contra arquivos corrompidos.
* **Validação de Formulários:** Bloqueio de títulos em branco, restrição de tamanho de caracteres (títulos < 3 ou > 100 caracteres; descrições > 500 caracteres) e rejeição de prioridades inválidas.

### 2. Testes de Interface End-to-End (Camada Visual)
Utilizando o **Cypress**, automatizamos as interações do navegador real. Foram validados:
* **Fluxo de Criação:** Digitação automática, seleção de prioridade, clique no botão estruturado, inserção correta do card visual no container e atualização imediata dos contadores do Dashboard superior.
* **Validação de Erros:** Interceptação do envio e checagem da exibição de feedbacks de erro em tempo real na tela do usuário.

---

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org) instalado em sua máquina.

### Instalação
1. Clone o repositório ou baixe os arquivos em sua máquina.
2. Abra o terminal na raiz do projeto e instale as dependências necessárias:
```bash
npm install
```

### Executando os Testes Unitários (Jest)
Para rodar toda a suíte de validação lógica e de persistência de dados em ambiente de terminal, execute:
```bash
npm test
```

### Executando a Automação de Interface (Cypress)
1. Certifique-se de que a aplicação está rodando em um servidor local (como a extensão Live Server na porta `5500`).
2. Abra a interface gráfica do Cypress para acompanhar os testes visuais executando sozinhos:
```bash
npm run cypress:open
```

---

## 📈 Resultados Obtidos

* **11/11 Testes Unitários** aprovados com sucesso absoluto.
* **2/2 Cenários de Automação Visual** executados, garantindo resiliência total contra recarregamentos indevidos de página e falhas de renderização do DOM.

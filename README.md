# Repositório de Projetos de Teste Automatizado

Este repositório contém dois projetos distintos de automação de testes, cada um com foco e estratégias específicas:

## 1. Projeto `hope` — Teste Integrado (Web + API)

### Objetivo
O projeto `hope` é um conjunto de testes integrados voltados para a validação de funcionalidades de mapas, abrangendo tanto a camada web quanto a API. O objetivo é garantir que a experiência do usuário e as integrações backend estejam funcionando corretamente.

### Estrutura de Pastas
```
hope/
  api/                # Backend (API) para testes integrados
    src/              # Código-fonte da API
      routes.ts       # Rotas da API
      server.ts       # Inicialização do servidor
      config/         # Configurações
      controllers/    # Lógica dos endpoints
      errors/         # Tratamento de erros
      models/         # Modelos de dados
    uploads/          # Imagens utilizadas nos testes
    package.json      # Dependências e scripts da API
    tsconfig.json     # Configuração TypeScript
  web/                # Testes automatizados (Cypress)
    cypress/          # Testes E2E e suporte
      e2e/            # Especificações de testes
      downloads/      # Downloads gerados nos testes
    public/           # Recursos estáticos
    src/              # Código-fonte do frontend
    cypress.config.js # Configuração do Cypress
    package.json      # Dependências e scripts
    allure-results/   # Resultados dos relatórios Allure
```

### Estratégias de Teste
- **Testes E2E (Cypress):** Validação completa do fluxo do usuário, incluindo interação com mapas, cadastro, upload de imagens e integração com a API.
- **Testes de API:** Validação dos endpoints REST, autenticação, upload de arquivos e consistência dos dados.
- **Relatórios:** Utilização do Allure para geração de relatórios detalhados dos testes.

### Configurações
- Cypress configurado para rodar testes E2E e gerar evidências (vídeos, screenshots).
- API em Node.js/TypeScript, com scripts para inicialização e reset do banco de dados para testes.
- Integração entre frontend e backend simulando o ambiente real de produção.

---

## 2. Projeto `movebee` — Teste de Componente (Busca de CEP)

### Objetivo
O projeto `movebee` é focado em testes de componente, validando especificamente o componente de busca de CEP, responsável por verificar a área de cobertura da empresa.

### Estrutura de Pastas
```
movebee/
  api/                # (Opcional) Mock ou API para suporte aos testes
    src/              # Código-fonte da API de suporte
    package.json      # Dependências
  web/                # Testes de componente (Cypress Component Testing)
    cypress/          # Testes de componente e suporte
    public/           # Recursos estáticos
    src/              # Código-fonte do frontend
    cypress.config.js # Configuração do Cypress
    package.json      # Dependências e scripts
    vite.config.js    # Configuração do Vite
    index.html        # Página principal
    README.md         # Documentação específica
```

### Estratégias de Teste
- **Testes de Componente (Cypress):** Validação isolada do componente de busca de CEP, cobrindo diferentes cenários de entrada e resposta.
- **Mocks de API:** Utilização de mocks para simular respostas da API de CEP, garantindo testes rápidos e determinísticos.
- **Cobertura:** Foco em garantir que o componente responde corretamente a diferentes CEPs, exibindo mensagens de sucesso, erro ou fora de cobertura.

### Configurações
- Cypress configurado para Component Testing, integrado ao Vite para build rápido dos componentes.
- Possibilidade de rodar testes em modo interativo ou headless.
- Estrutura modular para fácil manutenção e expansão dos testes.

---

## Como Executar

1. Instale as dependências em cada projeto (`api` e `web`):
   ```bash
   cd hope/api && npm install
   cd hope/web && npm install
   cd movebee/api && npm install # se aplicável
   cd movebee/web && npm install
   ```
2. Inicie os servidores necessários (API/backend):
   ```bash
   cd hope/api && npm start
   cd movebee/api && npm start # se aplicável
   ```
3. Execute os testes:
   ```bash
   # Testes E2E ou de componente
   cd hope/web && npx cypress run
   cd movebee/web && npx cypress run-ct
   ```

---

## Observações
- Os resultados dos testes são armazenados em `allure-results/` e podem ser visualizados com o Allure Report.

---
# Sistema de Gerenciamento de Eventos — Parte 02 combinada

Leia PASSO_A_PASSO.md. Projeto da UCB com HTML/CSS/JS, Express, SQLite e JWT.

## Comandos
- npm install: instala dependências.
- npm start: inicia http://localhost:3000. Conta de demonstração usuario@email.com / 123456.
- npm run test:report: executa 37 testes Jest (14 unitários + 23 API/Supertest); gera evidencias/jest-completo.json. Não exige servidor iniciado.
- npm run test:unit: 14 testes unitários.
- npm run test:api: 23 testes API, incluindo seis de regressão das validações.
- npm run test:bugs: somente os seis testes de regressão; todos devem passar após as correções.
- npm run test:coverage: executa Jest com relatório de cobertura (opcional).
- npm run test:postman: 12 requisições Newman, 21 asserções; requer npm start em outro terminal. Gera JSON e XML.
- npm run cypress:open: interface Cypress.
- npm run test:e2e: 16 testes Cypress (12 CT + 4 REG), com relatório XML; requer npm start.

## Resultados desta versão

- Jest: 37/37 aprovados (14 unitários + 23 API), em três suites.
- Newman: 12 requisições e 21 asserções sem falhas.
- Cypress: 16/16 aprovados conforme execução informada pelo grupo. O vídeo comprova 8/8 em complementares.cy.js e termina no início de eventos.cy.js; os XML completos do PC devem complementar a evidência.
- Total informado: 49 CT distintos aprovados + quatro regressões. Newman repete 11 CT e adiciona um health check; não duplicar a contagem.

[Resultados e fontes](evidencias/RESULTADOS.md) · [Registro Cypress](evidencias/cypress-execucao.md)

## Documentação e apresentação

- [Relatório final em PDF](docs/Relatorio_Final_Parte_02.pdf)
- [Relatório editável em Word](docs/Relatorio_Final_Parte_02.docx)
- [Apresentação com vídeos](https://canva.link/fp9ne7crlv6ydrr)

## Alterações
Testes adicionais Supertest, banco isolado em memória, fechamento do banco após os testes, exportação do app sem iniciar servidor ao importar, correções de horário/status/tipos e tratamento JSON de corpo malformado. Nenhum teste de defeito foi excluído do comando principal. Não foi criada proibição de datas passadas, pois essa regra não consta dos requisitos.

DB_PATH é opcional; padrão data/events.db. Os testes Supertest usam :memory:. Não envie node_modules, bancos .db ou tokens ao GitHub. O código-fonte foi publicado nesta branch a partir do pacote original, preservando os arquivos da raiz.

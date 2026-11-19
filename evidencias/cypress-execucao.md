# Execução Cypress — Parte 02

O grupo confirmou a execução local bem-sucedida dos 16 testes: 12 CT de interface e quatro REG. O slide 10 registra 16/16 aprovados.

## Evidência em vídeo

Apresentação: https://canva.link/fp9ne7crlv6ydrr
Slide: 10 — Execução 3: Cypress (E2E).
Conferência da gravação em 22/10/2026: reprodução disponível. O final mostra complementares.cy.js com 8 testes, 8 aprovados, 0 falhas, 0 pendentes e 0 ignorados. A gravação termina quando começa eventos.cy.js; não mostra o resumo completo das três suites.

Ambiente visível: Windows, Node.js 24.21.0, Cypress 14.5.4, Electron 130 (headless).
Comando visível: npm run test:e2e, com reporter JUnit e saída evidencias/cypress-[hash].xml.

## Origem dos resultados

- complementares.cy.js: 8 aprovados, comprovados no vídeo.
- eventos.cy.js: 4 aprovados, conforme informação do grupo.
- regressao.cy.js: 4 aprovados, conforme informação do grupo.
- Total informado: 16/16 aprovados.

Este documento é um registro de execução e referência à gravação, não um XML produzido pelo Cypress. Os XML originais da execução no PC devem ser copiados para evidencias/ sem alterar seu conteúdo. Não é necessário executar novamente se esses arquivos já existem.

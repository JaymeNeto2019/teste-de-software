# Revisão técnica da entrega — Parte 02

> Revisão estática do ZIP enviado pelo grupo. **Não equivale à execução dos testes**.

## Arquivos e organização

O pacote `Repositorio_Parte_02_Final.zip` contém 39 arquivos, incluindo:

- `src/`: Express, rotas de autenticação e eventos, SQLite e validações.
- `public/`: login, painel, scripts e CSS.
- `tests/unit/` e `tests/api/`: testes Jest e Supertest.
- `cypress/e2e/`: `eventos.cy.js`, `complementares.cy.js` e `regressao.cy.js`.
- `postman/`: coleção de testes HTTP.
- `evidencias/`: resultados Jest, Newman e registro de execução Cypress.
- `docs/`: relatório em PDF, DOCX e Markdown.

## Resultados que a documentação apresenta

| Conjunto | Quantidade | Situação da evidência |
|---|---:|---|
| Jest unitário | 14 | Logs e JSON incluídos no pacote |
| Jest API / Supertest | 23 | Logs e JSON incluídos no pacote |
| Newman | 12 requisições e 21 asserções | Logs, JSON e XML incluídos |
| Cypress CT | 12 | 8 testes demonstrados em vídeo; 4 relatados pelo grupo |
| Cypress REG | 4 | Relatados pelo grupo, sem XML completo no pacote |

**Não somar** as 12 requisições Newman aos 49 CT: 11 se sobrepõem aos testes Supertest e uma é health check.

## Como executar (Windows)

1. Instale Node.js e execute `npm install` na pasta com `package.json`.
2. Rode `npm run test:report`. O resultado **esperado**, conforme evidências anteriores, é 37 testes Jest aprovados.
3. Em um terminal separado, execute `npm start` e abra `http://localhost:3000`.
4. Com o servidor ativo, execute `npm run test:postman`.
5. Execute `npm run test:e2e` com o servidor ativo. Confirme o resultado real e guarde os arquivos `evidencias/cypress-*.xml`.

Não execute Newman e Cypress simultaneamente no mesmo banco de demonstração.

## Pendências recomendadas antes de entregar

1. **Conferir a URL no relatório:** a página 12 aponta para `JaymeNeto2019/sistema-gerenciamento-eventos`, enquanto esta entrega está em `JaymeNeto2019/teste-de-software`. Corrigir no documento-fonte e regenerar PDF.
2. **Revisar instruções antigas:** `PASSO_A_PASSO.md` menciona um ZIP e uma pasta `projeto` que não correspondem exatamente a esta estrutura. Também cita `entrega/Relatorio_Parte_02_Eventos.docx`, inexistente neste pacote.
3. **Executar Cypress integralmente:** capturar resumo das três suítes e publicar XML/prints sem dados sensíveis. Até isso acontecer, não apresentar 16/16 como comprovação independente.
4. **Verificar BUG-02 visualmente:** o relatório informa que a mensagem antiga de sucesso ainda precisa de confirmação visual.
5. **Conferir identificação do grupo:** completar o nome de Átila e confirmar responsabilidades.
6. **Não publicar credenciais reais:** a conta `usuario@email.com / 123456` e a chave JWT padrão são apenas para demonstração local. Definir `JWT_SECRET` no ambiente para qualquer implantação fora de laboratório.

## O que esta revisão não verificou

Não foi possível instalar dependências nem executar Jest, Newman e Cypress nesta inspeção. O código foi lido, mas **a aprovação dos testes depende de uma execução reproduzível**.

## Material de referência

- [Relatório original em PDF](../Relatorio_Final_Parte_02.pdf)
- [Pacote original preservado](../Repositorio_Parte_02_Final.zip)
- [Guia de execução do pacote](../PASSO_A_PASSO.md)

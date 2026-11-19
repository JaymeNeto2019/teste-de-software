# Testar o projeto combinado no Windows

Este pacote reúne as correções, a documentação e os testes adicionais de API. O resultado confirmado nesta versão é 37 testes Jest aprovados (14 unitários + 23 de API), além de 12 requisições e 21 asserções aprovadas no Newman. Os 16 testes Cypress ainda precisam ser executados no seu computador. Não registre aprovação antes da execução.

## 1. Extrair e abrir a pasta correta
1. Baixe Trabalho_Teste_Software_Parte_02.zip.
2. Clique com o botão direito no ZIP e escolha Extrair Tudo.
3. Abra a pasta extraída e depois a pasta projeto.
4. Confira se aparecem package.json, src, public, tests e cypress.
5. Clique na barra de endereço do Explorador (onde aparece o caminho da pasta), digite cmd e pressione Enter. Isso abre o Prompt de Comando na pasta correta.
6. Digite node -v e npm -v. Se não forem reconhecidos, instale o Node.js LTS e reabra o CMD.
7. Execute:

    npm install

Aguarde a instalação terminar e o caminho da pasta voltar a aparecer. Avisos amarelos não significam necessariamente falha; se aparecer npm ERR! ou npm error, envie o texto do erro. Não execute npm audit fix --force, pois ele pode trocar versões e quebrar a configuração.

## 2. Executar Jest e Supertest
Nesse mesmo CMD, execute:

    npm run test:report

Esse comando executa testes unitários, de API e de regressão das validações. O Supertest inicia a aplicação para os testes com banco SQLite em memória; você não precisa abrir o navegador nem executar npm start para esta etapa. Os dados do banco local não são alterados por esses testes.

Resultado esperado nesta versão:
- Test Suites: 3 passed, 3 total.
- Tests: 37 passed, 37 total.

Os resultados são gravados em evidencias/jest-completo.json. Tire um print mostrando o comando e o resumo; salve como evidencias/01-jest-supertest.png. Caso apareça vermelho, preserve o erro e envie para revisão.

Para apresentar os conjuntos separadamente, os comandos opcionais são:

    npm run test:unit
    npm run test:api
    npm run test:bugs

São 14 testes unitários, 23 de API e, dentro dos 23, seis testes de regressão das validações. Não some esses comandos: test:bugs é um subconjunto de test:api, que já foi executado em test:report. Apesar do nome test:bugs, os seis devem PASSAR na versão corrigida.

## 3. Iniciar o sistema
No primeiro CMD, execute:

    npm start

Espere aparecer Servidor rodando em http://localhost:3000. Deixe essa janela aberta. Abra http://localhost:3000 no navegador. Login de demonstração: usuario@email.com. Senha: 123456.

Abra OUTRO CMD na mesma pasta projeto (repita o procedimento da barra de endereço). Use a segunda janela para os comandos abaixo, mantendo a primeira com o servidor em execução.

## 4. Executar Postman via Newman
No segundo CMD, execute:

    npm run test:postman

Resultado esperado: 12 requests, 21 assertions, 0 failed. São 11 casos de teste já cobertos pelo Supertest, mais uma consulta de saúde; não são 12 casos novos.

Arquivos automáticos: evidencias/newman.json e evidencias/newman.xml. Tire um print do resumo como evidencias/02-newman.png.

Alternativa visual no Postman: Import > selecione postman/Sistema_Eventos.postman_collection.json > abra a coleção > Run collection. Mantenha todas as requisições na ordem original. O login salva o token e o cadastro salva o ID automaticamente. Capture o resumo, sem expor tokens nas imagens.

## 5. Executar Cypress e capturar prints
Ainda com o servidor aberto, execute no segundo CMD:

    npx cypress install
    npm run cypress:open

1. Na janela Cypress, escolha E2E Testing.
2. Se aparecer a revisão da configuração, clique Continue.
3. Escolha um navegador disponível, como Chrome ou Electron.
4. Clique Start E2E Testing.
5. Na lista Specs, clique em eventos.cy.js. Espere terminar. São 4 testes. Capture o resultado inteiro como 03-cypress-eventos.png.
6. Volte à lista Specs e abra complementares.cy.js. São 8 testes. Capture como 04-cypress-complementares.png.
7. Volte à lista e abra regressao.cy.js. São 4 testes. Capture como 05-cypress-regressao.png.
8. Salve as imagens na pasta evidencias. Se algum teste falhar, clique nele, capture o erro e envie para revisão.

O CT-006 usa resposta simulada de lista vazia para verificar a interface; os outros usam o backend real. Os testes originais de cadastro e regressão deixam eventos de demonstração no banco. Use somente a pasta nova extraída e não um banco com dados importantes.

Para gerar relatórios XML dos três arquivos, feche o Cypress interativo e execute:

    npm run test:e2e

Espere o resumo: esperado 16 testes aprovados, zero falhas, após confirmação real. Os relatórios ficam em evidencias/cypress-*.xml. Tire print da tabela final também. Não execute Newman e Cypress ao mesmo tempo.

## 6. Problemas comuns
- ENOENT / package.json não encontrado: você abriu o CMD na pasta errada. Entre em projeto, onde existe package.json.
- EADDRINUSE / porta 3000 ocupada: pare o servidor antigo com Ctrl+C na janela dele e inicie apenas a nova versão. Não troque a porta, pois os testes apontam para 3000.
- ECONNREFUSED no Newman ou Cypress: confirme que a primeira janela está com npm start e que localhost:3000 abre no navegador.
- Cypress não instalado: execute npx cypress install e tente novamente. Se falhar, envie a mensagem completa.
- Instalação do sqlite3 falhou: envie o erro e a saída de node -v; não copie node_modules de outro computador.
- Aviso de vulnerabilidades do npm: não é o resultado dos testes. Evite alterações automáticas de versões antes da entrega.

## 7. Finalizar o relatório
1. Abra entrega/Relatorio_Parte_02_Eventos.docx.
2. Confira a divisão proposta de responsabilidades e ajuste para o que cada integrante realmente fez. Complete o nome de Átila quando souber.
3. Insira os prints e a data das execuções na seção de evidências.
4. Quando os 12 CT de interface forem executados, atualize a tabela e a conclusão. Se todos passarem: 49/49 CT executados e aprovados. As quatro regressões REG são adicionais; o health check também é adicional.
5. Se houver falha, registre esperado, observado, evidência, correção e nova execução. Não apague a ocorrência só porque o teste passou depois.
6. Critério de saída: todos os 49 CT executados; pelo menos 95% aprovados (47/49); 100% dos críticos aprovados; nenhuma falha crítica aberta. Execute também as quatro regressões. O resultado do Cypress foi informado pelo grupo e a gravação está referenciada em evidencias/cypress-execucao.md. Preserve os XML originais para comprovar o total.
7. Exporte a versão atualizada para PDF. Você pode enviar os prints e XMLs para eu atualizar o relatório com os resultados reais.

## 8. Atualizar o GitHub
Abra https://github.com/JaymeNeto2019/sistema-gerenciamento-eventos.
Use Add file > Upload files. Envie as pastas src, public, tests, cypress, postman, evidencias e os arquivos package.json, package-lock.json, cypress.config.js, README.md, PASSO_A_PASSO.md e .gitignore. Inclua o relatório atualizado. Não envie node_modules, data/*.db, tokens ou arquivos de ambiente.

A coleção Postman salva tokens na execução. Antes de publicar newman.json gerado localmente, remova os tokens ou publique apenas o XML, o resumo e os prints sem tokens. O JSON incluído neste pacote já foi tratado.

O repositório remoto não foi alterado automaticamente. O professor deve conseguir visualizar o código extraído, não apenas um ZIP antigo. Guarde uma cópia da versão anterior antes de substituir arquivos.

## 9. Apresentação em aula
Demonstre pelo menos três testes: CT-027 (horário inválido no Jest), CT-035 (API rejeitando 99:99 com HTTP 400) e CT-003 (cadastro pela interface Cypress). Explique a diferença entre testes unitários, API e E2E. Um cenário inválido passa no teste quando o sistema rejeita corretamente a entrada.

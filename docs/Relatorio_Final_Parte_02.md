UNIVERSIDADE CATÓLICA DE BRASÍLIA

Ciência da Computação • Teste de Software • Trab_Final_2

Relatório de testes do Sistema de Gerenciamento de Eventos

Parte 02 do projeto final

Isaac Barbosa da Silva
Jayme Bernardino da Silva Neto
Alex Correa de Sousa
Victor Lemos de Abreu Oliveira
Joao Pedro Carneiro Ibiapino
Átila

Brasília DF • Outubro de 2026

O projeto permite que organizadores autenticados cadastrem, consultem, editem e excluam eventos. Este relatório apresenta os requisitos, o plano, os casos de teste, as correções e os resultados das execuções disponíveis.

Resultado consolidado: 14 testes unitários e 23 casos de API aprovados nos relatórios automáticos. O grupo informou aprovação dos 16 testes Cypress (12 CT de interface e quatro REG). A gravação do slide 10 comprova oito testes de complementares.cy.js aprovados; termina no início de eventos.cy.js. O total de 16 é informado pelo grupo e não está integralmente demonstrado nesse vídeo.

# 1 Visão e escopo do sistema

O problema atendido é a dispersão das informações dos eventos. A aplicação centraliza nome, descrição, data, horário, local, quantidade de vagas e status, permitindo que o organizador mantenha seus registros atualizados.

| Interessado | Necessidade |

| --- | --- |

| Organizador | Criar, consultar, atualizar e remover eventos com acesso autenticado. |

| Equipe de desenvolvimento | Manter regras de negócio consistentes na interface e na API. |

| Professor avaliador | Verificar casos reproduzíveis, automação e evidências de execução. |

Escopo: login, lista e detalhes de eventos, cadastro, edição, exclusão com confirmação e logout. Fora do escopo: venda de ingressos, pagamentos, aplicativo móvel, integrações externas, testes de carga e auditoria avançada de segurança. Os detalhes são apresentados nos cartões e no formulário de edição; não existe uma página exclusiva de detalhes.

Arquitetura: HTML, CSS e JavaScript no frontend; Node.js e Express no backend; SQLite para persistência; autenticação por JWT. Os testes utilizam Jest, Supertest, Postman/Newman e Cypress.

# 2 Histórias de usuário e critérios de aceitação

## HU01

Como organizador de eventos, quero realizar login para acessar os eventos.

Aceitação: Credenciais válidas permitem acesso; senha incorreta retorna 401 na API; entradas malformadas retornam 400; a interface informa o erro.

## HU02

Como organizador de eventos, quero cadastrar um evento para organizar seus dados.

Aceitação: Campos obrigatórios válidos geram cadastro; nome vazio, horário inválido, status desconhecido ou vagas inválidas impedem a operação.

## HU03

Como organizador de eventos, quero visualizar a lista para consultar os eventos existentes.

Aceitação: Exibir nome, data, local e status; a lista vazia deve informar que não há eventos.

## HU04

Como organizador de eventos, quero consultar os detalhes para conferir as informações completas.

Aceitação: Os cartões e a edição mostram os dados; a API retorna 404 para ID inexistente.

## HU05

Como organizador de eventos, quero editar um evento para atualizar suas informações.

Aceitação: Dados válidos persistem; nome vazio é rejeitado sem alterar o registro.

## HU06

Como organizador de eventos, quero excluir um evento para remover registros desnecessários.

Aceitação: Confirmar remove o registro; cancelar mantém o evento.

## HU07

Como organizador de eventos, quero realizar logout para encerrar o acesso pela interface.

Aceitação: Remover token local e redirecionar ao login; sem token local, a página interna redireciona. O JWT já emitido permanece válido até expirar; não há revogação no servidor.

# 3 Planejamento de testes

Objetivo: verificar os fluxos de gerenciamento e as regras de validação, incluindo cenários de sucesso e erro. O escopo cobre 49 casos identificados por CT e quatro cenários complementares de regressão REG. Há ainda uma requisição de saúde da API sem ID CT.

| Camada | Estratégia e ferramenta |

| --- | --- |

| Unitária | Jest: funções puras de nome, data, vagas, horário, status e formato de credenciais. |

| API e integração | Supertest/Jest e Postman/Newman: autenticação, operações no SQLite, validação de entradas e tratamento de erros HTTP. |

| Interface e E2E | Cypress: navegação, formulários, edição, exclusão e logout. CT-006 utiliza resposta simulada da API; os demais usam o servidor real. |

Critérios de entrada: dependências instaladas, servidor respondendo em localhost:3000, usuário de teste disponível e banco exclusivo de demonstração. Executar as suites sequencialmente para evitar interferência entre cadastros e exclusões.

Critérios de saída: todos os 49 CT executados; pelo menos 95% aprovados (47 de 49); 100% dos críticos aprovados; nenhuma falha crítica aberta. Casos críticos: CT-001, CT-002, CT-003, CT-007, CT-009, CT-011, CT-012, CT-016, CT-019, CT-020, CT-022, CT-023 e CT-037. As quatro regressões devem ser executadas após as correções. Caso negativo aprovado significa que o sistema rejeitou corretamente a entrada.

A taxa de aprovação usa aprovados ÷ executados. A cobertura de execução usa executados ÷ planejados. Testes não executados não podem ser contados como aprovados. A quantidade de asserções da ferramenta não equivale à quantidade de casos.

## Responsabilidades propostas para validação do grupo

| Integrante | Responsabilidade proposta |

| --- | --- |

| Isaac Barbosa da Silva | Backend, API e persistência. |

| Jayme Bernardino da Silva Neto | Consolidação do relatório e evidências. |

| Alex Correa de Sousa | Frontend e validações da interface. |

| Victor Lemos de Abreu Oliveira | Testes unitários com Jest. |

| Joao Pedro Carneiro Ibiapino | Coleção Postman e execução Newman. |

| Átila | Execução Cypress e regressão. |

Todos participam da revisão dos requisitos, das falhas e dos resultados.

# 4 Dados e preparação dos testes

Base URL: http://localhost:3000. Usuário de demonstração: usuario@email.com; senha: 123456. As chamadas protegidas usam Authorization: Bearer {{token}}. O token deve ser obtido pelo POST /api/login; não deve ser publicado nas evidências.

P1 é o corpo completo do evento válido. Nos casos que indicam alteração de um campo, os outros campos permanecem iguais a P1:

{
  "nome": "Feira de Tecnologia",
  "descricao": "Evento sobre inovação e tecnologia",
  "data": "2026-10-25",
  "horario": "19:00",
  "local": "Brasília",
  "vagas": 100,
  "status": "Ativo"
}

P2 é P1 com nome = Feira de Tecnologia Atualizada, descrição = Evento atualizado sobre inovação e tecnologia, horário = 20:00, local = Centro de Convenções Ulysses Guimarães e vagas = 150.

P3 é o evento da suite complementar: nome = Evento complementar; descrição = Teste automatizado; data = 2026-10-25; horário = 19:00; local = Brasília; vagas = 100; status = Ativo. Seu ID é capturado da resposta do cadastro no beforeEach e removido no afterEach. Os testes originais de cadastro e regressão usam nomes com Date.now() para evitar colisões.

O ID utilizado nos casos de API é {{eventId}}, preenchido automaticamente com response.event.id do CT-016. Isso evita depender de um ID fixo inexistente. O CT-021 usa 999999 em banco de demonstração, verificando antes que não existe. Requisições GET não levam corpo.

# 5 Casos de teste

## CT-001 Login com dados válidos

Tipo: E2E. Situação: Aprovado conforme relato do grupo (seção 6).

Entrada e preparação: usuario@email.com / 123456 Passos: Acessar login; informar e-mail válido; informar senha válida; clicar em Entrar. Esperado: Usuário autenticado e direcionado para a tela principal.

## CT-002 Login com senha incorreta

Tipo: E2E. Situação: Aprovado conforme relato do grupo (seção 6).

Entrada e preparação: usuario@email.com / senhaerrada Passos: Acessar login; informar e-mail válido; informar senha incorreta; clicar em Entrar. Esperado: Acesso impedido e mensagem de credenciais inválidas.

## CT-003 Cadastro de evento com dados válidos

Tipo: E2E. Situação: Aprovado conforme relato do grupo (seção 6).

Entrada e preparação: P1, com nome Feira de Tecnologia acrescido de Date.now(). Passos: Realizar login; abrir cadastro; preencher os campos obrigatórios; clicar em Cadastrar. Esperado: Evento cadastrado e mensagem de sucesso.

## CT-004 Cadastro com campo obrigatório vazio

Tipo: E2E. Situação: Aprovado conforme relato do grupo (seção 6).

Entrada e preparação: P1 com nome vazio; descrição opcional não preenchida. Passos: Realizar login; preencher dados; deixar Nome vazio; clicar em Cadastrar. Esperado: Cadastro impedido e mensagem de campo obrigatório.

## CT-005 Visualizar lista de eventos

Tipo: E2E. Situação: Aprovado conforme relato do grupo (seção 6).

Entrada e preparação: P3 criado automaticamente; selecionar o cartão por data-id retornado no cadastro. Passos: Realizar login; acessar a tela principal; verificar a lista. Esperado: Lista com nome, data, local e status.

## CT-006 Visualizar lista sem eventos

Tipo: Interface com API simulada. Situação: Aprovado conforme relato do grupo (seção 6).

Entrada e preparação: Resposta controlada [] no Cypress; não remove eventos reais. Passos: Autenticar, interceptar GET /api/events com status 200 e corpo [], recarregar e verificar mensagem. Esperado: Mensagem informando que não existem eventos cadastrados.

## CT-007 Editar evento com dados válidos

Tipo: E2E. Situação: Aprovado conforme relato do grupo (seção 6).

Entrada e preparação: P3 criado automaticamente; selecionar o cartão por data-id retornado no cadastro. Alterar local para UCB e horário para 20:00. Passos: Login; selecionar evento; Editar; alterar local/horário; Salvar. Esperado: Dados atualizados e mensagem de sucesso.

## CT-008 Editar evento com campo obrigatório vazio

Tipo: E2E. Situação: Aprovado conforme relato do grupo (seção 6).

Entrada e preparação: P3 criado automaticamente; selecionar o cartão por data-id retornado no cadastro. Apagar nome; conferir pela API que o nome original permanece. Passos: Login; selecionar evento; editar; apagar Nome; Salvar. Esperado: Atualização impedida e mensagem de validação.

## CT-009 Excluir evento com sucesso

Tipo: E2E. Situação: Aprovado conforme relato do grupo (seção 6).

Entrada e preparação: P3 criado automaticamente; selecionar o cartão por data-id retornado no cadastro. Passos: Login; selecionar evento; Excluir; confirmar. Esperado: Evento removido e mensagem de sucesso.

## CT-010 Cancelar exclusão de evento

Tipo: E2E. Situação: Aprovado conforme relato do grupo (seção 6).

Entrada e preparação: P3 criado automaticamente; selecionar o cartão por data-id retornado no cadastro. Passos: Login; selecionar evento; Excluir; cancelar confirmação. Esperado: Evento não é removido.

## CT-011 Logout realizado com sucesso

Tipo: E2E. Situação: Aprovado conforme relato do grupo (seção 6).

Entrada e preparação: Sessão criada com usuario@email.com / 123456; token no localStorage. Passos: Login; clicar em Sair. Esperado: Sessão encerrada e redirecionamento para login.

## CT-012 Acesso ao sistema após logout

Tipo: E2E. Situação: Aprovado conforme relato do grupo (seção 6).

Entrada e preparação: Sessão criada com usuario@email.com / 123456; token no localStorage. Passos: Login; logout; tentar acessar página interna. Esperado: Acesso impedido e redirecionamento para login.

## CT-013 Validação do nome do evento

Tipo: Unitário. Situação: Aprovado nesta execução.

Entrada e preparação: Nome = "" e "   ". Passos: Executar função de validação com valor vazio. Esperado: Função considera o nome inválido.

## CT-014 Validação da quantidade de vagas

Tipo: Unitário. Situação: Aprovado nesta execução.

Entrada e preparação: Vagas = -10 Passos: Executar função com valor inválido. Esperado: Função considera a quantidade inválida.

## CT-015 Validação da data do evento

Tipo: Unitário. Situação: Aprovado nesta execução.

Entrada e preparação: Data = "2026-10-32" no formato da função. Passos: Executar função com data inválida. Esperado: Função considera a data inválida.

## CT-016 Cadastro de evento pela API

Tipo: API. Situação: Aprovado nesta execução.

Entrada e preparação: P1 completo; token válido. Passos: Enviar POST /api/events com P1; guardar event.id em eventId. Esperado: 201; message = Evento cadastrado com sucesso.; event.nome igual a P1.

## CT-017 Cadastro pela API sem nome

Tipo: API. Situação: Aprovado nesta execução.

Entrada e preparação: P1 com nome = ""; token válido. Passos: Enviar POST /api/events com P1 alterando nome para string vazia. Esperado: 400; message = O campo nome é obrigatório.

## CT-018 Consultar eventos pela API

Tipo: API. Situação: Aprovado nesta execução.

Entrada e preparação: Sem corpo; token válido; evento criado pelo CT-016. Passos: Após CT-016, enviar GET /api/events. Esperado: 200 e array JSON de eventos.

## CT-019 Editar evento pela API

Tipo: API. Situação: Aprovado nesta execução.

Entrada e preparação: P2 no Postman; no Supertest, P1 com nome Feira Atualizada. Token válido e ID do CT-016. Passos: Enviar PUT /api/events/{id} com o corpo de atualização da ferramenta utilizada. Esperado: 200 e nome atualizado: Feira de Tecnologia Atualizada no Postman; Feira Atualizada no Supertest.

## CT-020 Excluir evento pela API

Tipo: API. Situação: Aprovado nesta execução.

Entrada e preparação: Sem corpo; token válido; eventId capturado no CT-016. Passos: Enviar DELETE /api/events/{{eventId}} após CT-019. Esperado: 200 e mensagem de exclusão; Supertest também consulta o ID removido e exige 404.

## CT-021 Consultar evento inexistente

Tipo: API. Situação: Aprovado nesta execução.

Entrada e preparação: Sem corpo; token válido. Passos: Enviar GET /api/events/999999 com ID inexistente. Esperado: 404; message = Evento não encontrado.

## CT-022 Login pela API com credenciais válidas

Tipo: API. Situação: Aprovado nesta execução.

Entrada e preparação: {"email":"usuario@email.com","senha":"123456"} Passos: Enviar POST /api/login com JSON de credenciais. Esperado: 200; token em formato de string.

## CT-023 Login pela API com credenciais inválidas

Tipo: API. Situação: Aprovado nesta execução.

Entrada e preparação: {"email":"usuario@email.com","senha":"senhaerrada"} Passos: Enviar POST /api/login com senha incorreta. Esperado: 401; message contém Credenciais inválidas.

## CT-024 Validação de nome válido do evento

Tipo: Unitário. Situação: Aprovado nesta execução.

Entrada e preparação: Feira de Tecnologia Passos: Executar função de validação com nome preenchido. Esperado: Função considera o nome válido.

## CT-025 Evento completo válido

Tipo: Unitário. Situação: aprovado nesta execução.

Entrada e execução: P1; executar validateEvent(P1). Esperado: {valid: true, errors: []}.

## CT-026 Limites do horário

Tipo: Unitário. Situação: aprovado nesta execução.

Entrada e execução: isValidTime com 00:00 e 23:59. Esperado: true em ambos.

## CT-027 Horários inválidos

Tipo: Unitário. Situação: aprovado nesta execução.

Entrada e execução: isValidTime com 24:00, 19:60, 9:00, 99:99 e string vazia. Esperado: false em todos.

## CT-028 Status permitidos

Tipo: Unitário. Situação: aprovado nesta execução.

Entrada e execução: isValidStatus com Ativo, Inativo e Concluído. Esperado: true em todos.

## CT-029 Status desconhecido

Tipo: Unitário. Situação: aprovado nesta execução.

Entrada e execução: isValidStatus com Inventado. Esperado: false.

## CT-030 Formato de credenciais válido

Tipo: Unitário. Situação: aprovado nesta execução.

Entrada e execução: validateCredentials com usuario@email.com e 123456 como strings. Esperado: true; não verifica senha no banco.

## CT-031 Credenciais malformadas

Tipo: Unitário. Situação: aprovado nesta execução.

Entrada e execução: validateCredentials com e-mail vazio, e-mail usuario, senha vazia e senha numérica 123456. Esperado: false em todos.

## CT-032 Ano bissexto

Tipo: Unitário. Situação: aprovado nesta execução.

Entrada e execução: isValidDateString com 2028-02-29 e 2026-02-29. Esperado: true para 2028 e false para 2026.

## CT-033 Vagas zero e fracionadas

Tipo: Unitário. Situação: aprovado nesta execução.

Entrada e execução: isValidCapacity com 0 e 1.5. Esperado: false em ambos.

## CT-034 Regras integradas de horário e status

Tipo: Unitário. Situação: aprovado nesta execução.

Entrada e execução: validateEvent com nome Feira, data 2026-10-25, horário 99:99, local Brasília, vagas 100, status Inventado. Esperado: valid = false e dois erros.

## CT-035 API rejeita horário inválido

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: POST /api/events com P1 alterando horario para 99:99; token válido. Esperado: HTTP 400.

## CT-036 API rejeita status inválido

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: POST /api/events com P1 alterando status para Inventado; token válido. Esperado: HTTP 400.

## CT-037 API sem autenticação

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: GET /api/events sem Authorization e sem corpo. Esperado: HTTP 401.

## CT-038 Login sem campos

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: POST /api/login com corpo {}. Esperado: HTTP 400.

## CT-039 Usuário inexistente

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: POST /api/login com {"email":"x@x.com","senha":"123456"}. Esperado: HTTP 401 e acesso negado.

## CT-040 Token inválido

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: GET /api/events com Authorization: Bearer token.falso.aqui. Esperado: HTTP 401.

## CT-041 API rejeita vagas zero ou negativas

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: POST /api/events com P1 alterando vagas para 0 e depois -10, com token válido. Esperado: HTTP 400 em ambas as tentativas.

## CT-042 API rejeita data inexistente

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: POST /api/events com P1 alterando data para 2026-02-30, com token válido. Esperado: HTTP 400.

## CT-043 API rejeita vagas fracionadas

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: POST /api/events com P1 alterando vagas para 10.5, com token válido. Esperado: HTTP 400.

## CT-044 Consulta de evento por ID

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: Após CT-016, GET /api/events/{id} com o ID retornado pelo cadastro e token válido. Esperado: HTTP 200 e id do corpo igual ao id solicitado.

## CT-045 Rota inexistente

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: GET /api/nao-existe, sem corpo. Esperado: HTTP 404 e mensagem no corpo JSON.

## CT-046 Nome numérico

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: POST /api/events com P1 alterando nome para 123, com token válido. Esperado: HTTP 400, sem erro interno.

## CT-047 Descrição nula

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: POST /api/events com P1 alterando descricao para null, com token válido. Esperado: HTTP 400; omitir descrição ou usar string vazia continua permitido.

## CT-048 Senha em formato de objeto

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: POST /api/login com {"email":"usuario@email.com","senha":{"a":1}}. Esperado: HTTP 400.

## CT-049 JSON malformado

Tipo: API. Situação: aprovado nesta execução.

Entrada e execução: POST /api/login, Content-Type application/json, corpo literal incompleto {"email":. Esperado: HTTP 400, Content-Type JSON e mensagem JSON inválido..

## Regressões complementares

REG-001 autentica e verifica o painel; REG-002 cadastra evento e verifica o cartão; REG-003 cadastra, edita local para Centro de Convenções Ulysses Guimarães e horário para 20:00, verificando o novo local; REG-004 cadastra, confirma exclusão e verifica ausência do cartão. Todos usam a conta de demonstração e dados equivalentes a P1, com nomes únicos. Implementados em regressao.cy.js; aprovados conforme resultado informado pelo grupo. A gravação disponibilizada não mostra o resumo dessa suite.

# 6 Execução e evidências

A execução automatizada foi realizada em ambiente Linux, Node.js 24.19.0. Jest executou 14 testes unitários e 23 testes de API com Supertest. Newman executou a coleção Postman contra o servidor real. Todos utilizam o código desta entrega. Para a API, o servidor utilizou DB_PATH=:memory:, evitando alterações no banco original. A persistência foi testada durante a vida desse processo; recuperação após reinício não foi avaliada. A reprodução no Windows utiliza o banco SQLite local.

| Conjunto | Executados | Aprovados | Fonte |

| --- | --- | --- | --- |

| Unitários CT | 14 | 14 | Jest |

| API CT | 23 | 23 | Jest |

| Interface CT | 12 | 12 | Grupo; vídeo parcial |

| Total CT | 49 | 49 | Consolidado |

| REG adicionais | 4 | 4 | Grupo |

| Health check adicional | 1 | 1 | Newman |

Segundo a execução informada pelo grupo, os 49 CT foram executados e aprovados (100%), além das quatro regressões. Os relatórios Jest comprovam 37 CT; o trecho final do vídeo mostra oito CT de interface aprovados. Os quatro CT de eventos.cy.js e quatro REG constam do resultado informado pelo grupo. Newman executou 12 requisições e 21 asserções sem falhas, repetindo 11 CT já cobertos por Supertest e adicionando um health check. As repetições não são contadas como novos casos.

Evidências incluídas: evidencias/jest-completo.log e jest-completo.json; evidencias/newman.log, newman.json e newman.xml; evidencias/bug-antes.json; evidencias/RESULTADOS.md e evidencias/cypress-execucao.md. O JSON do Newman possui tokens removidos para compartilhamento. Vídeo da execução: https://canva.link/fp9ne7crlv6ydrr (slide 10).

## Resumo registrado pelo Jest

Test Suites: 3 passed, 3 total
Tests: 37 passed, 37 total
Snapshots: 0 total

## Resumo registrado pelo Newman

Requests: 12 executed, 0 failed
Assertions: 21 executed, 0 failed
Iterations: 1 executed, 0 failed

Cypress foi executado posteriormente no Windows pelo grupo. A gravação disponível no slide 10 mostra Cypress 14.5.4, Electron 130 e Node.js 24.21.0, com oito testes aprovados, zero falhas e zero pendentes em complementares.cy.js. O vídeo termina no início de eventos.cy.js. Os arquivos XML da execução completa não integram esta versão do pacote; o registro textual identifica a fonte de cada resultado.

# 7 Falhas identificadas e correções

| Identificação | Constatação e tratamento |

| --- | --- |

| BUG-01 Horário e status | Reproduzido no código original: horário 99:99 e status Inventado eram aceitos por validateEvent. Foram adicionadas regras de formato e enumeração. CT-034, CT-035 e CT-036 aprovados após a correção. |

| BUG-02 Mensagem antiga | Ocorrência descrita na Parte 01: mensagem de sucesso persistia durante cadastro inválido. Adicionada limpeza ao editar o formulário ou ocorrer validação nativa. Verificação visual ainda pendente. |

| AUT-01 Login duplicado | A Parte 01 registrou duplicação ao usar type() sobre e-mail preenchido. A versão recebida já usa clear().type(). Não foi uma falha novamente reproduzida nesta execução. |

| BUG-03 Tipos inesperados | Os testes incorporados verificam nome numérico, descrição nula e senha como objeto. Nesta versão, CT-046 a CT-048 retornam 400, sem erro interno. |

| BUG-04 JSON malformado | Adicionado tratamento para erro de parsing do Express. CT-049 confirma resposta 400 em JSON. |

| ENV-01 Cypress | Falha de instalação no ambiente inicial. A execução foi realizada posteriormente no Windows do grupo; vídeo disponível na apresentação. |

A data passada não foi considerada defeito: os requisitos fornecidos não proíbem registrar eventos anteriores. A descrição, quando fornecida, deve ser texto; null é rejeitado com HTTP 400. Os testes importados tiveram seus IDs remapeados para evitar conflitos com os casos existentes.

A validação de credenciais passou a rejeitar campos com tipos incorretos ou e-mail malformado antes da consulta e comparação de senha. Os casos CT-030 e CT-031 verificam o formato; CT-022 e CT-023 verificam a autenticação real.

# 8 Conclusão e lições aprendidas

Os relatórios automáticos confirmam a aprovação dos 14 testes unitários e 23 de API. O grupo informou também aprovação dos 16 testes Cypress. Com base nesse resultado informado, os critérios numéricos de saída foram atingidos: 49 CT aprovados e quatro regressões aprovadas. A evidência disponível em vídeo comprova parcialmente a execução Cypress; os XML da execução completa devem acompanhar o repositório para permitir a conferência independente do total.

A revisão mostrou que validar apenas campos obrigatórios não garante regras de negócio corretas. Também mostrou a importância de relacionar cada teste ao seu caso, preparar dados reproduzíveis, diferenciar falhas da aplicação de problemas de ambiente e registrar resultados reais. O quinto teste unitário original foi identificado como CT-025.

A reprodução dos testes está descrita em PASSO_A_PASSO.md. A execução de interface foi gravada pelo grupo e disponibilizada na apresentação. A distinção entre resultados registrados automaticamente, resultados visíveis no vídeo e resultados informados permite manter a rastreabilidade da entrega.

# 9 Repositório e organização da entrega

https://github.com/JaymeNeto2019/sistema-gerenciamento-eventos

src contém backend; public contém interface; tests contém Jest e Supertest; postman contém a coleção API; cypress/e2e contém interface e regressão; evidencias contém relatórios e referência ao vídeo; docs contém este relatório em PDF e DOCX. PASSO_A_PASSO.md apresenta os comandos de reprodução.
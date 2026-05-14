# Matriz de Rastreabilidade de Requisitos (RTM)

Este documento consolida a Matriz de Rastreabilidade de Requisitos (RTM), o Mapa de Evidencias, o Calculo do Indice de Rastreabilidade e a Analise de Gaps do projeto web PPGENF Insight Dash. O objetivo e garantir rastreabilidade entre requisitos, implementacao e testes, apoiando auditorias e governanca de QA.

## Escopo e Premissas

- Base: requisitos fornecidos (RF e RNF) e estado atual do codigo.
- Status permitido: Concluido, Em teste, Em dev, Nao iniciado.
- IDs de casos de teste: ficticios, criados para rastreabilidade inicial.
- Evidencias: referenciam implementacao no repositorio local (na ausencia de commits/prints/logs formais).

## 1. Matriz de Rastreabilidade (RTM)

| ID Req | Descricao do Requisito | Tipo | Modulo/Componente do Site | ID do Caso de Teste | Status da Implementacao |
|---|---|---|---|---|---|
| RF-01 | Dashboard principal com KPIs (total de alunos, orientacoes em andamento, orientacoes concluidas, media de tempo de conclusao, conclusao no prazo) | Funcional | [src/pages/Index.tsx](src/pages/Index.tsx#L1-L200)<br>[src/components/dashboard/KPICard.tsx](src/components/dashboard/KPICard.tsx#L1-L30) | CT-001 | Concluido |
| RF-02 | Filtros por ano, orientador, tipo de periodo (ano/bienio/quadrienio) e periodo selecionado | Funcional | [src/components/dashboard/Filters.tsx](src/components/dashboard/Filters.tsx#L1-L120)<br>[src/pages/Index.tsx](src/pages/Index.tsx#L1-L200) | CT-002 | Concluido |
| RF-03 | Exportacao dos dados filtrados para Excel (.xlsx) | Funcional | [src/components/dashboard/ExportButton.tsx](src/components/dashboard/ExportButton.tsx#L1-L120) | CT-003 | Concluido |
| RF-04 | Exportacao dos dados filtrados para CSV (.csv) | Funcional | [src/components/dashboard/ExportButton.tsx](src/components/dashboard/ExportButton.tsx#L1-L120) | CT-004 | Concluido |
| RF-05 | Visualizacao de grafico de taxa de conclusao (gauge) | Funcional | [src/components/dashboard/GaugeChart.tsx](src/components/dashboard/GaugeChart.tsx#L1-L120) | CT-005 | Concluido |
| RF-06 | Visualizacao de grafico de distribuicao por linha de pesquisa | Funcional | [src/components/dashboard/BarChart.tsx](src/components/dashboard/BarChart.tsx#L1-L120)<br>[src/pages/Index.tsx](src/pages/Index.tsx#L1-L200) | CT-006 | Concluido |
| RF-07 | Visualizacao de grafico de orientandos por professor (Top 10) | Funcional | [src/components/dashboard/BarChart.tsx](src/components/dashboard/BarChart.tsx#L1-L120)<br>[src/pages/Index.tsx](src/pages/Index.tsx#L1-L200) | CT-007 | Concluido |
| RF-08 | Visualizacao de grafico de media de meses para conclusao por ano, com media global | Funcional | [src/components/dashboard/BarChart.tsx](src/components/dashboard/BarChart.tsx#L1-L120)<br>[src/pages/Index.tsx](src/pages/Index.tsx#L1-L200) | CT-008 | Concluido |
| RF-09 | Visualizacao de distribuicao por quadrienio (total, concluidos, em andamento) | Funcional | [src/components/dashboard/QuadrienniumChart.tsx](src/components/dashboard/QuadrienniumChart.tsx#L1-L200) | CT-009 | Concluido |
| RF-10 | Lista de alunos com detalhes e indicacao de status (em andamento/defesa) | Funcional | [src/components/dashboard/StudentList.tsx](src/components/dashboard/StudentList.tsx#L1-L120) | CT-010 | Concluido |
| RF-11 | Aba "Analise do Quadrienio" com indicadores e graficos do processo seletivo, taxas e fluxo | Funcional | [src/components/dashboard/CriticalAnalysisTab.tsx](src/components/dashboard/CriticalAnalysisTab.tsx#L1-L260) | CT-011 | Concluido |
| RF-12 | Filtro por ano na aba de analise critica | Funcional | [src/components/dashboard/CriticalAnalysisTab.tsx](src/components/dashboard/CriticalAnalysisTab.tsx#L1-L260) | CT-012 | Concluido |
| RF-13 | Aba "Cotas" com KPIs e graficos de distribuicao de vagas e evolucao por ano | Funcional | [src/components/dashboard/CotasTab.tsx](src/components/dashboard/CotasTab.tsx#L1-L260) | CT-013 | Concluido |
| RF-14 | Aba "Idade e Sexo" com analise demografica por sexo e faixa etaria, com filtro por ano | Funcional | [src/components/dashboard/CotasTab.tsx](src/components/dashboard/CotasTab.tsx#L1-L260)<br>[src/data/demographicData.ts](src/data/demographicData.ts#L1-L120) | CT-014 | Concluido |
| RF-15 | Roteamento SPA com pagina 404 para rotas inexistentes | Funcional | [src/App.tsx](src/App.tsx#L1-L27)<br>[src/pages/NotFound.tsx](src/pages/NotFound.tsx#L1-L24) | CT-015 | Concluido |
| RNF-01 | Aplicacao SPA em React 18 com roteamento client-side | Nao Funcional | [src/App.tsx](src/App.tsx#L1-L27) | CT-016 | Concluido |
| RNF-02 | Build e desenvolvimento com Vite + TypeScript + SWC | Nao Funcional | [vite.config.ts](vite.config.ts#L1-L20)<br>[package.json](package.json#L1-L80) | CT-017 | Concluido |
| RNF-03 | UI baseada em Tailwind CSS com design system em HSL | Nao Funcional | [tailwind.config.ts](tailwind.config.ts#L1-L200)<br>[src/index.css](src/index.css#L1-L120) | CT-018 | Concluido |
| RNF-04 | Layout responsivo mobile-first com breakpoints e grid adaptativo | Nao Funcional | [src/App.css](src/App.css#L1-L120) | CT-019 | Concluido |
| RNF-05 | Componentes de interface baseados em Radix UI/shadcn | Nao Funcional | [package.json](package.json#L1-L80) | CT-020 | Concluido |
| RNF-06 | Graficos responsivos com Recharts | Nao Funcional | [package.json](package.json#L1-L80)<br>[src/components/dashboard/BarChart.tsx](src/components/dashboard/BarChart.tsx#L1-L120) | CT-021 | Concluido |
| RNF-07 | Dados carregados localmente (sem backend/API) a partir de arquivos TS | Nao Funcional | [src/data/academicData.ts](src/data/academicData.ts#L1-L40)<br>[src/data/selectiveProcessData.ts](src/data/selectiveProcessData.ts#L1-L120)<br>[src/data/quotaData.ts](src/data/quotaData.ts#L1-L120)<br>[src/data/demographicData.ts](src/data/demographicData.ts#L1-L120) | CT-022 | Concluido |
| RNF-08 | Interacoes touch-friendly e prevencao de zoom em inputs no mobile | Nao Funcional | [src/App.css](src/App.css#L1-L120) | CT-023 | Concluido |
| RNF-09 | Suporte a preferencia de movimento reduzido (prefers-reduced-motion) | Nao Funcional | [src/App.css](src/App.css#L1-L120) | CT-024 | Concluido |
| RNF-10 | Servidor de desenvolvimento configurado para porta 8080 | Nao Funcional | [vite.config.ts](vite.config.ts#L1-L20) | CT-025 | Concluido |

## 2. Mapa de Evidencias

Observacao: como nao foram fornecidos IDs de commit, prints de homologacao ou logs de deploy, a evidencia registrada e a implementacao no repositorio local, com links para os arquivos onde a funcionalidade esta implementada. Recomenda-se formalizar evidencias (print, logs e IDs de commit) para auditoria.

| ID Req | Artefato de Origem | Evidencia de Entrega | Local no codigo | Responsavel |
|---|---|---|---|---|
| RF-01 | Codigo-fonte | Implementacao no repositorio local (dashboard e KPIs) | [src/pages/Index.tsx](src/pages/Index.tsx#L1-L200)<br>[src/components/dashboard/KPICard.tsx](src/components/dashboard/KPICard.tsx#L1-L30) | Equipe dev |
| RF-02 | Codigo-fonte | Implementacao no repositorio local (filtros) | [src/components/dashboard/Filters.tsx](src/components/dashboard/Filters.tsx#L1-L120)<br>[src/pages/Index.tsx](src/pages/Index.tsx#L1-L200) | Equipe dev |
| RF-03 | Codigo-fonte | Implementacao no repositorio local (exportacao XLSX) | [src/components/dashboard/ExportButton.tsx](src/components/dashboard/ExportButton.tsx#L1-L120) | Equipe dev |
| RF-04 | Codigo-fonte | Implementacao no repositorio local (exportacao CSV) | [src/components/dashboard/ExportButton.tsx](src/components/dashboard/ExportButton.tsx#L1-L120) | Equipe dev |
| RF-05 | Codigo-fonte | Implementacao no repositorio local (gauge) | [src/components/dashboard/GaugeChart.tsx](src/components/dashboard/GaugeChart.tsx#L1-L120) | Equipe dev |
| RF-06 | Codigo-fonte | Implementacao no repositorio local (grafico por linha) | [src/components/dashboard/BarChart.tsx](src/components/dashboard/BarChart.tsx#L1-L120)<br>[src/pages/Index.tsx](src/pages/Index.tsx#L1-L200) | Equipe dev |
| RF-07 | Codigo-fonte | Implementacao no repositorio local (top 10 orientandos) | [src/components/dashboard/BarChart.tsx](src/components/dashboard/BarChart.tsx#L1-L120)<br>[src/pages/Index.tsx](src/pages/Index.tsx#L1-L200) | Equipe dev |
| RF-08 | Codigo-fonte | Implementacao no repositorio local (media global) | [src/components/dashboard/BarChart.tsx](src/components/dashboard/BarChart.tsx#L1-L120)<br>[src/pages/Index.tsx](src/pages/Index.tsx#L1-L200) | Equipe dev |
| RF-09 | Codigo-fonte | Implementacao no repositorio local (quadrienio) | [src/components/dashboard/QuadrienniumChart.tsx](src/components/dashboard/QuadrienniumChart.tsx#L1-L200) | Equipe dev |
| RF-10 | Codigo-fonte | Implementacao no repositorio local (lista de alunos) | [src/components/dashboard/StudentList.tsx](src/components/dashboard/StudentList.tsx#L1-L120) | Equipe dev |
| RF-11 | Codigo-fonte | Implementacao no repositorio local (analise do quadrienio) | [src/components/dashboard/CriticalAnalysisTab.tsx](src/components/dashboard/CriticalAnalysisTab.tsx#L1-L260) | Equipe dev |
| RF-12 | Codigo-fonte | Implementacao no repositorio local (filtro por ano) | [src/components/dashboard/CriticalAnalysisTab.tsx](src/components/dashboard/CriticalAnalysisTab.tsx#L1-L260) | Equipe dev |
| RF-13 | Codigo-fonte | Implementacao no repositorio local (cotas) | [src/components/dashboard/CotasTab.tsx](src/components/dashboard/CotasTab.tsx#L1-L260) | Equipe dev |
| RF-14 | Codigo-fonte | Implementacao no repositorio local (idade e sexo) | [src/components/dashboard/CotasTab.tsx](src/components/dashboard/CotasTab.tsx#L1-L260)<br>[src/data/demographicData.ts](src/data/demographicData.ts#L1-L120) | Equipe dev |
| RF-15 | Codigo-fonte | Implementacao no repositorio local (rota 404) | [src/App.tsx](src/App.tsx#L1-L27)<br>[src/pages/NotFound.tsx](src/pages/NotFound.tsx#L1-L24) | Equipe dev |
| RNF-01 | Codigo-fonte | Implementacao no repositorio local (router SPA) | [src/App.tsx](src/App.tsx#L1-L27) | Equipe dev |
| RNF-02 | Configuracao | Implementacao no repositorio local (Vite/TS/SWC) | [vite.config.ts](vite.config.ts#L1-L20)<br>[package.json](package.json#L1-L80) | Equipe dev |
| RNF-03 | Configuracao | Implementacao no repositorio local (Tailwind/HSL) | [tailwind.config.ts](tailwind.config.ts#L1-L200)<br>[src/index.css](src/index.css#L1-L120) | Equipe dev |
| RNF-04 | Estilos | Implementacao no repositorio local (mobile-first) | [src/App.css](src/App.css#L1-L120) | Equipe dev |
| RNF-05 | Codigo-fonte | Implementacao no repositorio local (Radix/shadcn) | [package.json](package.json#L1-L80) | Equipe dev |
| RNF-06 | Codigo-fonte | Implementacao no repositorio local (Recharts) | [package.json](package.json#L1-L80)<br>[src/components/dashboard/BarChart.tsx](src/components/dashboard/BarChart.tsx#L1-L120) | Equipe dev |
| RNF-07 | Codigo-fonte | Implementacao no repositorio local (dados locais TS) | [src/data/academicData.ts](src/data/academicData.ts#L1-L40)<br>[src/data/selectiveProcessData.ts](src/data/selectiveProcessData.ts#L1-L120)<br>[src/data/quotaData.ts](src/data/quotaData.ts#L1-L120)<br>[src/data/demographicData.ts](src/data/demographicData.ts#L1-L120) | Equipe dev |
| RNF-08 | Estilos | Implementacao no repositorio local (touch-friendly) | [src/App.css](src/App.css#L1-L120) | Equipe dev |
| RNF-09 | Estilos | Implementacao no repositorio local (reduced-motion) | [src/App.css](src/App.css#L1-L120) | Equipe dev |
| RNF-10 | Configuracao | Implementacao no repositorio local (porta 8080) | [vite.config.ts](vite.config.ts#L1-L20) | Equipe dev |

## 3. Calculo do Indice de Rastreabilidade

- Total de requisitos mapeados: 25
- Requisitos rastreaveis (com caso de teste ou evidencia associada): 25
- Calculo: (25 / 25) x 100 = 100%

Analise: a cobertura esta saudavel em termos de rastreabilidade basica. Contudo, existe risco de auditoria por ausencia de evidencias formais (prints, logs, IDs de commit e registros de execucao de testes). Recomenda-se formalizar as evidencias por requisito.

## 4. Analise de Gaps

- Nenhum requisito orfao identificado: todos possuem caso de teste e evidencia basica.
- Acao corretiva imediata (preventiva): registrar evidencias formais por requisito (print de homologacao, IDs de commit, logs de deploy e execucoes de testes com output).

## 5. Recomendacoes de QA (Proximos Passos)

1. Criar uma pasta de evidencias (ex: docs/evidencias) e salvar prints com nomeacao padrao (REQ_ID_data).
2. Executar testes manuais guiados pelos IDs CT e registrar os resultados em uma planilha de execucao.
3. Gerar logs de build e deploy e associar ao requisito RNF-02 e RNF-10.
4. Registrar commits por requisito quando houver ajustes ou correcoes, associando o ID no mapa de evidencias.

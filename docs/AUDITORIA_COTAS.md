# Auditoria — Cotistas do PPGENF/UFMA (2020–2026)

**Data da auditoria:** 12/11/2026
**Responsável técnico:** Emanuel Silva
**Motivo:** o painel exibia 44 "vagas de cotas" (2020–2025), número sem lastro documental que estava sendo citado em documentos oficiais do programa como se fosse o total de aprovados/titulados cotistas.

---

## 1. Fontes verificadas

| Documento | Conteúdo usado |
|---|---|
| Resultados finais oficiais 2020–2026 (pasta `Resultado_Final_Ingressantes/pdfs_finais`) | Listas de ampla concorrência, ações afirmativas e servidores TAE |
| `FORMULARIOS DE INSCRICAO SELETIVO DO ANO 2024.pdf` (SIGAA) | Categoria declarada por candidato (95 formulários) |
| `LISTA DE APROVADOS DO SELETIVO DO ANO 2024.pdf` (SIGAA) | 16 candidatos com status "CANDIDATO APROVADO" |
| `PPGENF -- DADOS E TITULO DA PESQUISA--2011-2026.pdf` | Turmas, nomes e defesas (não contém informação de cota) |
| `src/data/academicData.ts` | Ingresso e defesa (para confirmar matrícula e titulação) |

---

## 2. Resultado por turma

| Turma (ingresso) | Seleção | Edital | Ações afirmativas | Servidor UFMA | Total |
|---:|---:|---|---:|---:|---:|
| 2020 | 2019 | — | 0 | 0 | 0 |
| 2021 | 2020 | 25/2020 | 0 | 0 | 0 |
| 2022 | 2021 | 60/2021 | 0 | 0 | 0 |
| 2023 | 2022 | 48/2022 | 0 | 0 | 0 |
| 2024 | 2023 | 51/2023 | 2 | 1 | **3** |
| 2025 | 2024 | 55/2024 | 2 | 0 | **2** |
| 2026 | 2025 | 25/2025 | 9 | 1 | **10** |
| **Total** | | | **13** | **2** | **15** |

> A política de cotas (Resolução CONSEPE nº 3058/2023) passou a valer na seleção de 2023 (ingresso 2024). Nas seleções de 2020, 2021 e 2022 não há listas de ações afirmativas nos resultados finais.

---

## 3. Lista de registros (sem nomes)

> Nomes suprimidos para proteger dados pessoais sensíveis (LGPD). Cada registro é identificado por um código; os dados de 2026 já vêm anonimizados pelo próprio edital.

### Turma 2024 (seleção 2023)

| Identificação | Categoria | Situação | Ingressou | Titulado |
|---|---|---|---|---|
| Cotista 01 | Negras/Pardas | Classificada | Sim | **Sim** |
| Cotista 02 | Negras/Pardas | Classificada | Sim | Não (em andamento) |
| Cotista 03 | Servidor UFMA | Classificada | Sim | **Sim** |

### Turma 2025 (seleção 2024)

| Identificação | Categoria | Situação | Ingressou | Titulado |
|---|---|---|---|---|
| Cotista 04 | Negras/Pardas | Classificado | Não consta na lista de alunos | — |
| Cotista 05 | Trans | Classificado | Sim | Não (em andamento) |

### Turma 2026 (seleção 2025 — resultado anonimizado)

| ID | Categoria | Situação |
|---|---|---|
| 21327 | Negras/Pardas | Lista de ações afirmativas |
| 21356 | Negras/Pardas | Lista de ações afirmativas |
| 21371 | Negras/Pardas | Lista de ações afirmativas |
| 21374 | Negras/Pardas | Lista de ações afirmativas |
| 21366 | Negras/Pardas | Lista de ações afirmativas |
| 21381 | Negras/Pardas | Lista de ações afirmativas |
| 20926 | Negras/Pardas (também baixa renda/trans) | Lista de ações afirmativas |
| 21325 | Baixa renda | Lista de ações afirmativas |
| 21345 | Baixa renda | Lista de ações afirmativas |
| 20894 | Servidor UFMA | Lista de servidores TAE |

> O edital 25/2025 reserva 4 vagas de ações afirmativas + 3 de servidor. O resultado final lista 10 pessoas; nem todas necessariamente ocuparam vaga.

---

## 4. Declararam cota, mas foram classificados pela ampla (Turma 2025)

Pela regra dos editais, quem é classificado na ampla ocupa essa vaga e libera a vaga de cota. Por isso não entram no total de cotistas.

| Identificação | Cota declarada | Situação |
|---|---|---|
| Candidato ampla 01 | Indígenas/Quilombolas | Classificada na ampla |
| Candidato ampla 02 | Negras/Pardas | Classificado na ampla |
| Candidato ampla 03 | Negras/Pardas | Classificada na ampla (não consta na lista de alunos) |
| Candidato ampla 04 | Baixa renda | Classificado na ampla |

---

## 5. Números-chave

- **15** pessoas listadas em ações afirmativas/servidor (2024–2026).
- **13** em ações afirmativas (excluindo servidor UFMA).
- **4** com ingresso confirmado na base acadêmica (3 na Turma 2024 + 1 na Turma 2025).
- **2 titulados** (1 ação afirmativa + 1 servidor UFMA): Cotista 01 e Cotista 03.
- **2 em andamento**: Cotista 02 e Cotista 05.
- **2026**: 10 listados, mas ingresso/titulação não confirmáveis (resultado anonimizado por LGPD).

---

## 6. O que estava errado no painel

A aba **Cotas** exibia, para 2020–2025:

- **44 "vagas de cotas"** (45% de 98 vagas) — soma de uma distribuição por tipo que não corresponde a nenhum documento;
- Cotas em **2020, 2021 e 2022**, quando a política de cotas ainda não existia na seleção;
- Linha de 2025 com **18 vagas** e **3 PNG + 1 PCD + 1 PIQ + 3 STA**, quando o seletivo de 2024 teve **16 aprovados** e **2 cotistas** (1 negra + 1 trans);
- Gráfico de "inscritos por cota" com **83 ampla / 9 negras / 1 trans / 0 PCD / 0 PIQ** (total 93), quando o seletivo de 2024 teve **95 inscritos** com distribuição diferente.

Esses números não tinham fonte e foram **removidos**. A aba agora mostra a série 2020–2026 com as listas nominais oficiais.

---

## 7. Recomendação para os documentos oficiais

Usar:

> "Entre 2024 e 2026, o PPGENF registrou **15 pessoas** em vagas de ações afirmativas/servidor, sendo **13** em ações afirmativas. Até o momento, **2 concluíram o mestrado** (1 por ação afirmativa e 1 por vaga de servidor)."

Não usar o número **44**: ele se referia a uma estimativa de vagas por cota, não a cotistas aprovados ou titulados.

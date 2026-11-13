// Cotistas do PPGENF/UFMA — dados verificados nos resultados finais oficiais (2020-2026)
//
// Fontes (PDFs oficiais das seleções, pasta "Resultado_Final_Ingressantes/pdfs_finais"):
//  - 2020_12_RESULTADO_FINAL... (Edital 25/2020 — Turma 2021)
//  - 2021_12_EDITAL_AGEUFMA_602021... (Edital 60/2021 — Turma 2022)
//  - 2022_11_RESULTADO_FINAL... (Edital 48/2022 — Turma 2023)
//  - 2023_11_RESULTADO_FINAL... (Edital 51/2023 — Turma 2024)
//  - 2024_12_DIVULGACAO_DA_NOTA_DO_RESULTADO_FINAL... (Edital 55/2024 — Turma 2025)
//  - 2026_1_DIVULGACAO_DA_NOTA_DO_RESULTADO_FINAL... (Edital 25/2025 — Turma 2026)
//
// IMPORTANTE:
//  - A política de cotas (Resolução CONSEPE nº 3058/2023) passou a valer na seleção
//    de 2023 (ingresso 2024). Nas seleções de 2020, 2021 e 2022 não há listas de
//    ações afirmativas nos resultados finais.
//  - Quem declarou cota, mas foi classificado na ampla concorrência, NÃO ocupa vaga
//    de cota (regra expressa nos editais). Esses casos aparecem separados em
//    "quotaDeclaredButBroad".
//  - Na seleção de 2025 (Turma 2026) o resultado final é anonimizado por LGPD:
//    os candidatos aparecem apenas por número de inscrição.
//  - "Titulado" = defesa registrada na base acadêmica do site (academicData.ts).

export type QuotaCategoria =
  | "Negras/Pardas"
  | "Indígenas/Quilombolas"
  | "Trans"
  | "Baixa renda"
  | "PcD"
  | "Servidor UFMA";

export interface QuotaEntry {
  turma: number; // ano de ingresso
  anoSeletiva: number;
  nome: string; // código anônimo ("Cotista 01") ou ID quando o edital já é anonimizado
  categoria: QuotaCategoria;
  situacao: string; // situação impressa no resultado final
  ingressou: boolean | null; // consta na base acadêmica do site?
  titulado: boolean | null; // defesa registrada?
  observacao?: string;
  fonte: string;
}

const F2023 = "Resultado final 2023 (Edital 51/2023)";
const F2024 = "Resultado final 2024 (Edital 55/2024)";
const F2025 = "Resultado final 2025 (Edital 25/2025)";

export const quotaEntries: QuotaEntry[] = [
  // ===== Turma 2024 (seleção 2023) =====
  {
    turma: 2024,
    anoSeletiva: 2023,
    nome: "Cotista 01",
    categoria: "Negras/Pardas",
    situacao: "Classificada",
    ingressou: true,
    titulado: true,
    observacao: "Titulado",
    fonte: F2023,
  },
  {
    turma: 2024,
    anoSeletiva: 2023,
    nome: "Cotista 02",
    categoria: "Negras/Pardas",
    situacao: "Classificada",
    ingressou: true,
    titulado: false,
    observacao: "Em andamento",
    fonte: F2023,
  },
  {
    turma: 2024,
    anoSeletiva: 2023,
    nome: "Cotista 03",
    categoria: "Servidor UFMA",
    situacao: "Classificada",
    ingressou: true,
    titulado: true,
    observacao: "Titulado",
    fonte: F2023,
  },

  // ===== Turma 2025 (seleção 2024) =====
  {
    turma: 2025,
    anoSeletiva: 2024,
    nome: "Cotista 04",
    categoria: "Negras/Pardas",
    situacao: "Classificado",
    ingressou: false,
    titulado: null,
    observacao: "Não consta na lista de alunos da Turma 15",
    fonte: F2024,
  },
  {
    turma: 2025,
    anoSeletiva: 2024,
    nome: "Cotista 05",
    categoria: "Trans",
    situacao: "Classificado",
    ingressou: true,
    titulado: false,
    observacao: "Em andamento",
    fonte: F2024,
  },

  // ===== Turma 2026 (seleção 2025 — resultado anonimizado) =====
  {
    turma: 2026,
    anoSeletiva: 2025,
    nome: "ID 21327",
    categoria: "Negras/Pardas",
    situacao: "Lista de ações afirmativas",
    ingressou: null,
    titulado: null,
    fonte: F2025,
  },
  {
    turma: 2026,
    anoSeletiva: 2025,
    nome: "ID 21356",
    categoria: "Negras/Pardas",
    situacao: "Lista de ações afirmativas",
    ingressou: null,
    titulado: null,
    fonte: F2025,
  },
  {
    turma: 2026,
    anoSeletiva: 2025,
    nome: "ID 21371",
    categoria: "Negras/Pardas",
    situacao: "Lista de ações afirmativas",
    ingressou: null,
    titulado: null,
    fonte: F2025,
  },
  {
    turma: 2026,
    anoSeletiva: 2025,
    nome: "ID 21374",
    categoria: "Negras/Pardas",
    situacao: "Lista de ações afirmativas",
    ingressou: null,
    titulado: null,
    fonte: F2025,
  },
  {
    turma: 2026,
    anoSeletiva: 2025,
    nome: "ID 21366",
    categoria: "Negras/Pardas",
    situacao: "Lista de ações afirmativas",
    ingressou: null,
    titulado: null,
    fonte: F2025,
  },
  {
    turma: 2026,
    anoSeletiva: 2025,
    nome: "ID 21381",
    categoria: "Negras/Pardas",
    situacao: "Lista de ações afirmativas",
    ingressou: null,
    titulado: null,
    fonte: F2025,
  },
  {
    turma: 2026,
    anoSeletiva: 2025,
    nome: "ID 20926",
    categoria: "Negras/Pardas",
    situacao: "Lista de ações afirmativas",
    ingressou: null,
    titulado: null,
    observacao: "Também listado em baixa renda/trans",
    fonte: F2025,
  },
  {
    turma: 2026,
    anoSeletiva: 2025,
    nome: "ID 21325",
    categoria: "Baixa renda",
    situacao: "Lista de ações afirmativas",
    ingressou: null,
    titulado: null,
    observacao: "Lista conjunta baixa renda/trans",
    fonte: F2025,
  },
  {
    turma: 2026,
    anoSeletiva: 2025,
    nome: "ID 21345",
    categoria: "Baixa renda",
    situacao: "Lista de ações afirmativas",
    ingressou: null,
    titulado: null,
    observacao: "Lista conjunta baixa renda/trans",
    fonte: F2025,
  },
  {
    turma: 2026,
    anoSeletiva: 2025,
    nome: "ID 20894",
    categoria: "Servidor UFMA",
    situacao: "Lista de servidores TAE",
    ingressou: null,
    titulado: null,
    fonte: F2025,
  },
];

// Declararam cota, mas foram classificados/ingressaram pela ampla concorrência.
// Não entram na contagem de cotistas (regra dos editais).
export interface BroadEntry {
  turma: number;
  anoSeletiva: number;
  nome: string;
  categoriaDeclarada: QuotaCategoria;
  ingressou: boolean | null;
  observacao: string;
}

export const quotaDeclaredButBroad: BroadEntry[] = [
  {
    turma: 2025,
    anoSeletiva: 2024,
    nome: "Candidato ampla 01",
    categoriaDeclarada: "Indígenas/Quilombolas",
    ingressou: true,
    observacao: "Classificada na vaga de ampla concorrência",
  },
  {
    turma: 2025,
    anoSeletiva: 2024,
    nome: "Candidato ampla 02",
    categoriaDeclarada: "Negras/Pardas",
    ingressou: true,
    observacao: "Classificado na vaga de ampla concorrência",
  },
  {
    turma: 2025,
    anoSeletiva: 2024,
    nome: "Candidato ampla 03",
    categoriaDeclarada: "Negras/Pardas",
    ingressou: false,
    observacao: "Classificada na vaga de ampla concorrência; não consta na lista de alunos",
  },
  {
    turma: 2025,
    anoSeletiva: 2024,
    nome: "Candidato ampla 04",
    categoriaDeclarada: "Baixa renda",
    ingressou: true,
    observacao: "Classificado na vaga de ampla concorrência",
  },
];

// Série por turma de ingresso. 2020-2023 = 0 (política de cotas começou em 2023/2024).
export const quotaByYear = [
  { turma: 2020, anoSeletiva: 2019, af: 0, servidor: 0, total: 0 },
  { turma: 2021, anoSeletiva: 2020, af: 0, servidor: 0, total: 0 },
  { turma: 2022, anoSeletiva: 2021, af: 0, servidor: 0, total: 0 },
  { turma: 2023, anoSeletiva: 2022, af: 0, servidor: 0, total: 0 },
  { turma: 2024, anoSeletiva: 2023, af: 2, servidor: 1, total: 3 },
  { turma: 2025, anoSeletiva: 2024, af: 2, servidor: 0, total: 2 },
  { turma: 2026, anoSeletiva: 2025, af: 9, servidor: 1, total: 10 },
];

export const getQuotaTotals = () => {
  const af = quotaEntries.filter(
    (e) => e.categoria !== "Servidor UFMA"
  ).length;
  const servidor = quotaEntries.filter(
    (e) => e.categoria === "Servidor UFMA"
  ).length;
  const total = quotaEntries.length;
  const titulados = quotaEntries.filter((e) => e.titulado === true).length;
  const tituladosAf = quotaEntries.filter(
    (e) => e.titulado === true && e.categoria !== "Servidor UFMA"
  ).length;
  const ingressaram = quotaEntries.filter((e) => e.ingressou === true).length;
  const emAndamento = quotaEntries.filter((e) => e.titulado === false).length;

  return {
    total,
    af,
    servidor,
    titulados,
    tituladosAf,
    ingressaram,
    emAndamento,
  };
};

export const getQuotaByCategory = () => {
  const map = new Map<string, number>();
  quotaEntries.forEach((e) => {
    map.set(e.categoria, (map.get(e.categoria) ?? 0) + 1);
  });
  return Array.from(map.entries()).map(([tipo, total]) => ({ tipo, total }));
};

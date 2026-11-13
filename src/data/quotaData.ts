// Dados verificados de cotas — Processo Seletivo 2024 (ingresso 2025, Turma 15)
//
// Fontes (documentos oficiais/SIGAA recebidos em 12/11/2026):
//  - FORMULÁRIOS DE INSCRIÇÃO SELETIVO DO ANO 2024.pdf
//    (campo "3. Categoria da vaga" de cada candidato)
//  - LISTA DE APROVADOS DO SELETIVO DO ANO 2024.pdf
//    (16 candidatos com status "CANDIDATO APROVADO")
//
// IMPORTANTE:
//  - Os números representam a CATEGORIA DECLARADA na inscrição.
//  - Candidato(a) que declarou cota, mas foi aprovado(a) na ampla concorrência,
//    deve ser contabilizado(a) como ampla. Sem as notas/classificação final não é
//    possível aplicar essa regra; por isso o painel usa a categoria declarada.
//  - A série histórica de cotas de 2020 a 2023 NÃO está disponível nos documentos
//    recebidos. Os números antigos (44 "vagas de cotas" e a distribuição por tipo)
//    não tinham lastro documental e foram removidos para não serem citados em
//    documentos oficiais do programa.

export interface QuotaCategory {
  tipo: string;
  inscritos: number;
  aprovados: number;
  cor: string;
}

export const seletivo2024 = {
  processo: "Seletivo 2024",
  ingresso: 2025,
  turma: 15,
  inscritos: 95,
  aprovados: 16,
  categorias: [
    { tipo: "Ampla concorrência", inscritos: 69, aprovados: 11, cor: "hsl(var(--primary))" },
    { tipo: "Negras/Pardas", inscritos: 8, aprovados: 1, cor: "hsl(200, 70%, 50%)" },
    { tipo: "Indígenas/Quilombolas", inscritos: 3, aprovados: 1, cor: "hsl(40, 80%, 50%)" },
    { tipo: "Trans", inscritos: 1, aprovados: 1, cor: "hsl(340, 70%, 50%)" },
    { tipo: "Baixa renda", inscritos: 2, aprovados: 1, cor: "hsl(160, 70%, 40%)" },
    { tipo: "Servidor UFMA", inscritos: 2, aprovados: 0, cor: "hsl(280, 70%, 60%)" },
    { tipo: "Sem informação", inscritos: 10, aprovados: 1, cor: "hsl(220, 10%, 55%)" },
  ] as QuotaCategory[],
};

// Categorias que caracterizam vaga de ação afirmativa/cota
const COTA_TIPOS = ["Negras/Pardas", "Indígenas/Quilombolas", "Trans", "Baixa renda", "Servidor UFMA"];

export const getQuotaCategories = (): QuotaCategory[] => seletivo2024.categorias;

export const getQuotaTotals = () => {
  const categorias = seletivo2024.categorias;
  const inscritos = categorias.reduce((sum, c) => sum + c.inscritos, 0);
  const aprovados = categorias.reduce((sum, c) => sum + c.aprovados, 0);
  const ampla = categorias
    .filter((c) => c.tipo === "Ampla concorrência")
    .reduce((sum, c) => sum + c.aprovados, 0);
  const semInformacao = categorias
    .filter((c) => c.tipo === "Sem informação")
    .reduce((sum, c) => sum + c.aprovados, 0);
  const cotistas = categorias
    .filter((c) => COTA_TIPOS.includes(c.tipo))
    .reduce((sum, c) => sum + c.aprovados, 0);

  return {
    inscritos,
    aprovados,
    ampla,
    cotistas,
    semInformacao,
    percentualCotas: aprovados > 0 ? (cotistas / aprovados) * 100 : 0,
    percentualAmpla: aprovados > 0 ? (ampla / aprovados) * 100 : 0,
    percentualSemInformacao: aprovados > 0 ? (semInformacao / aprovados) * 100 : 0,
  };
};

// Série para o gráfico de barras: inscritos x aprovados por categoria
export const getQuotaByCategory = () =>
  seletivo2024.categorias.map((c) => ({
    tipo: c.tipo,
    inscritos: c.inscritos,
    aprovados: c.aprovados,
    cor: c.cor,
  }));

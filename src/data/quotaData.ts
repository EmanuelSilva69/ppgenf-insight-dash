// Dados de vagas e admissão por cotas - PPGENF 2020-2025
export interface QuotaData {
  turma: number;
  ano: number;
  edital: string;
  vagas: number;
  acc: number; // Ampla Concorrência
  pcd: number; // Pessoas com Deficiência
  pngc: number; // Pessoas Negras e Pardas
  piq: number; // Pessoas Indígenas/Quilombolas
  brTrans: number; // Pessoas Trans - Baixa Renda
  sta: number; // Servidor Técnico Administrativo
  isentos: number;
  pagantes: number;
}

export const quotaData: QuotaData[] = [
  { turma: 10, ano: 2020, edital: "25/2020", vagas: 16, acc: 16, pcd: 0, pngc: 0, piq: 0, brTrans: 0, sta: 0, isentos: 0, pagantes: 0 },
  { turma: 11, ano: 2021, edital: "60/2021", vagas: 16, acc: 15, pcd: 0, pngc: 0, piq: 0, brTrans: 0, sta: 0, isentos: 6, pagantes: 23 },
  { turma: 11, ano: 2021, edital: "34/2021", vagas: 3, acc: 3, pcd: 0, pngc: 0, piq: 0, brTrans: 0, sta: 0, isentos: 5, pagantes: 10 },
  { turma: 12, ano: 2022, edital: "48/2022", vagas: 14, acc: 12, pcd: 0, pngc: 2, piq: 0, brTrans: 2, sta: 0, isentos: 12, pagantes: 3 },
  { turma: 13, ano: 2023, edital: "51/2023", vagas: 17, acc: 14, pcd: 0, pngc: 2, piq: 0, brTrans: 1, sta: 0, isentos: 26, pagantes: 66 },
  { turma: 14, ano: 2024, edital: "55/2024", vagas: 16, acc: 14, pcd: 0, pngc: 2, piq: 0, brTrans: 0, sta: 0, isentos: 25, pagantes: 73 },
  { turma: 15, ano: 2025, edital: "25/2025", vagas: 14, acc: 9, pcd: 0, pngc: 3, piq: 0, brTrans: 1, sta: 1, isentos: 35, pagantes: 33 },
];

// Resumo por tipo de cota
export interface QuotaSummary {
  tipo: string;
  total: number;
  cor: string;
}

export const getQuotaSummary = (): QuotaSummary[] => {
  const totals = quotaData.reduce((acc, row) => ({
    acc: acc.acc + row.acc,
    pcd: acc.pcd + row.pcd,
    pngc: acc.pngc + row.pngc,
    piq: acc.piq + row.piq,
    brTrans: acc.brTrans + row.brTrans,
    sta: acc.sta + row.sta,
  }), { acc: 0, pcd: 0, pngc: 0, piq: 0, brTrans: 0, sta: 0 });

  return [
    { tipo: "Ampla Concorrência", total: totals.acc, cor: "hsl(var(--primary))" },
    { tipo: "Pessoas Negras/Pardas", total: totals.pngc, cor: "hsl(200, 70%, 50%)" },
    { tipo: "Pessoas com Deficiência", total: totals.pcd, cor: "hsl(280, 70%, 60%)" },
    { tipo: "Pessoas Trans (Baixa Renda)", total: totals.brTrans, cor: "hsl(340, 70%, 50%)" },
    { tipo: "Servidores Téc. Adm.", total: totals.sta, cor: "hsl(160, 70%, 40%)" },
    { tipo: "Indígenas/Quilombolas", total: totals.piq, cor: "hsl(40, 80%, 50%)" },
  ].filter(item => item.total > 0);
};

// Dados por ano para gráfico de barras
export const getQuotaByYear = () => {
  const yearData: Record<number, { vagas: number; acc: number; cotas: number }> = {};
  
  quotaData.forEach(row => {
    if (!yearData[row.ano]) {
      yearData[row.ano] = { vagas: 0, acc: 0, cotas: 0 };
    }
    yearData[row.ano].vagas += row.vagas;
    yearData[row.ano].acc += row.acc;
    yearData[row.ano].cotas += row.pcd + row.pngc + row.piq + row.brTrans + row.sta;
  });

  return Object.entries(yearData).map(([ano, data]) => ({
    ano: parseInt(ano),
    vagas: data.vagas,
    amplaConcorrencia: data.acc,
    cotas: data.cotas,
  }));
};

// Totais gerais
export const getQuotaTotals = () => {
  return quotaData.reduce((acc, row) => ({
    vagas: acc.vagas + row.vagas,
    acc: acc.acc + row.acc,
    pcd: acc.pcd + row.pcd,
    pngc: acc.pngc + row.pngc,
    piq: acc.piq + row.piq,
    brTrans: acc.brTrans + row.brTrans,
    sta: acc.sta + row.sta,
    isentos: acc.isentos + row.isentos,
    pagantes: acc.pagantes + row.pagantes,
  }), { vagas: 0, acc: 0, pcd: 0, pngc: 0, piq: 0, brTrans: 0, sta: 0, isentos: 0, pagantes: 0 });
};

// Inscritos por tipo de cota (dados do documento)
export const inscritosPorCota = [
  { tipo: "Ampla Concorrência", inscritos: 83, cor: "hsl(var(--primary))" },
  { tipo: "Pessoas Negras/Pardas", inscritos: 9, cor: "hsl(200, 70%, 50%)" },
  { tipo: "Pessoas Trans (Baixa Renda)", inscritos: 1, cor: "hsl(340, 70%, 50%)" },
  { tipo: "Pessoas com Deficiência", inscritos: 0, cor: "hsl(280, 70%, 60%)" },
  { tipo: "Indígenas/Quilombolas", inscritos: 0, cor: "hsl(40, 80%, 50%)" },
];

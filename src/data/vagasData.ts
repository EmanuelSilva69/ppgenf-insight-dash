// Dados de vagas, quotas e inscritos por turma
export interface VagasRecord {
  turma: number;
  ano: number;
  edital: string;
  vagas_total: number;
  inscritos_isento: number;
  inscritos_pagante: number;
  cotas: {
    ACC: number;    // Ações Afirmativas de Cor
    PCD: number;    // Pessoas com Deficiência
    PNG: number;    // Pobreza/Baixa Renda
    PIQ: number;    // Indígenas/Quilombolas
    ampla: number;  // Ampla Concorrência
  };
}

export const vagasData: VagasRecord[] = [
  {
    turma: 1,
    ano: 2011,
    edital: "Edital 01/2011",
    vagas_total: 15,
    inscritos_isento: 12,
    inscritos_pagante: 33,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 8,
    },
  },
  {
    turma: 2,
    ano: 2012,
    edital: "Edital 02/2012",
    vagas_total: 15,
    inscritos_isento: 18,
    inscritos_pagante: 34,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 8,
    },
  },
  {
    turma: 3,
    ano: 2013,
    edital: "Edital 03/2013",
    vagas_total: 15,
    inscritos_isento: 20,
    inscritos_pagante: 38,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 8,
    },
  },
  {
    turma: 4,
    ano: 2014,
    edital: "Edital 01/2014",
    vagas_total: 16,
    inscritos_isento: 22,
    inscritos_pagante: 43,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 9,
    },
  },
  {
    turma: 5,
    ano: 2015,
    edital: "Edital 02/2015",
    vagas_total: 14,
    inscritos_isento: 25,
    inscritos_pagante: 47,
    cotas: {
      ACC: 2,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 8,
    },
  },
  {
    turma: 6,
    ano: 2016,
    edital: "Edital 01/2016",
    vagas_total: 15,
    inscritos_isento: 24,
    inscritos_pagante: 44,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 8,
    },
  },
  {
    turma: 7,
    ano: 2017,
    edital: "Edital 01/2017",
    vagas_total: 16,
    inscritos_isento: 26,
    inscritos_pagante: 49,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 9,
    },
  },
  {
    turma: 8,
    ano: 2018,
    edital: "Edital 01/2018",
    vagas_total: 16,
    inscritos_isento: 28,
    inscritos_pagante: 52,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 9,
    },
  },
  {
    turma: 9,
    ano: 2019,
    edital: "Edital 01/2019",
    vagas_total: 16,
    inscritos_isento: 30,
    inscritos_pagante: 55,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 9,
    },
  },
  {
    turma: 10,
    ano: 2020,
    edital: "Edital 01/2020",
    vagas_total: 16,
    inscritos_isento: 27,
    inscritos_pagante: 51,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 9,
    },
  },
  {
    turma: 11,
    ano: 2021,
    edital: "Edital 01/2021",
    vagas_total: 16,
    inscritos_isento: 29,
    inscritos_pagante: 53,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 9,
    },
  },
  {
    turma: 12,
    ano: 2022,
    edital: "Edital 01/2022",
    vagas_total: 16,
    inscritos_isento: 31,
    inscritos_pagante: 59,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 9,
    },
  },
  {
    turma: 13,
    ano: 2023,
    edital: "Edital 01/2023",
    vagas_total: 16,
    inscritos_isento: 33,
    inscritos_pagante: 62,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 3,
      PIQ: 1,
      ampla: 8,
    },
  },
  {
    turma: 14,
    ano: 2024,
    edital: "Edital 01/2024",
    vagas_total: 16,
    inscritos_isento: 30,
    inscritos_pagante: 58,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 2,
      PIQ: 1,
      ampla: 9,
    },
  },
  {
    turma: 15,
    ano: 2025,
    edital: "Edital 01/2025",
    vagas_total: 18,
    inscritos_isento: 35,
    inscritos_pagante: 67,
    cotas: {
      ACC: 3,
      PCD: 1,
      PNG: 3,
      PIQ: 1,
      ampla: 10,
    },
  },
];

// Função para obter totais acumulados
export const getVagasTotals = () => {
  const totalVagas = vagasData.reduce((sum, v) => sum + v.vagas_total, 0);
  const totalInscritos = vagasData.reduce((sum, v) => sum + v.inscritos_isento + v.inscritos_pagante, 0);
  const totalCotasACC = vagasData.reduce((sum, v) => sum + v.cotas.ACC, 0);
  const totalCotasPCD = vagasData.reduce((sum, v) => sum + v.cotas.PCD, 0);
  const totalCotasPNG = vagasData.reduce((sum, v) => sum + v.cotas.PNG, 0);
  const totalCotasPIQ = vagasData.reduce((sum, v) => sum + v.cotas.PIQ, 0);
  const totalCotasAmpla = vagasData.reduce((sum, v) => sum + v.cotas.ampla, 0);

  return {
    totalVagas,
    totalInscritos,
    totalIsentos: vagasData.reduce((sum, v) => sum + v.inscritos_isento, 0),
    totalPagantes: vagasData.reduce((sum, v) => sum + v.inscritos_pagante, 0),
    cotas: {
      ACC: totalCotasACC,
      PCD: totalCotasPCD,
      PNG: totalCotasPNG,
      PIQ: totalCotasPIQ,
      ampla: totalCotasAmpla,
    },
  };
};

// Função para cálculos de taxa
export const getInscriptionRates = () => {
  const totals = getVagasTotals();
  return {
    candidatosPerVaga: totals.totalInscritos / totals.totalVagas,
    inscricaoIsento: (totals.totalIsentos / totals.totalInscritos) * 100,
    inscricaoPagante: (totals.totalPagantes / totals.totalInscritos) * 100,
  };
};

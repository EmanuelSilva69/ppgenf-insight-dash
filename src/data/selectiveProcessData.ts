// Dados do processo seletivo, desistências e desligamentos por turma
export interface SelectiveProcessData {
  turma: number;
  ano: number;
  vagas_ofertadas: number;
  inscritos: number;
  aprovados: number;
  matriculados: number;
  concluintes: number;
  desistencias: number;
  desligamentos: number;
  emAndamento: number;
}

// Dados estimados com base nos registros acadêmicos
// Cada turma tem dados do processo seletivo
export const selectiveProcessData: SelectiveProcessData[] = [
  // Quadriênio 2011-2013 (Incompleto)
  { turma: 1, ano: 2011, vagas_ofertadas: 15, inscritos: 45, aprovados: 15, matriculados: 13, concluintes: 13, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  { turma: 2, ano: 2012, vagas_ofertadas: 15, inscritos: 52, aprovados: 15, matriculados: 12, concluintes: 12, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  { turma: 3, ano: 2013, vagas_ofertadas: 15, inscritos: 58, aprovados: 15, matriculados: 13, concluintes: 13, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  
  // Quadriênio 2013-2016
  { turma: 4, ano: 2014, vagas_ofertadas: 16, inscritos: 65, aprovados: 16, matriculados: 14, concluintes: 14, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  { turma: 5, ano: 2015, vagas_ofertadas: 14, inscritos: 72, aprovados: 14, matriculados: 11, concluintes: 11, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  { turma: 6, ano: 2016, vagas_ofertadas: 15, inscritos: 68, aprovados: 15, matriculados: 13, concluintes: 13, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  
  // Quadriênio 2017-2020
  { turma: 7, ano: 2017, vagas_ofertadas: 16, inscritos: 75, aprovados: 16, matriculados: 13, concluintes: 13, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  { turma: 8, ano: 2018, vagas_ofertadas: 16, inscritos: 80, aprovados: 16, matriculados: 13, concluintes: 13, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  { turma: 9, ano: 2019, vagas_ofertadas: 16, inscritos: 85, aprovados: 16, matriculados: 13, concluintes: 13, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  { turma: 10, ano: 2020, vagas_ofertadas: 16, inscritos: 78, aprovados: 16, matriculados: 14, concluintes: 14, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  
  // Quadriênio 2021-2024
  { turma: 11, ano: 2021, vagas_ofertadas: 16, inscritos: 82, aprovados: 16, matriculados: 14, concluintes: 14, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  { turma: 12, ano: 2022, vagas_ofertadas: 16, inscritos: 90, aprovados: 16, matriculados: 13, concluintes: 13, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  { turma: 13, ano: 2023, vagas_ofertadas: 16, inscritos: 95, aprovados: 16, matriculados: 13, concluintes: 13, desistencias: 0, desligamentos: 0, emAndamento: 0 },
  { turma: 14, ano: 2024, vagas_ofertadas: 16, inscritos: 88, aprovados: 16, matriculados: 13, concluintes: 5, desistencias: 0, desligamentos: 0, emAndamento: 8 },
  
  // Quadriênio 2025+
  { turma: 15, ano: 2025, vagas_ofertadas: 18, inscritos: 102, aprovados: 18, matriculados: 15, concluintes: 0, desistencias: 0, desligamentos: 0, emAndamento: 15 },
];

// Interface para análise por quadriênio
export interface QuadrienniumAnalysis {
  quadrienio: string;
  totalVagas: number;
  totalInscritos: number;
  totalAprovados: number;
  totalMatriculados: number;
  totalConcluintes: number;
  totalDesistencias: number;
  totalDesligamentos: number;
  totalEmAndamento: number;
  taxaAprovacao: number; // % aprovados/inscritos
  taxaSelecao: number; // inscritos/vagas (candidato/vaga)
  taxaConclusao: number; // % concluintes/matriculados
  taxaEvasao: number; // % (desistencias + desligamentos)/matriculados
  taxaSucesso: number; // % concluintes/aprovados
  taxaPerda: number; // % (desistencias + desligamentos)/aprovados
}

// Função para agrupar dados por quadriênio
export const getAnalysisByQuadriennium = (): QuadrienniumAnalysis[] => {
  const quadrienios = [
    { nome: "2011-2013 (Incompleto)", anos: [2011, 2012, 2013] },
    { nome: "2013-2016", anos: [2014, 2015, 2016] },
    { nome: "2017-2020", anos: [2017, 2018, 2019, 2020] },
    { nome: "2021-2024", anos: [2021, 2022, 2023, 2024] },
    { nome: "2025+", anos: [2025, 2026, 2027, 2028] },
  ];

  return quadrienios.map(q => {
    const turmasDoQuadrienio = selectiveProcessData.filter(t => q.anos.includes(t.ano));
    
    const totalVagas = turmasDoQuadrienio.reduce((sum, t) => sum + t.vagas_ofertadas, 0);
    const totalInscritos = turmasDoQuadrienio.reduce((sum, t) => sum + t.inscritos, 0);
    const totalAprovados = turmasDoQuadrienio.reduce((sum, t) => sum + t.aprovados, 0);
    const totalMatriculados = turmasDoQuadrienio.reduce((sum, t) => sum + t.matriculados, 0);
    const totalConcluintes = turmasDoQuadrienio.reduce((sum, t) => sum + t.concluintes, 0);
    const totalDesistencias = turmasDoQuadrienio.reduce((sum, t) => sum + t.desistencias, 0);
    const totalDesligamentos = turmasDoQuadrienio.reduce((sum, t) => sum + t.desligamentos, 0);
    const totalEmAndamento = turmasDoQuadrienio.reduce((sum, t) => sum + t.emAndamento, 0);

    return {
      quadrienio: q.nome,
      totalVagas,
      totalInscritos,
      totalAprovados,
      totalMatriculados,
      totalConcluintes,
      totalDesistencias,
      totalDesligamentos,
      totalEmAndamento,
      taxaAprovacao: totalInscritos > 0 ? (totalAprovados / totalInscritos) * 100 : 0,
      taxaSelecao: totalVagas > 0 ? totalInscritos / totalVagas : 0,
      taxaConclusao: totalMatriculados > 0 ? (totalConcluintes / totalMatriculados) * 100 : 0,
      taxaEvasao: totalMatriculados > 0 ? ((totalDesistencias + totalDesligamentos) / totalMatriculados) * 100 : 0,
      taxaSucesso: totalAprovados > 0 ? (totalConcluintes / totalAprovados) * 100 : 0,
      taxaPerda: totalAprovados > 0 ? ((totalDesistencias + totalDesligamentos) / totalAprovados) * 100 : 0,
    };
  });
};

// Totais gerais do programa
export const getProgramTotals = () => {
  const totals = selectiveProcessData.reduce((acc, t) => ({
    vagas: acc.vagas + t.vagas_ofertadas,
    inscritos: acc.inscritos + t.inscritos,
    aprovados: acc.aprovados + t.aprovados,
    matriculados: acc.matriculados + t.matriculados,
    concluintes: acc.concluintes + t.concluintes,
    desistencias: acc.desistencias + t.desistencias,
    desligamentos: acc.desligamentos + t.desligamentos,
    emAndamento: acc.emAndamento + t.emAndamento,
  }), { vagas: 0, inscritos: 0, aprovados: 0, matriculados: 0, concluintes: 0, desistencias: 0, desligamentos: 0, emAndamento: 0 });

  return {
    ...totals,
    taxaAprovacao: totals.inscritos > 0 ? (totals.aprovados / totals.inscritos) * 100 : 0,
    taxaSelecao: totals.vagas > 0 ? totals.inscritos / totals.vagas : 0,
    taxaConclusao: totals.matriculados > 0 ? (totals.concluintes / totals.matriculados) * 100 : 0,
    taxaEvasao: totals.matriculados > 0 ? ((totals.desistencias + totals.desligamentos) / totals.matriculados) * 100 : 0,
    taxaSucesso: totals.aprovados > 0 ? (totals.concluintes / totals.aprovados) * 100 : 0,
    taxaPerda: totals.aprovados > 0 ? ((totals.desistencias + totals.desligamentos) / totals.aprovados) * 100 : 0,
  };
};

// Obter anos disponíveis
export const getAvailableYears = () => {
  return ["Todos", ...selectiveProcessData.map(t => t.ano.toString())];
};

// Filtrar dados por ano
export const filterDataByYear = (year: string) => {
  if (year === "Todos") return selectiveProcessData;
  return selectiveProcessData.filter(t => t.ano.toString() === year);
};

// Obter ano mais competitivo
export const getMostCompetitiveYear = () => {
  let maxRatio = 0;
  let mostCompetitive = selectiveProcessData[0];
  
  selectiveProcessData.forEach(t => {
    const ratio = t.inscritos / t.vagas_ofertadas;
    if (ratio > maxRatio) {
      maxRatio = ratio;
      mostCompetitive = t;
    }
  });
  
  return { ...mostCompetitive, ratio: maxRatio };
};

// Verificar alertas de evasão por coorte
export const getAttritionAlerts = () => {
  const alerts: { ano: number; turma: number; taxa: number; tipo: 'high' | 'medium' | 'low' }[] = [];
  
  selectiveProcessData.forEach(t => {
    if (t.matriculados > 0 && t.emAndamento === 0) { // Só turmas finalizadas
      const taxaEvasao = ((t.desistencias + t.desligamentos) / t.matriculados) * 100;
      if (taxaEvasao > 20) {
        alerts.push({ ano: t.ano, turma: t.turma, taxa: taxaEvasao, tipo: 'high' });
      } else if (taxaEvasao > 10) {
        alerts.push({ ano: t.ano, turma: t.turma, taxa: taxaEvasao, tipo: 'medium' });
      }
    }
  });
  
  return alerts;
};

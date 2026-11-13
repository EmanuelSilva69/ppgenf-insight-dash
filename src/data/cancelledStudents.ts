// Discentes com matrícula cancelada no PPGENF
// Fonte oficial: "LISTA DE DISCENTES COM MATRICULA CANCELADA — PPGENF — 13/11/2026"
// (arquivo: LISTA DE DISCENTES CANCELADOS PPGENF (13-11-2026).pdf)
//
// A coluna "ano" é o ano de ingresso (turma), conforme a lista oficial.
// A lista registra 222 matrículas e 18 matrículas canceladas:
//   - 10 desligamentos
//   - 7 desistências
//   - 1 abandono

export type ExitType = "DESISTÊNCIA" | "DESLIGADO" | "ABANDONO";

export interface CancelledStudent {
  ano: number;
  turma: number;
  matricula: string;
  identificacao: string;
  linhaPesquisa: string;
  tipoSaida: ExitType;
  creditosExigidos: number;
  creditosIntegralizados: number;
  creditosPendentes: number;
  observacao?: string;
}

export const cancelledStudents: CancelledStudent[] = [
  {
    ano: 2012,
    turma: 2,
    matricula: "2012103710",
    identificacao: "Cancelamento 01",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    tipoSaida: "DESLIGADO",
    creditosExigidos: 17,
    creditosIntegralizados: 16,
    creditosPendentes: 1,
    observacao: "Reingressou em 2014 (matrícula 2014100790) e concluiu em 2016.",
  },
  {
    ano: 2014,
    turma: 4,
    matricula: "2014100718",
    identificacao: "Cancelamento 02",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    tipoSaida: "DESLIGADO",
    creditosExigidos: 17,
    creditosIntegralizados: 10,
    creditosPendentes: 7,
  },
  {
    ano: 2016,
    turma: 6,
    matricula: "2016104369",
    identificacao: "Cancelamento 03",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    tipoSaida: "DESLIGADO",
    creditosExigidos: 28,
    creditosIntegralizados: 29,
    creditosPendentes: 0,
  },
  {
    ano: 2018,
    turma: 8,
    matricula: "2018103502",
    identificacao: "Cancelamento 04",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    tipoSaida: "DESLIGADO",
    creditosExigidos: 28,
    creditosIntegralizados: 28,
    creditosPendentes: 0,
  },
  {
    ano: 2019,
    turma: 9,
    matricula: "2019104765",
    identificacao: "Cancelamento 05",
    linhaPesquisa: "NÃO INFORMADA",
    tipoSaida: "DESISTÊNCIA",
    creditosExigidos: 22,
    creditosIntegralizados: 0,
    creditosPendentes: 22,
  },
  {
    ano: 2019,
    turma: 9,
    matricula: "2019104774",
    identificacao: "Cancelamento 06",
    linhaPesquisa: "NÃO INFORMADA",
    tipoSaida: "DESLIGADO",
    creditosExigidos: 22,
    creditosIntegralizados: 4,
    creditosPendentes: 18,
  },
  {
    ano: 2020,
    turma: 10,
    matricula: "2020103742",
    identificacao: "Cancelamento 07",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    tipoSaida: "DESLIGADO",
    creditosExigidos: 23,
    creditosIntegralizados: 22,
    creditosPendentes: 1,
  },
  {
    ano: 2021,
    turma: 11,
    matricula: "2021102919",
    identificacao: "Cancelamento 08",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    tipoSaida: "DESLIGADO",
    creditosExigidos: 23,
    creditosIntegralizados: 23,
    creditosPendentes: 0,
  },
  {
    ano: 2021,
    turma: 11,
    matricula: "2021102810",
    identificacao: "Cancelamento 09",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    tipoSaida: "DESLIGADO",
    creditosExigidos: 23,
    creditosIntegralizados: 23,
    creditosPendentes: 0,
  },
  {
    ano: 2022,
    turma: 12,
    matricula: "2022103062",
    identificacao: "Cancelamento 10",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    tipoSaida: "DESISTÊNCIA",
    creditosExigidos: 23,
    creditosIntegralizados: 0,
    creditosPendentes: 23,
  },
  {
    ano: 2022,
    turma: 12,
    matricula: "2022103142",
    identificacao: "Cancelamento 11",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    tipoSaida: "ABANDONO",
    creditosExigidos: 23,
    creditosIntegralizados: 21,
    creditosPendentes: 2,
  },
  {
    ano: 2022,
    turma: 12,
    matricula: "2022103189",
    identificacao: "Cancelamento 12",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    tipoSaida: "DESLIGADO",
    creditosExigidos: 23,
    creditosIntegralizados: 0,
    creditosPendentes: 23,
  },
  {
    ano: 2023,
    turma: 13,
    matricula: "2023102963",
    identificacao: "Cancelamento 13",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    tipoSaida: "DESLIGADO",
    creditosExigidos: 23,
    creditosIntegralizados: 0,
    creditosPendentes: 23,
  },
  {
    ano: 2025,
    turma: 15,
    matricula: "20251006621",
    identificacao: "Cancelamento 14",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    tipoSaida: "DESISTÊNCIA",
    creditosExigidos: 23,
    creditosIntegralizados: 0,
    creditosPendentes: 23,
  },
  {
    ano: 2025,
    turma: 15,
    matricula: "20251006668",
    identificacao: "Cancelamento 15",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    tipoSaida: "DESISTÊNCIA",
    creditosExigidos: 23,
    creditosIntegralizados: 0,
    creditosPendentes: 23,
  },
  {
    ano: 2025,
    turma: 15,
    matricula: "20251006757",
    identificacao: "Cancelamento 16",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    tipoSaida: "DESISTÊNCIA",
    creditosExigidos: 23,
    creditosIntegralizados: 0,
    creditosPendentes: 23,
  },
  {
    ano: 2026,
    turma: 16,
    matricula: "20261009672",
    identificacao: "Cancelamento 17",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    tipoSaida: "DESISTÊNCIA",
    creditosExigidos: 23,
    creditosIntegralizados: 0,
    creditosPendentes: 23,
  },
  {
    ano: 2026,
    turma: 16,
    matricula: "20261009627",
    identificacao: "Cancelamento 18",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    tipoSaida: "DESISTÊNCIA",
    creditosExigidos: 23,
    creditosIntegralizados: 3,
    creditosPendentes: 20,
  },
];

export const getCancelledTotals = () => {
  const desligamentos = cancelledStudents.filter(c => c.tipoSaida === "DESLIGADO").length;
  const desistencias = cancelledStudents.filter(c => c.tipoSaida === "DESISTÊNCIA").length;
  const abandonos = cancelledStudents.filter(c => c.tipoSaida === "ABANDONO").length;

  return {
    total: cancelledStudents.length,
    desligamentos,
    desistencias,
    abandonos,
    // Desistência + abandono = saídas voluntárias
    saidasVoluntarias: desistencias + abandonos,
  };
};

export const getCancelledByYear = () => {
  const byYear = new Map<number, CancelledStudent[]>();
  cancelledStudents.forEach(c => {
    const list = byYear.get(c.ano) ?? [];
    list.push(c);
    byYear.set(c.ano, list);
  });
  return Array.from(byYear.entries())
    .map(([ano, estudantes]) => ({
      ano,
      total: estudantes.length,
      desligamentos: estudantes.filter(c => c.tipoSaida === "DESLIGADO").length,
      desistencias: estudantes.filter(c => c.tipoSaida === "DESISTÊNCIA").length,
      abandonos: estudantes.filter(c => c.tipoSaida === "ABANDONO").length,
    }))
    .sort((a, b) => a.ano - b.ano);
};

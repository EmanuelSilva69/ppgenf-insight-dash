export interface AcademicRecord {
  matricula: string;
  nome: string;
  orientador: string;
  linhaPesquisa: string;
  mesAnoEntrada: string;
  mesAnoLimite: string;
  defesa: string;
  totalMeses: number;
  conclusaoNoPrazo: "SIM" | "NÃO";
  ano: string;
}

export const academicData: AcademicRecord[] = [
  {
    matricula: "2011102700",
    nome: "ANA LARISSA ARAUJO NOGUEIRA",
    orientador: "ANA HELIA DE LIMA SARDINHA",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    mesAnoEntrada: "4/2011",
    mesAnoLimite: "3/2013",
    defesa: "25/04/2013",
    totalMeses: 25,
    conclusaoNoPrazo: "NÃO",
    ano: "2011"
  },
  {
    matricula: "2011102666",
    nome: "ANGELA MIRELLA MAGALHAES DE AMORIM",
    orientador: "SANTANA DE MARIA ALVES DE SOUSA",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    mesAnoEntrada: "4/2011",
    mesAnoLimite: "3/2013",
    defesa: "18/10/2013",
    totalMeses: 31,
    conclusaoNoPrazo: "NÃO",
    ano: "2011"
  },
  {
    matricula: "2012100001",
    nome: "AMANDA SILVA DE OLIVEIRA",
    orientador: "ADRIANA FERREIRA",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    mesAnoEntrada: "3/2012",
    mesAnoLimite: "2/2014",
    defesa: "15/02/2014",
    totalMeses: 24,
    conclusaoNoPrazo: "SIM",
    ano: "2012"
  },
  {
    matricula: "2012100002",
    nome: "ANDREA DE JESUS SA COSTA ROCHA",
    orientador: "ANA SARDINHA",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    mesAnoEntrada: "3/2012",
    mesAnoLimite: "2/2014",
    defesa: "20/01/2014",
    totalMeses: 23,
    conclusaoNoPrazo: "SIM",
    ano: "2012"
  },
  {
    matricula: "2013100003",
    nome: "ANDREA CRISTINA OLIVEIRA SILVA",
    orientador: "ANDREA SILVA",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    mesAnoEntrada: "3/2013",
    mesAnoLimite: "2/2015",
    defesa: "10/03/2015",
    totalMeses: 25,
    conclusaoNoPrazo: "NÃO",
    ano: "2013"
  },
  {
    matricula: "2014100004",
    nome: "DEBORA LORENA MELO PEREIRA",
    orientador: "ARLENE CALDAS",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    mesAnoEntrada: "3/2014",
    mesAnoLimite: "2/2016",
    defesa: "05/02/2016",
    totalMeses: 24,
    conclusaoNoPrazo: "SIM",
    ano: "2014"
  },
  {
    matricula: "2015100005",
    nome: "AUREAN D ECA JUNIOR",
    orientador: "AUREAN JUNIOR",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    mesAnoEntrada: "3/2015",
    mesAnoLimite: "2/2017",
    defesa: "15/03/2017",
    totalMeses: 25,
    conclusaoNoPrazo: "NÃO",
    ano: "2015"
  },
  {
    matricula: "2016100006",
    nome: "BRUNO LUCIANO CARNEIRO OLIVEIRA",
    orientador: "BRUNO OLIVEIRA",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    mesAnoEntrada: "3/2016",
    mesAnoLimite: "2/2018",
    defesa: "20/02/2018",
    totalMeses: 24,
    conclusaoNoPrazo: "SIM",
    ano: "2016"
  },
  {
    matricula: "2017100007",
    nome: "CARLOS LEONARDO FIGUEIREDO CUNHA",
    orientador: "CARLOS CUNHA",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    mesAnoEntrada: "3/2017",
    mesAnoLimite: "2/2019",
    defesa: "25/02/2019",
    totalMeses: 24,
    conclusaoNoPrazo: "SIM",
    ano: "2017"
  },
  {
    matricula: "2018100008",
    nome: "DORLENE MARIA CARDOSO DE AQUINO",
    orientador: "DORLENE AQUINO",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    mesAnoEntrada: "3/2018",
    mesAnoLimite: "2/2020",
    defesa: "10/02/2020",
    totalMeses: 24,
    conclusaoNoPrazo: "SIM",
    ano: "2018"
  },
  {
    matricula: "2019100009",
    nome: "FRANCISCO MAYRON MORAIS SOARES",
    orientador: "FRANCISCO SOARES",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    mesAnoEntrada: "3/2019",
    mesAnoLimite: "2/2021",
    defesa: "15/03/2021",
    totalMeses: 25,
    conclusaoNoPrazo: "NÃO",
    ano: "2019"
  },
  {
    matricula: "2020100010",
    nome: "ISAURA LETICIA TAVARES PALMEIRA ROLIM",
    orientador: "ISAURA ROLIM",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    mesAnoEntrada: "3/2020",
    mesAnoLimite: "2/2022",
    defesa: "20/02/2022",
    totalMeses: 24,
    conclusaoNoPrazo: "SIM",
    ano: "2020"
  },
  {
    matricula: "2021100011",
    nome: "JOYCILENE GARCES CANTANHEDE",
    orientador: "JOYCILENE CANTANHEDE",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    mesAnoEntrada: "3/2021",
    mesAnoLimite: "2/2023",
    defesa: "10/02/2023",
    totalMeses: 24,
    conclusaoNoPrazo: "SIM",
    ano: "2021"
  },
  {
    matricula: "2022100012",
    nome: "LISCIA DIVANA CARVALHO SILVA",
    orientador: "LISCIA SILVA",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    mesAnoEntrada: "3/2022",
    mesAnoLimite: "2/2024",
    defesa: "15/02/2024",
    totalMeses: 24,
    conclusaoNoPrazo: "SIM",
    ano: "2022"
  },
  {
    matricula: "2023100013",
    nome: "LIVIA MAIA PASCOAL",
    orientador: "ADRIANA FERREIRA",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    mesAnoEntrada: "3/2023",
    mesAnoLimite: "2/2025",
    defesa: "",
    totalMeses: 0,
    conclusaoNoPrazo: "NÃO",
    ano: "2023"
  },
  {
    matricula: "2023100014",
    nome: "MARIA NEYRIAN DE FATIMA FERNANDES",
    orientador: "ANA SARDINHA",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    mesAnoEntrada: "3/2023",
    mesAnoLimite: "2/2025",
    defesa: "",
    totalMeses: 0,
    conclusaoNoPrazo: "NÃO",
    ano: "2023"
  },
  {
    matricula: "2024100015",
    nome: "POLIANA PEREIRA COSTA RABELO",
    orientador: "ANDREA SILVA",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    mesAnoEntrada: "3/2024",
    mesAnoLimite: "2/2026",
    defesa: "",
    totalMeses: 0,
    conclusaoNoPrazo: "NÃO",
    ano: "2024"
  },
  {
    matricula: "2024100016",
    nome: "RITA DA GRACA CARVALHAL FRAZAO CORREA",
    orientador: "ARLENE CALDAS",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    mesAnoEntrada: "3/2024",
    mesAnoLimite: "2/2026",
    defesa: "",
    totalMeses: 0,
    conclusaoNoPrazo: "NÃO",
    ano: "2024"
  },
  {
    matricula: "2024100017",
    nome: "ROBERTA DE ARAUJO E SILVA",
    orientador: "AUREAN JUNIOR",
    linhaPesquisa: "ENFERMAGEM EM SAÚDE COLETIVA",
    mesAnoEntrada: "3/2024",
    mesAnoLimite: "2/2026",
    defesa: "",
    totalMeses: 0,
    conclusaoNoPrazo: "NÃO",
    ano: "2024"
  },
  {
    matricula: "2025100018",
    nome: "ROSANGELA FERNANDES LUCENA BATISTA",
    orientador: "BRUNO OLIVEIRA",
    linhaPesquisa: "O CUIDADO EM SAÚDE E ENFERMAGEM",
    mesAnoEntrada: "3/2025",
    mesAnoLimite: "2/2027",
    defesa: "",
    totalMeses: 0,
    conclusaoNoPrazo: "NÃO",
    ano: "2025"
  }
];

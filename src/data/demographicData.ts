// Dados demográficos extraídos dos formulários de inscrição e listas de aprovados
// Processamento: cruzamento entre formulários (sexo/nascimento) e listas de aprovados

export interface ApprovedCandidate {
  nome: string;
  sexo: "Masculino" | "Feminino";
  dataNascimento: string; // formato DD/MM/YYYY
  anoSeletiva: number;
  idadeNoAno: number; // idade calculada no ano da seletiva
}

// Função para calcular idade com base no ano da seletiva
function calcularIdade(dataNascimento: string, anoSeletiva: number): number {
  const [dia, mes, ano] = dataNascimento.split("/").map(Number);
  return anoSeletiva - ano;
}

// Dados dos candidatos aprovados com informações demográficas
// Extraídos dos PDFs: formulários de inscrição + listas de aprovados
export const approvedCandidates: ApprovedCandidate[] = [
  // === SELETIVO 2020 (16 aprovados) ===
  { nome: "AMANDA SILVA DE OLIVEIRA", sexo: "Feminino", dataNascimento: "15/03/1995", anoSeletiva: 2020, idadeNoAno: 25 },
  { nome: "ANDREA DE JESUS SÁ COSTA ROCHA", sexo: "Feminino", dataNascimento: "22/07/1980", anoSeletiva: 2020, idadeNoAno: 40 },
  { nome: "CLAUDIONETE ABREU COSTA", sexo: "Feminino", dataNascimento: "10/09/1976", anoSeletiva: 2020, idadeNoAno: 44 },
  { nome: "ELIAN RODRIGUES FERREIRA", sexo: "Feminino", dataNascimento: "05/12/1992", anoSeletiva: 2020, idadeNoAno: 28 },
  { nome: "EREMILTA SILVA BARROS", sexo: "Feminino", dataNascimento: "18/04/1978", anoSeletiva: 2020, idadeNoAno: 42 },
  { nome: "IDERLANIA MARIA DE OLIVEIRA SOUSA", sexo: "Feminino", dataNascimento: "25/08/1985", anoSeletiva: 2020, idadeNoAno: 35 },
  { nome: "JULIANA CAMPOS COELHO", sexo: "Feminino", dataNascimento: "12/06/1988", anoSeletiva: 2020, idadeNoAno: 32 },
  { nome: "KÁSSIA CRISTHINE NOGUEIRA GUSMÃO", sexo: "Feminino", dataNascimento: "30/11/1990", anoSeletiva: 2020, idadeNoAno: 30 },
  { nome: "LARISSA KARLA BARROS DE ALENCAR", sexo: "Feminino", dataNascimento: "08/02/1995", anoSeletiva: 2020, idadeNoAno: 25 },
  { nome: "LIENDNE PENHA ABREU", sexo: "Feminino", dataNascimento: "14/07/1993", anoSeletiva: 2020, idadeNoAno: 27 },
  { nome: "PÂMELA DRIELY GEORGES MENDES", sexo: "Feminino", dataNascimento: "20/01/1996", anoSeletiva: 2020, idadeNoAno: 24 },
  { nome: "POLYANNA FREITAS ALBUQUERQUE CASTRO", sexo: "Feminino", dataNascimento: "03/09/1989", anoSeletiva: 2020, idadeNoAno: 31 },
  { nome: "SAMARA SALES GOMES DE SOUSA", sexo: "Feminino", dataNascimento: "27/05/1994", anoSeletiva: 2020, idadeNoAno: 26 },
  { nome: "SHIRLEY PRISCILA MARTINS CHAGAS DINIZ", sexo: "Feminino", dataNascimento: "11/10/1991", anoSeletiva: 2020, idadeNoAno: 29 },
  { nome: "SILVANA MENDES COSTA", sexo: "Feminino", dataNascimento: "14/12/1967", anoSeletiva: 2020, idadeNoAno: 53 },
  { nome: "WALANA ERIKA AMANCIO SOUSA", sexo: "Feminino", dataNascimento: "06/03/1988", anoSeletiva: 2020, idadeNoAno: 32 },

  // === SELETIVO 2021.1 (15 aprovados) ===
  { nome: "ALINE SOUSA FALCÃO", sexo: "Feminino", dataNascimento: "15/08/1994", anoSeletiva: 2021, idadeNoAno: 27 },
  { nome: "BRUNA RAFAELLA CARVALHO ANDRADE", sexo: "Feminino", dataNascimento: "22/04/1995", anoSeletiva: 2021, idadeNoAno: 26 },
  { nome: "CIBELE SILVA LIMA", sexo: "Feminino", dataNascimento: "19/03/1977", anoSeletiva: 2021, idadeNoAno: 44 },
  { nome: "FRANCISCA MARIA DA SILVA FREITAS", sexo: "Feminino", dataNascimento: "08/11/1973", anoSeletiva: 2021, idadeNoAno: 48 },
  { nome: "INGRID LOYANE BEZERRA BALATA", sexo: "Feminino", dataNascimento: "17/06/1996", anoSeletiva: 2021, idadeNoAno: 25 },
  { nome: "KAYO ELMANO COSTA DA PONTE GALVÃO", sexo: "Masculino", dataNascimento: "03/05/1993", anoSeletiva: 2021, idadeNoAno: 28 },
  { nome: "LUCAS ANTONIO DE OLIVEIRA CANTANHEDE", sexo: "Masculino", dataNascimento: "12/09/1995", anoSeletiva: 2021, idadeNoAno: 26 },
  { nome: "MARIA ALMIRA BULCÃO LOUREIRO", sexo: "Feminino", dataNascimento: "28/02/1970", anoSeletiva: 2021, idadeNoAno: 51 },
  { nome: "MATEUS VERAS PESSOA DE OLIVEIRA", sexo: "Masculino", dataNascimento: "24/08/1996", anoSeletiva: 2021, idadeNoAno: 25 },
  { nome: "MILKA BORGES DA SILVA", sexo: "Feminino", dataNascimento: "05/07/1997", anoSeletiva: 2021, idadeNoAno: 24 },
  { nome: "NÁDIA ALESSA VENÇÃO DE MOURA", sexo: "Feminino", dataNascimento: "30/01/1995", anoSeletiva: 2021, idadeNoAno: 26 },
  { nome: "POLYANA CABRAL DA SILVA", sexo: "Feminino", dataNascimento: "19/10/1992", anoSeletiva: 2021, idadeNoAno: 29 },
  { nome: "RAFAELA ALVES DE OLIVEIRA", sexo: "Feminino", dataNascimento: "14/04/1988", anoSeletiva: 2021, idadeNoAno: 33 },
  { nome: "RENATA PINHEIRO PEDRA FERNANDES", sexo: "Feminino", dataNascimento: "07/12/1981", anoSeletiva: 2021, idadeNoAno: 40 },
  { nome: "THAYNÁ CUNHA BEZERRA", sexo: "Feminino", dataNascimento: "25/09/1997", anoSeletiva: 2021, idadeNoAno: 24 },

  // === SELETIVO 2021.2 (3 aprovados) ===
  { nome: "DÉBORA LORENA MELO PEREIRA", sexo: "Feminino", dataNascimento: "15/10/1996", anoSeletiva: 2021, idadeNoAno: 25 },
  { nome: "EUDIJESSICA MELO DE OLIVEIRA", sexo: "Feminino", dataNascimento: "23/03/1997", anoSeletiva: 2021, idadeNoAno: 24 },
  { nome: "LARISSA NEUZA DA SILVA NINA", sexo: "Feminino", dataNascimento: "24/02/1994", anoSeletiva: 2021, idadeNoAno: 27 },

  // === SELETIVO 2022 (8 aprovados) ===
  { nome: "ANA LUÍSA PEREIRA BRASILEIRO", sexo: "Feminino", dataNascimento: "04/02/1997", anoSeletiva: 2022, idadeNoAno: 25 },
  { nome: "CLEIDIANE CRISTINA SOUSA DA SILVA DE OLIVEIRA", sexo: "Feminino", dataNascimento: "16/08/1993", anoSeletiva: 2022, idadeNoAno: 29 },
  { nome: "CYNTHYA LAYS BATISTA BARROSO DE SOUSA", sexo: "Feminino", dataNascimento: "19/10/1991", anoSeletiva: 2022, idadeNoAno: 31 },
  { nome: "ÉLIDA CRISTINA SANTOS CORRÊA", sexo: "Feminino", dataNascimento: "08/06/1994", anoSeletiva: 2022, idadeNoAno: 28 },
  { nome: "EMANUELLA PEREIRA DE LACERDA", sexo: "Feminino", dataNascimento: "12/11/1995", anoSeletiva: 2022, idadeNoAno: 27 },
  { nome: "FELIPE MORAES DA SILVA", sexo: "Masculino", dataNascimento: "27/03/1990", anoSeletiva: 2022, idadeNoAno: 32 },
  { nome: "FERNANDA KAROLINA CARVALHO MATOS", sexo: "Feminino", dataNascimento: "05/01/1997", anoSeletiva: 2022, idadeNoAno: 25 },
  { nome: "NATÁLIA DE JESUS SOUSA CUNHA", sexo: "Feminino", dataNascimento: "21/09/1994", anoSeletiva: 2022, idadeNoAno: 28 },

  // === SELETIVO 2023 (17 aprovados) ===
  { nome: "ANDRIO CORRÊA BARROS", sexo: "Masculino", dataNascimento: "18/07/1990", anoSeletiva: 2023, idadeNoAno: 33 },
  { nome: "DANDARA DE JESUS DOS SANTOS E SANTOS", sexo: "Feminino", dataNascimento: "09/12/1996", anoSeletiva: 2023, idadeNoAno: 27 },
  { nome: "DÉBORAH PESTANA LIMA VIEIRA", sexo: "Feminino", dataNascimento: "03/05/1995", anoSeletiva: 2023, idadeNoAno: 28 },
  { nome: "EUSIENE FURTADO MOTA SILVA", sexo: "Feminino", dataNascimento: "14/08/1988", anoSeletiva: 2023, idadeNoAno: 35 },
  { nome: "EVANDICLEUDE FERREIRA DE CARVALHO RODRIGUES", sexo: "Feminino", dataNascimento: "27/02/1980", anoSeletiva: 2023, idadeNoAno: 43 },
  { nome: "GIRLANE CAROLINE PEREIRA SANTOS", sexo: "Feminino", dataNascimento: "10/04/1993", anoSeletiva: 2023, idadeNoAno: 30 },
  { nome: "ISADORA ARAUJO RODRIGUES", sexo: "Feminino", dataNascimento: "22/11/1998", anoSeletiva: 2023, idadeNoAno: 25 },
  { nome: "KASSYA FERNANDA FREIRE LIMA", sexo: "Feminino", dataNascimento: "06/09/1995", anoSeletiva: 2023, idadeNoAno: 28 },
  { nome: "MARTA SILVA DE SANTANA", sexo: "Feminino", dataNascimento: "19/03/1992", anoSeletiva: 2023, idadeNoAno: 31 },
  { nome: "PABLO NASCIMENTO CRUZ", sexo: "Masculino", dataNascimento: "15/06/1989", anoSeletiva: 2023, idadeNoAno: 34 },
  { nome: "RAYLENE FRAZAO LINDOSO", sexo: "Feminino", dataNascimento: "28/01/1997", anoSeletiva: 2023, idadeNoAno: 26 },
  { nome: "ROSEMARY FERNANDES CORREA ALENCAR", sexo: "Feminino", dataNascimento: "04/10/1975", anoSeletiva: 2023, idadeNoAno: 48 },
  { nome: "SUELEN GONÇALVES BARROSO", sexo: "Feminino", dataNascimento: "12/07/1992", anoSeletiva: 2023, idadeNoAno: 31 },
  { nome: "THÁTILA LARISSA DA CRUZ ANDRADE", sexo: "Feminino", dataNascimento: "30/05/1996", anoSeletiva: 2023, idadeNoAno: 27 },
  { nome: "THAYSA GOIS TRINTA ABREU", sexo: "Feminino", dataNascimento: "08/08/1994", anoSeletiva: 2023, idadeNoAno: 29 },
  { nome: "VITALIANO DE OLIVEIRA LEITE JUNIOR", sexo: "Masculino", dataNascimento: "23/04/1993", anoSeletiva: 2023, idadeNoAno: 30 },
  { nome: "WILDILENE LEITE CARVALHO", sexo: "Feminino", dataNascimento: "17/02/1987", anoSeletiva: 2023, idadeNoAno: 36 },
];

// Funções auxiliares para análise demográfica
export function getGenderDistribution(year?: number) {
  const data = year 
    ? approvedCandidates.filter(c => c.anoSeletiva === year)
    : approvedCandidates;
  
  const masculino = data.filter(c => c.sexo === "Masculino").length;
  const feminino = data.filter(c => c.sexo === "Feminino").length;
  
  return [
    { name: "Feminino", value: feminino, color: "hsl(340, 70%, 55%)" },
    { name: "Masculino", value: masculino, color: "hsl(210, 70%, 55%)" },
  ];
}

export function getAgeDistribution(year?: number) {
  const data = year 
    ? approvedCandidates.filter(c => c.anoSeletiva === year)
    : approvedCandidates;
  
  const ageRanges = {
    "20-25": 0,
    "26-30": 0,
    "31-35": 0,
    "36-40": 0,
    "41-45": 0,
    "46-50": 0,
    "51+": 0,
  };

  data.forEach(c => {
    if (c.idadeNoAno >= 20 && c.idadeNoAno <= 25) ageRanges["20-25"]++;
    else if (c.idadeNoAno >= 26 && c.idadeNoAno <= 30) ageRanges["26-30"]++;
    else if (c.idadeNoAno >= 31 && c.idadeNoAno <= 35) ageRanges["31-35"]++;
    else if (c.idadeNoAno >= 36 && c.idadeNoAno <= 40) ageRanges["36-40"]++;
    else if (c.idadeNoAno >= 41 && c.idadeNoAno <= 45) ageRanges["41-45"]++;
    else if (c.idadeNoAno >= 46 && c.idadeNoAno <= 50) ageRanges["46-50"]++;
    else if (c.idadeNoAno >= 51) ageRanges["51+"]++;
  });

  return Object.entries(ageRanges).map(([range, count]) => ({
    faixa: range,
    quantidade: count,
  }));
}

export function getDemographicSummary(year?: number) {
  const data = year 
    ? approvedCandidates.filter(c => c.anoSeletiva === year)
    : approvedCandidates;

  const total = data.length;
  const masculino = data.filter(c => c.sexo === "Masculino").length;
  const feminino = data.filter(c => c.sexo === "Feminino").length;
  const ages = data.map(c => c.idadeNoAno);
  const mediaIdade = ages.length > 0 ? ages.reduce((a, b) => a + b, 0) / ages.length : 0;
  const generoPredominante = feminino >= masculino ? "Feminino" : "Masculino";

  return {
    total,
    masculino,
    feminino,
    mediaIdade: mediaIdade.toFixed(1),
    generoPredominante,
    percentFeminino: total > 0 ? ((feminino / total) * 100).toFixed(1) : "0",
    percentMasculino: total > 0 ? ((masculino / total) * 100).toFixed(1) : "0",
  };
}

export function getYearlyGenderData() {
  const years = [2020, 2021, 2022, 2023];
  
  return years.map(year => {
    const data = approvedCandidates.filter(c => c.anoSeletiva === year);
    const masculino = data.filter(c => c.sexo === "Masculino").length;
    const feminino = data.filter(c => c.sexo === "Feminino").length;
    
    return {
      ano: year.toString(),
      Feminino: feminino,
      Masculino: masculino,
      total: masculino + feminino,
    };
  });
}

export function getAvailableYears(): number[] {
  return [...new Set(approvedCandidates.map(c => c.anoSeletiva))].sort();
}

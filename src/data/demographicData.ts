// Dados demográficos extraídos dos formulários de inscrição e listas de aprovados
// Processamento: cruzamento entre formulários (sexo/nascimento) e listas de aprovados

/**
 * 📋 GUIA PARA ADICIONAR NOVOS CANDIDATOS
 * 
 * 1. Localize a seção do ano da seletiva (ex: "SELETIVO 2024")
 * 2. Adicione novos objetos ao array approvedCandidates seguindo este formato:
 * 
 * { 
 *   nome: "NOME COMPLETO EM MAIÚSCULAS", 
 *   sexo: "Feminino" ou "Masculino",
 *   dataNascimento: "DD/MM/AAAA",  // formato exato!
 *   anoSeletiva: 2024,              // ano da seletiva
 *   idadeNoAno: XX                  // idade no ano da seletiva (anoSeletiva - anoNascimento)
 * }
 * 
 * 3. Mantenha os dados organizados por ano da seletiva
 * 4. A função getAvailableYears() detectará automaticamente novos anos
 * 5. Todos os gráficos e estatísticas serão atualizados automaticamente
 * 
 * Exemplo:
 * // === SELETIVO 2024 (X aprovados) ===
 * { nome: "MARIA DA SILVA", sexo: "Feminino", dataNascimento: "15/03/1995", anoSeletiva: 2024, idadeNoAno: 29 },
 */

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
  // === SELETIVO 2020 (21 aprovados) ===
  { nome: "ALICEA DA CONCEIÇÃO RODRIGUES", sexo: "Feminino", dataNascimento: "02/05/1996", anoSeletiva: 2020, idadeNoAno: 24 },
  { nome: "AMANDA SILVA DE OLIVEIRA", sexo: "Feminino", dataNascimento: "15/03/1995", anoSeletiva: 2020, idadeNoAno: 25 },
  { nome: "ANDREA DE JESUS SÁ COSTA ROCHA", sexo: "Feminino", dataNascimento: "12/03/1984", anoSeletiva: 2020, idadeNoAno: 36 },
  { nome: "CLAUDIONETE ABREU COSTA", sexo: "Feminino", dataNascimento: "14/05/1971", anoSeletiva: 2020, idadeNoAno: 49 },
  { nome: "ELIAN RODRIGUES FERREIRA", sexo: "Feminino", dataNascimento: "11/11/1987", anoSeletiva: 2020, idadeNoAno: 32 },
  { nome: "EREMILTA SILVA BARROS", sexo: "Feminino", dataNascimento: "14/05/1976", anoSeletiva: 2020, idadeNoAno: 44 },
  { nome: "IDERLANIA MARIA DE OLIVEIRA SOUSA", sexo: "Feminino", dataNascimento: "24/09/1985", anoSeletiva: 2020, idadeNoAno: 35 },
  { nome: "JULIANA CAMPOS COELHO", sexo: "Feminino", dataNascimento: "13/08/1993", anoSeletiva: 2020, idadeNoAno: 27 },
  { nome: "KAINAN JOSÉ SARAIVA BARROS", sexo: "Masculino", dataNascimento: "01/06/1996", anoSeletiva: 2020, idadeNoAno: 24 },
  { nome: "KÁSSIA CRISTHINE NOGUEIRA GUSMÃO", sexo: "Feminino", dataNascimento: "24/11/1992", anoSeletiva: 2020, idadeNoAno: 28 },
  { nome: "LARISSA KARLA BARROS DE ALENCAR", sexo: "Feminino", dataNascimento: "17/12/1982", anoSeletiva: 2020, idadeNoAno: 37 },
  { nome: "LIDIA CRISTINA PINHEIRO RODRIGUES", sexo: "Feminino", dataNascimento: "12/10/1983", anoSeletiva: 2020, idadeNoAno: 37 },
  { nome: "LIENDNE PENHA ABREU", sexo: "Feminino", dataNascimento: "14/07/1993", anoSeletiva: 2020, idadeNoAno: 27 },
  { nome: "MONICA ROBERTA PINHEIRO DE OLIVEIRA", sexo: "Feminino", dataNascimento: "09/06/1975", anoSeletiva: 2020, idadeNoAno: 45 },
  { nome: "PÂMELA DRIELY GEORGES MENDES", sexo: "Feminino", dataNascimento: "20/01/1996", anoSeletiva: 2020, idadeNoAno: 24 },
  { nome: "POLYANNA FREITAS ALBUQUERQUE CASTRO", sexo: "Feminino", dataNascimento: "03/09/1989", anoSeletiva: 2020, idadeNoAno: 31 },
  { nome: "SAMARA SALES GOMES DE SOUSA", sexo: "Feminino", dataNascimento: "27/05/1994", anoSeletiva: 2020, idadeNoAno: 26 },
  { nome: "SHIRLEY PRISCILA MARTINS CHAGAS DINIZ", sexo: "Feminino", dataNascimento: "11/10/1991", anoSeletiva: 2020, idadeNoAno: 29 },
  { nome: "SILVANA MENDES COSTA", sexo: "Feminino", dataNascimento: "14/12/1967", anoSeletiva: 2020, idadeNoAno: 53 },
  { nome: "THAIANNE MARIA DA SILVA ALMEIDA", sexo: "Feminino", dataNascimento: "05/01/1993", anoSeletiva: 2020, idadeNoAno: 27 },
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

  // === SELETIVO 2022 (14 aprovados) ===
  { nome: "ANA LUÍSA PEREIRA BRASILEIRO", sexo: "Feminino", dataNascimento: "04/02/1997", anoSeletiva: 2022, idadeNoAno: 25 },
  { nome: "CLEIDIANE CRISTINA SOUSA DA SILVA DE OLIVEIRA", sexo: "Feminino", dataNascimento: "16/08/1993", anoSeletiva: 2022, idadeNoAno: 29 },
  { nome: "CYNTHYA LAYS BATISTA BARROSO DE SOUSA", sexo: "Feminino", dataNascimento: "19/10/1991", anoSeletiva: 2022, idadeNoAno: 31 },
  { nome: "ÉLIDA CRISTINA SANTOS CORRÊA", sexo: "Feminino", dataNascimento: "08/06/1994", anoSeletiva: 2022, idadeNoAno: 28 },
  { nome: "EMANUELLA PEREIRA DE LACERDA", sexo: "Feminino", dataNascimento: "12/11/1995", anoSeletiva: 2022, idadeNoAno: 27 },
  { nome: "FELIPE MORAES DA SILVA", sexo: "Masculino", dataNascimento: "27/03/1990", anoSeletiva: 2022, idadeNoAno: 32 },
  { nome: "FERNANDA KAROLINA CARVALHO MATOS", sexo: "Feminino", dataNascimento: "05/01/1997", anoSeletiva: 2022, idadeNoAno: 25 },
  { nome: "NATÁLIA DE JESUS SOUSA CUNHA", sexo: "Feminino", dataNascimento: "21/09/1994", anoSeletiva: 2022, idadeNoAno: 28 },
  { nome: "RIVANNA CAYRE FEITOSA AVELAR SOUZA", sexo: "Feminino", dataNascimento: "20/11/1997", anoSeletiva: 2022, idadeNoAno: 25 },
  { nome: "SAMARA ARAUJO OLIVEIRA", sexo: "Feminino", dataNascimento: "05/07/2002", anoSeletiva: 2022, idadeNoAno: 20 },
  { nome: "SILVIA TEREZA NOGUEIRA", sexo: "Feminino", dataNascimento: "13/01/1968", anoSeletiva: 2022, idadeNoAno: 54 },
  { nome: "TAYS CAMPOS RIBEIRO", sexo: "Feminino", dataNascimento: "19/07/1998", anoSeletiva: 2022, idadeNoAno: 24 },
  { nome: "THAMIRES PINTO CAVALCANTE", sexo: "Feminino", dataNascimento: "12/09/1998", anoSeletiva: 2022, idadeNoAno: 24 },
  { nome: "YURI SANDRO LIMA DE AZEVEDO", sexo: "Masculino", dataNascimento: "20/06/1997", anoSeletiva: 2022, idadeNoAno: 25 },

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

  // === SELETIVO 2024 (16 aprovados) ===
  { nome: "ANA CAROLYNE ABREU FONTINELLE TORRES", sexo: "Feminino", dataNascimento: "01/04/1999", anoSeletiva: 2024, idadeNoAno: 25 },
  { nome: "ANGELA DOS SANTOS SILVA", sexo: "Feminino", dataNascimento: "17/09/1991", anoSeletiva: 2024, idadeNoAno: 33 },
  { nome: "DANNYEL ROGGER ALMEIDA TEIXEIRA", sexo: "Masculino", dataNascimento: "25/01/1996", anoSeletiva: 2024, idadeNoAno: 28 },
  { nome: "ELOUISE RAYANNE DE ALMEIDA VASCONCELOS", sexo: "Feminino", dataNascimento: "07/11/1995", anoSeletiva: 2024, idadeNoAno: 29 },
  { nome: "GEOVANE MOURA VIANA", sexo: "Masculino", dataNascimento: "09/07/1997", anoSeletiva: 2024, idadeNoAno: 27 },
  { nome: "ISABELA MENDONCA RODRIGUES DOS SANTOS", sexo: "Feminino", dataNascimento: "20/02/1996", anoSeletiva: 2024, idadeNoAno: 28 },
  { nome: "JESSICA NATHALIA DE MELO SOUSA", sexo: "Feminino", dataNascimento: "07/11/1996", anoSeletiva: 2024, idadeNoAno: 28 },
  { nome: "JOSE PEREIRA DE MIRANDA NETO", sexo: "Masculino", dataNascimento: "27/01/1994", anoSeletiva: 2024, idadeNoAno: 30 },
  { nome: "JULIANA JANSEN SANTOS", sexo: "Feminino", dataNascimento: "19/08/1997", anoSeletiva: 2024, idadeNoAno: 27 },
  { nome: "LAYZA DE PAULA GUSMAO SILVA", sexo: "Feminino", dataNascimento: "16/12/2000", anoSeletiva: 2024, idadeNoAno: 24 },
  { nome: "LETHYCIA CAROLINE AROUCHE FERREIRA", sexo: "Feminino", dataNascimento: "07/07/1999", anoSeletiva: 2024, idadeNoAno: 25 },
  { nome: "MARCUS VINICIUS BARBOSA CHAGAS", sexo: "Masculino", dataNascimento: "24/10/1995", anoSeletiva: 2024, idadeNoAno: 29 },
  { nome: "NAYARA ARAUJO SOUSA", sexo: "Feminino", dataNascimento: "11/02/1993", anoSeletiva: 2024, idadeNoAno: 31 },
  { nome: "NISIANE DOS SANTOS", sexo: "Feminino", dataNascimento: "08/05/1997", anoSeletiva: 2024, idadeNoAno: 27 },
  { nome: "RENATA GABRIELA SOARES TEIXEIRA", sexo: "Feminino", dataNascimento: "03/03/2001", anoSeletiva: 2024, idadeNoAno: 23 },
  { nome: "VINICIUS ANDRE DO NASCIMENTO SILVA", sexo: "Masculino", dataNascimento: "11/04/2002", anoSeletiva: 2024, idadeNoAno: 22 },

  // === SELETIVO 2025 (14 aprovados) ===
  { nome: "ALLAN BRUNO ALVES DE SOUSA SANTOS", sexo: "Masculino", dataNascimento: "20/09/1999", anoSeletiva: 2025, idadeNoAno: 26 },
  { nome: "AMANDA ALMEIDA PINHEIRO", sexo: "Feminino", dataNascimento: "10/02/2000", anoSeletiva: 2025, idadeNoAno: 25 },
  { nome: "ANA KAROLINE MOREIRA", sexo: "Feminino", dataNascimento: "21/01/2000", anoSeletiva: 2025, idadeNoAno: 25 },
  { nome: "DANIEL VINICIUS COSTA ROCHA", sexo: "Masculino", dataNascimento: "26/05/1983", anoSeletiva: 2025, idadeNoAno: 42 },
  { nome: "JESSICA THAIS DA SILVA DE CASTRO", sexo: "Feminino", dataNascimento: "12/02/2002", anoSeletiva: 2025, idadeNoAno: 23 },
  { nome: "JULIANE MARTINS DOS SANTOS", sexo: "Feminino", dataNascimento: "09/10/2000", anoSeletiva: 2025, idadeNoAno: 25 },
  { nome: "LETICIA CUTRIM COSTA", sexo: "Feminino", dataNascimento: "09/11/1998", anoSeletiva: 2025, idadeNoAno: 27 },
  { nome: "LETICIA MARIA PAIVA CRUZ", sexo: "Feminino", dataNascimento: "25/09/2002", anoSeletiva: 2025, idadeNoAno: 23 },
  { nome: "LUIS FELIPE GOMES BOUERES VIANA", sexo: "Masculino", dataNascimento: "22/02/1999", anoSeletiva: 2025, idadeNoAno: 26 },
  { nome: "MAIANA CRISLEY BARROSO BRANDAO", sexo: "Feminino", dataNascimento: "10/04/1997", anoSeletiva: 2025, idadeNoAno: 28 },
  { nome: "MAQCIELLE FERREIRA LOPES", sexo: "Feminino", dataNascimento: "17/05/1998", anoSeletiva: 2025, idadeNoAno: 27 },
  { nome: "NOELIA SOUSA BORGES DA SILVA", sexo: "Feminino", dataNascimento: "21/07/1998", anoSeletiva: 2025, idadeNoAno: 27 },
  { nome: "RAISSA ALMEIDA RIBEIRO", sexo: "Feminino", dataNascimento: "04/04/2001", anoSeletiva: 2025, idadeNoAno: 24 },
  { nome: "REGIANNE DE ARAUJO ALBUQUERQUE", sexo: "Feminino", dataNascimento: "19/03/2000", anoSeletiva: 2025, idadeNoAno: 25 },
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
  const sexoPredominante = feminino >= masculino ? "Feminino" : "Masculino";

  return {
    total,
    masculino,
    feminino,
    mediaIdade: mediaIdade.toFixed(1),
    sexoPredominante,
    percentFeminino: total > 0 ? ((feminino / total) * 100).toFixed(1) : "0",
    percentMasculino: total > 0 ? ((masculino / total) * 100).toFixed(1) : "0",
  };
}

export function getYearlyGenderData() {
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  
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

// Mapa de datas de nascimento por matrícula - fonte: DATAS_ATUALIZADAS_DISCENTES.docx
// Cobre turmas 03 a 14 (2013-2024)
export const studentBirthDates: Record<string, string> = {
  // TURMA 03 - 2013
  "2013100230": "06/01/1989", "2013100240": "06/06/1985", "2013100221": "09/01/1982",
  "2013100212": "13/06/1966", "2013100259": "28/07/1985", "2013100268": "13/01/1966",
  "2013100277": "12/09/1988", "2013100286": "08/05/1986", "2013100295": "31/05/1980",
  "2013100301": "10/01/1968", "2013100310": "13/04/1985", "2013100320": "16/05/1973",
  "2013100339": "02/08/1979",
  // TURMA 04 - 2014
  "2014100727": "29/08/1989", "2014100825": "12/12/1978", "2014100843": "26/12/1990",
  "2014100736": "02/03/1987", "2014100745": "22/06/1974", "2014100754": "16/08/1980",
  "2014100763": "25/09/1977", "2014103200": "11/10/1988", "2014100772": "09/07/1986",
  "2014100781": "18/09/1990", "2014100790": "08/05/1984", "2014100807": "20/02/1985",
  "2014100816": "11/11/1988",
  // TURMA 05 - 2015
  "2015100140": "25/10/1980", "2015100024": "04/05/1990", "2015100374": "24/04/1989",
  "2015100365": "30/12/1987", "2015100392": "06/06/1981", "2015100418": "01/07/1992",
  "2015100015": "05/05/1988", "2015100033": "21/02/1985", "2015100383": "30/10/1989",
  "2015100356": "28/11/1989", "2015100409": "28/11/1991",
  // TURMA 06 - 2016
  "2016104378": "08/10/1988", "2016104449": "29/06/1977", "2016104430": "02/03/1991",
  "2016104467": "04/10/1988", "2016104402": "02/08/1964", "2016104420": "13/09/1989",
  "2016104396": "23/08/1987", "2016104298": "15/08/1991", "2016104411": "11/09/1977",
  "2016104331": "12/10/1986", "2016104458": "12/09/1988",
  // TURMA 07 - 2017
  "2017102556": "16/06/1988", "2017102547": "09/01/1992", "2017102574": "08/01/1990",
  "2017102743": "29/11/1986", "2017102761": "25/08/1992", "2017102583": "18/11/1992",
  "2017102609": "29/11/1990", "2017102752": "03/11/1988", "2017102618": "16/02/1987",
  "2017102565": "25/09/1991", "2017102592": "14/12/1990", "2017102663": "24/11/1989",
  // TURMA 08 - 2018
  "2018104635": "19/05/1994", "2018103558": "02/12/1990", "2018103413": "31/03/1976",
  "2018103431": "04/03/1985", "2018103576": "13/08/1979", "2018103520": "31/03/1983",
  "2018103469": "04/03/1992", "2018103487": "01/03/1992", "2018103440": "29/10/1991",
  "2018103404": "08/12/1991", "2018103585": "28/03/1992", "2018103398": "22/12/1993",
  "2018103496": "01/12/1982", "2018103450": "16/07/1978",
  // TURMA 09 - 2019
  "2019104694": "24/12/1985", "2019104700": "22/03/1993", "2019104710": "14/02/1978",
  "2019104729": "31/01/1985", "2019104738": "13/09/1989", "2019104747": "14/11/1994",
  "2019104756": "30/12/1986", "2019106053": "19/02/1983", "2019105440": "12/09/1993",
  "2019104783": "23/10/1980", "2019104792": "06/12/1988",
  // TURMA 10 - 2020
  "2020103715": "28/01/1986", "2020103706": "08/08/1983", "2020103733": "08/10/1992",
  "2020103760": "17/03/1993", "2020103813": "01/07/1979", "2020103789": "03/08/1981",
  "2020103831": "01/05/1990", "2020103869": "23/08/1989", "2020103911": "13/10/1994",
  "2020103896": "04/04/1988", "2020104365": "26/10/1981", "2020103920": "11/01/1985",
  "2020103930": "26/05/1984",
  // TURMA 11 - 2021
  "2021102721": "07/03/1978", "2021102740": "29/08/1988", "2021110133": "15/10/1996",
  "2021102759": "25/03/1975", "2021102730": "23/07/1971", "2021110115": "06/02/1992",
  "2021102928": "05/03/1979", "2021102884": "03/02/1986", "2021102795": "01/12/1985",
  "2021110124": "24/02/1994", "2021102801": "29/03/1989", "2021102777": "16/01/1987",
  "2021102786": "30/08/1979", "2021102900": "08/04/1987", "2021102875": "18/03/1985",
  "2021102768": "14/12/1967",
  // TURMA 12 - 2022
  "2022103071": "05/09/1988", "2022103080": "19/03/1977", "2022103090": "08/09/1977",
  "2022103106": "13/07/1994", "2022103115": "03/05/1993", "2022103124": "10/12/1993",
  "2022103151": "11/02/1995", "2022103160": "12/03/1990", "2022103170": "29/10/1993",
  "2022103198": "02/09/1978", "2022103204": "02/08/1995",
  // TURMA 13 - 2023
  "2023105384": "15/09/1982", "2023105375": "19/10/1991", "2023102954": "22/09/1990",
  "2023105366": "04/06/1985", "2023105393": "27/05/1995", "2023105357": "29/12/1985",
  // TURMA 14 - 2024
  "20241006136": "18/02/1994", "20241004070": "27/01/1992", "20241004089": "02/10/1987",
  "20241004098": "11/04/1984", "20241004104": "23/10/1985", "20241004113": "02/03/1995",
  "20241004356": "21/08/1997", "20241004122": "25/02/1987", "20241004131": "24/08/1981",
  "20241004140": "24/06/1994", "20241004150": "08/11/1993", "20241004169": "31/05/1972",
  "20241004178": "13/12/1986", "20241004187": "13/05/1995", "20241004202": "04/08/1989",
  "20241004211": "16/05/1996", "20241004220": "06/09/1984",
};

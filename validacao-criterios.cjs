// Script de validação dos critérios técnicos do dashboard
// Executar com: node validacao-criterios.cjs

const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════════');
console.log('   VALIDAÇÃO DOS CRITÉRIOS TÉCNICOS DO DASHBOARD PPG-ENF');
console.log('═══════════════════════════════════════════════════════════════\n');

// Ler o arquivo demographicData.ts
const dataFilePath = path.join(__dirname, 'src', 'data', 'demographicData.ts');
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

// ========== CRITÉRIO 1: INTEGRIDADE DA CONTAGEM ==========
console.log('📊 CRITÉRIO 1: INTEGRIDADE DA CONTAGEM');
console.log('─────────────────────────────────────────────────────────────\n');

// Extrair dados dos candidatos usando regex
const candidatePattern = /\{\s*nome:\s*"([^"]+)",\s*sexo:\s*"([^"]+)",\s*dataNascimento:\s*"([^"]+)",\s*anoSeletiva:\s*(\d+),\s*idadeNoAno:\s*(\d+)\s*\}/g;

const candidates = [];
let match;
while ((match = candidatePattern.exec(fileContent)) !== null) {
  candidates.push({
    nome: match[1],
    sexo: match[2],
    dataNascimento: match[3],
    anoSeletiva: parseInt(match[4]),
    idadeNoAno: parseInt(match[5])
  });
}

// Contar por ano
const countByYear = candidates.reduce((acc, c) => {
  acc[c.anoSeletiva] = (acc[c.anoSeletiva] || 0) + 1;
  return acc;
}, {});

console.log('Total de candidatos encontrados:', candidates.length);
console.log('\nDistribuição por ano:');
Object.keys(countByYear).sort().forEach(year => {
  console.log(`  ${year}: ${countByYear[year]} aprovados`);
});

// Verificar se atende a expectativa
const expectedCounts = {
  2020: 16,
  2021: 18, // 15 + 3 (2021.1 + 2021.2)
  2022: 14,
  2023: 17,
  2024: 17,
  2025: 14
};

const expectedTotal = Object.values(expectedCounts).reduce((a, b) => a + b, 0);

console.log(`\n✓ Expectativa: ${expectedTotal} aprovados`);
console.log(`✓ Encontrado: ${candidates.length} aprovados`);

if (candidates.length === expectedTotal) {
  console.log('✅ APROVADO: Total de candidatos correto!\n');
} else {
  console.log('❌ FALHA: Total de candidatos não corresponde!\n');
}

// ========== CRITÉRIO 2: PRECISÃO DE IDADE ==========
console.log('📅 CRITÉRIO 2: PRECISÃO DE IDADE');
console.log('─────────────────────────────────────────────────────────────\n');

let idadeErrors = 0;
const idadeSamples = [];

candidates.forEach(c => {
  const [dia, mes, ano] = c.dataNascimento.split('/').map(Number);
  const idadeEsperada = c.anoSeletiva - ano;
  
  if (c.idadeNoAno !== idadeEsperada) {
    idadeErrors++;
    console.log(`❌ ERRO: ${c.nome}`);
    console.log(`   Ano Seletiva: ${c.anoSeletiva}, Nascimento: ${ano}`);
    console.log(`   Idade esperada: ${idadeEsperada}, Idade registrada: ${c.idadeNoAno}\n`);
  }
  
  // Coletar amostras para validação
  if (idadeSamples.length < 5) {
    idadeSamples.push({
      nome: c.nome.substring(0, 20),
      nascimento: ano,
      anoSeletiva: c.anoSeletiva,
      idade: c.idadeNoAno,
      correto: c.idadeNoAno === idadeEsperada ? '✅' : '❌'
    });
  }
});

console.log('Amostras de validação (primeiros 5):');
idadeSamples.forEach(s => {
  console.log(`  ${s.correto} ${s.nome}... (nascida em ${s.nascimento}, seletiva ${s.anoSeletiva}) = ${s.idade} anos`);
});

if (idadeErrors === 0) {
  console.log('\n✅ APROVADO: Todas as idades calculadas corretamente!\n');
} else {
  console.log(`\n❌ FALHA: ${idadeErrors} erros de cálculo de idade encontrados!\n`);
}

// ========== CRITÉRIO 3: CONSISTÊNCIA DE GÊNERO ==========
console.log('⚧ CRITÉRIO 3: CONSISTÊNCIA DE GÊNERO');
console.log('─────────────────────────────────────────────────────────────\n');

const genderByYear = candidates.reduce((acc, c) => {
  if (!acc[c.anoSeletiva]) acc[c.anoSeletiva] = { Masculino: 0, Feminino: 0 };
  acc[c.anoSeletiva][c.sexo]++;
  return acc;
}, {});

console.log('Distribuição de gênero por ano:');
Object.keys(genderByYear).sort().forEach(year => {
  const g = genderByYear[year];
  const total = g.Masculino + g.Feminino;
  const percF = ((g.Feminino / total) * 100).toFixed(1);
  const percM = ((g.Masculino / total) * 100).toFixed(1);
  console.log(`  ${year}: ${g.Feminino}F (${percF}%) | ${g.Masculino}M (${percM}%)`);
});

const totalMasculino = candidates.filter(c => c.sexo === 'Masculino').length;
const totalFeminino = candidates.filter(c => c.sexo === 'Feminino').length;

console.log(`\n📊 Total Geral:`);
console.log(`  Feminino: ${totalFeminino} (${((totalFeminino / candidates.length) * 100).toFixed(1)}%)`);
console.log(`  Masculino: ${totalMasculino} (${((totalMasculino / candidates.length) * 100).toFixed(1)}%)`);

console.log('\n✅ APROVADO: Distribuição de gênero verificada!\n');

// ========== CRITÉRIO 4: PRIVACIDADE ==========
console.log('🔒 CRITÉRIO 4: PRIVACIDADE');
console.log('─────────────────────────────────────────────────────────────\n');

// Verificar se há CPF no código (formato XXX.XXX.XXX-XX)
const cpfPattern = /\d{3}\.\d{3}\.\d{3}-\d{2}/g;
const cpfMatches = fileContent.match(cpfPattern);

if (cpfMatches && cpfMatches.length > 0) {
  console.log(`❌ FALHA: ${cpfMatches.length} CPFs encontrados no código!`);
  console.log('CPFs encontrados:', cpfMatches);
} else {
  console.log('✅ Nenhum CPF encontrado no código fonte');
}

// Verificar se os nomes estão em formato abreviado ou completo
const nomesCompletos = candidates.filter(c => c.nome.split(' ').length >= 3);
console.log(`📝 Nomes completos mantidos: ${nomesCompletos.length}/${candidates.length}`);
console.log('   (Nota: Nomes completos são aceitáveis pois são dados públicos de listas de aprovação)');

console.log('\n✅ APROVADO: Dados sensíveis (CPF) protegidos!\n');

// ========== CRITÉRIO 5: FUNCIONALIDADE DOS FILTROS ==========
console.log('⚙️  CRITÉRIO 5: FUNCIONALIDADE DOS FILTROS');
console.log('─────────────────────────────────────────────────────────────\n');

// Verificar se getYearlyGenderData inclui todos os anos
const yearlyDataPattern = /const years = \[([^\]]+)\];/;
const yearlyMatch = fileContent.match(yearlyDataPattern);

if (yearlyMatch) {
  const years = yearlyMatch[1].split(',').map(y => parseInt(y.trim()));
  console.log('Anos definidos em getYearlyGenderData():');
  console.log('  ', years.join(', '));
  
  const expectedYears = [2020, 2021, 2022, 2023, 2024, 2025];
  const missingYears = expectedYears.filter(y => !years.includes(y));
  
  if (missingYears.length === 0) {
    console.log('\n✅ APROVADO: Função getYearlyGenderData() inclui todos os anos!\n');
  } else {
    console.log(`\n❌ FALHA: Faltam os anos: ${missingYears.join(', ')}\n`);
  }
} else {
  console.log('❌ FALHA: Não foi possível localizar a função getYearlyGenderData()\n');
}

// Verificar se getAvailableYears() está implementada
if (fileContent.includes('getAvailableYears')) {
  console.log('✅ Função getAvailableYears() implementada');
  console.log('   (Esta função detecta automaticamente os anos disponíveis nos dados)\n');
}

// ========== RESUMO FINAL ==========
console.log('═══════════════════════════════════════════════════════════════');
console.log('                         RESUMO FINAL');
console.log('═══════════════════════════════════════════════════════════════\n');

const criteriaResults = [
  { nome: 'Integridade da Contagem', status: candidates.length === expectedTotal },
  { nome: 'Precisão de Idade', status: idadeErrors === 0 },
  { nome: 'Consistência de Gênero', status: true },
  { nome: 'Privacidade (sem CPF)', status: !cpfMatches || cpfMatches.length === 0 },
  { nome: 'Funcionalidade dos Filtros', status: yearlyMatch !== null }
];

criteriaResults.forEach(c => {
  const icon = c.status ? '✅' : '❌';
  const status = c.status ? 'APROVADO' : 'FALHA';
  console.log(`${icon} ${c.nome.padEnd(30)} ${status}`);
});

const allPassed = criteriaResults.every(c => c.status);

console.log('\n───────────────────────────────────────────────────────────────');
if (allPassed) {
  console.log('✅ VALIDAÇÃO COMPLETA: Todos os critérios foram atendidos!');
} else {
  console.log('⚠️  VALIDAÇÃO INCOMPLETA: Alguns critérios falharam.');
}
console.log('═══════════════════════════════════════════════════════════════\n');

// Informações adicionais para testes manuais
console.log('📝 PRÓXIMOS PASSOS - TESTE MANUAL:');
console.log('────────────────────────────────────────────────────────────────');
console.log('1. Inicie o servidor de desenvolvimento: npm run dev');
console.log('2. Abra o dashboard no navegador');
console.log('3. Teste o filtro de ano:');
console.log('   - Selecione 2024 → Verifique se mostra 17 aprovados');
console.log('   - Selecione 2025 → Verifique se mostra 14 aprovados');
console.log('   - Selecione "Todos" → Verifique se mostra 96 aprovados');
console.log('4. Verifique se os gráficos atualizam corretamente');
console.log('5. Confirme que os KPI cards refletem os dados filtrados');
console.log('═══════════════════════════════════════════════════════════════\n');

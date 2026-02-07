/**
 * 🔍 Script de Validação de Dados Demográficos
 * 
 * Execute este script para validar os dados antes de fazer deploy:
 * node validate-data.js
 * 
 * Verifica:
 * - Formato de datas
 * - Cálculo de idades
 * - Valores de sexo válidos
 * - Dados duplicados
 * - Estrutura correta
 */

import { approvedCandidates } from './src/data/demographicData.ts';

let errors = [];
let warnings = [];
let success = true;

console.log('🔍 Iniciando validação dos dados demográficos...\n');

// Validar cada candidato
approvedCandidates.forEach((candidato, index) => {
  const posicao = `Candidato #${index + 1} (${candidato.nome})`;

  // 1. Validar nome
  if (!candidato.nome || candidato.nome.trim() === '') {
    errors.push(`❌ ${posicao}: Nome vazio`);
    success = false;
  }

  // 2. Validar sexo
  if (candidato.sexo !== 'Feminino' && candidato.sexo !== 'Masculino') {
    errors.push(`❌ ${posicao}: Sexo inválido "${candidato.sexo}". Use "Feminino" ou "Masculino"`);
    success = false;
  }

  // 3. Validar formato da data
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(candidato.dataNascimento)) {
    errors.push(`❌ ${posicao}: Data de nascimento inválida "${candidato.dataNascimento}". Use DD/MM/AAAA`);
    success = false;
  } else {
    // Validar se é uma data real
    const [dia, mes, ano] = candidato.dataNascimento.split('/').map(Number);
    const data = new Date(ano, mes - 1, dia);
    
    if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) {
      errors.push(`❌ ${posicao}: Data de nascimento inválida (não existe no calendário)`);
      success = false;
    }

    // Verificar se a data não é futura
    if (ano > new Date().getFullYear()) {
      errors.push(`❌ ${posicao}: Data de nascimento no futuro`);
      success = false;
    }

    // Verificar idade calculada
    const idadeCalculada = candidato.anoSeletiva - ano;
    if (candidato.idadeNoAno !== idadeCalculada) {
      errors.push(`❌ ${posicao}: Idade incorreta. Deveria ser ${idadeCalculada}, mas está ${candidato.idadeNoAno}`);
      success = false;
    }

    // Avisar sobre idades incomuns
    if (idadeCalculada < 20) {
      warnings.push(`⚠️  ${posicao}: Idade muito jovem (${idadeCalculada} anos)`);
    }
    if (idadeCalculada > 65) {
      warnings.push(`⚠️  ${posicao}: Idade avançada (${idadeCalculada} anos)`);
    }
  }

  // 4. Validar ano da seletiva
  if (candidato.anoSeletiva < 2010 || candidato.anoSeletiva > 2030) {
    warnings.push(`⚠️  ${posicao}: Ano da seletiva incomum (${candidato.anoSeletiva})`);
  }

  // 5. Validar idade no ano
  if (candidato.idadeNoAno < 0 || candidato.idadeNoAno > 120) {
    errors.push(`❌ ${posicao}: Idade no ano inválida (${candidato.idadeNoAno})`);
    success = false;
  }
});

// Verificar duplicatas (mesmo nome e ano)
const chaves = approvedCandidates.map(c => `${c.nome}|${c.anoSeletiva}`);
const duplicatas = chaves.filter((chave, index) => chaves.indexOf(chave) !== index);
if (duplicatas.length > 0) {
  const nomesDuplicados = [...new Set(duplicatas.map(d => d.split('|')[0]))];
  errors.push(`❌ Candidatos duplicados encontrados: ${nomesDuplicados.join(', ')}`);
  success = false;
}

// Estatísticas gerais
const total = approvedCandidates.length;
const porAno = approvedCandidates.reduce((acc, c) => {
  acc[c.anoSeletiva] = (acc[c.anoSeletiva] || 0) + 1;
  return acc;
}, {});
const masculino = approvedCandidates.filter(c => c.sexo === 'Masculino').length;
const feminino = approvedCandidates.filter(c => c.sexo === 'Feminino').length;

// Exibir resultados
console.log('📊 ESTATÍSTICAS GERAIS');
console.log('═══════════════════════');
console.log(`Total de candidatos: ${total}`);
console.log(`Feminino: ${feminino} (${(feminino/total*100).toFixed(1)}%)`);
console.log(`Masculino: ${masculino} (${(masculino/total*100).toFixed(1)}%)`);
console.log('\nDistribuição por ano:');
Object.entries(porAno).sort().forEach(([ano, qtd]) => {
  console.log(`  ${ano}: ${qtd} candidatos`);
});

console.log('\n');

// Exibir warnings
if (warnings.length > 0) {
  console.log('⚠️  AVISOS');
  console.log('═══════════════════════');
  warnings.forEach(w => console.log(w));
  console.log('\n');
}

// Exibir erros
if (errors.length > 0) {
  console.log('❌ ERROS ENCONTRADOS');
  console.log('═══════════════════════');
  errors.forEach(e => console.log(e));
  console.log('\n');
}

// Resultado final
if (success && warnings.length === 0) {
  console.log('✅ VALIDAÇÃO CONCLUÍDA COM SUCESSO!');
  console.log('═══════════════════════════════════');
  console.log('Todos os dados estão corretos. Você pode fazer o deploy com segurança.\n');
  process.exit(0);
} else if (success) {
  console.log('✅ VALIDAÇÃO CONCLUÍDA (COM AVISOS)');
  console.log('═══════════════════════════════════');
  console.log(`${warnings.length} aviso(s) encontrado(s), mas nenhum erro crítico.`);
  console.log('Você pode fazer o deploy, mas revise os avisos acima.\n');
  process.exit(0);
} else {
  console.log('❌ VALIDAÇÃO FALHOU');
  console.log('═══════════════════════════════════');
  console.log(`${errors.length} erro(s) crítico(s) encontrado(s).`);
  console.log('Corrija os erros antes de fazer o deploy!\n');
  process.exit(1);
}

const fs = require('fs');

const content = fs.readFileSync('src/data/demographicData.ts', 'utf8');

// Remover comentários de bloco e de linha
const semComentariosBloco = content.replace(/\/\*[\s\S]*?\*\//g, '');
const semComentarios = semComentariosBloco.replace(/\/\/.*/g, '');

// Encontrar apenas os dados do array approvedCandidates
const arrayMatch = semComentarios.match(/approvedCandidates.*?=\s*\[([\s\S]*?)\];/);

if (!arrayMatch) {
  console.log('Array approvedCandidates não encontrado');
  process.exit(1);
}

const arrayContent = arrayMatch[1];

// Contar por ano
const seletivos = {};
const lines = arrayContent.split('\n');

lines.forEach(line => {
  const match = line.match(/anoSeletiva:\s*(\d{4})/);
  if (match) {
    const ano = match[1];
    seletivos[ano] = (seletivos[ano] || 0) + 1;
  }
});

console.log('Candidatos por seletiva (apenas array real):');
let total = 0;
Object.entries(seletivos).sort().forEach(([ano, qtd]) => {
  console.log(`  ${ano}: ${qtd} candidatos`);
  total += qtd;
});
console.log(`\nTotal: ${total} candidatos`);

// Verificar candidatos duplicados
const nomesMap = new Map();
lines.forEach((line, idx) => {
  const match = line.match(/nome:\s*"([^"]+)"/);
  if (match) {
    const nome = match[1];
    if (nomesMap.has(nome)) {
      console.log(`\n⚠️  DUPLICADO: "${nome}"`);
      console.log(`   Primeira ocorrência: linha ${nomesMap.get(nome)}`);
      console.log(`   Segunda ocorrência: linha ${idx}`);
    } else {
      nomesMap.set(nome, idx);
    }
  }
});

if (nomesMap.size === 0) {
  console.log('\n✓ Nenhuma duplicata encontrada');
}

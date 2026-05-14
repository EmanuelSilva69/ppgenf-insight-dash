const fs = require('fs');

const content = fs.readFileSync('src/data/demographicData.ts', 'utf8');

// Contar total de objetos { nome:
const matches = content.match(/\{ nome:/g);
console.log('Total de candidatos no array:', matches ? matches.length : 0);

// Contar por ano
const seletivos = { 2020: 0, 2021: 0, 2022: 0, 2023: 0, 2024: 0, 2025: 0 };
const lines = content.split('\n');

lines.forEach(line => {
  const match = line.match(/anoSeletiva:\s*(\d{4})/);
  if (match) {
    seletivos[match[1]]++;
  }
});

console.log('\nCandidatos por seletiva:');
Object.entries(seletivos).forEach(([ano, qtd]) => {
  console.log(`  ${ano}: ${qtd} candidatos`);
});

const total = Object.values(seletivos).reduce((a, b) => a + b, 0);
console.log('\nSoma total:', total);

// Verificar duplicatas de nomes
const nomes = [];
const duplicatas = [];
lines.forEach(line => {
  const match = line.match(/nome:\s*"([^"]+)"/);
  if (match) {
    const nome = match[1];
    if (nomes.includes(nome)) {
      duplicatas.push(nome);
    } else {
      nomes.push(nome);
    }
  }
});

if (duplicatas.length > 0) {
  console.log('\n⚠️  DUPLICATAS ENCONTRADAS:');
  duplicatas.forEach(nome => console.log(`  - ${nome}`));
} else {
  console.log('\n✓ Nenhuma duplicata encontrada');
}

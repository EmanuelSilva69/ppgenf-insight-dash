// Script para listar todos os candidatos de 2024 e encontrar duplicados
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'src', 'data', 'demographicData.ts');
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

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

// Filtrar apenas 2024
const candidatos2024 = candidates.filter(c => c.anoSeletiva === 2024);

console.log('═══════════════════════════════════════════════════════════════');
console.log('CANDIDATOS DE 2024 (Total:', candidatos2024.length, ')');
console.log('═══════════════════════════════════════════════════════════════\n');

candidatos2024.forEach((c, index) => {
  console.log(`${index + 1}. ${c.nome}`);
  console.log(`   Sexo: ${c.sexo}, Nascimento: ${c.dataNascimento}, Idade: ${c.idadeNoAno}\n`);
});

// Verificar duplicados
const nomes = candidatos2024.map(c => c.nome);
const duplicados = nomes.filter((nome, index) => nomes.indexOf(nome) !== index);

if (duplicados.length > 0) {
  console.log('\n⚠️  DUPLICADOS ENCONTRADOS:');
  duplicados.forEach(nome => console.log('  -', nome));
} else {
  console.log('\n✅ Nenhum nome duplicado encontrado');
}

// Listar todos os nomes em ordem alfabética
console.log('\n═══════════════════════════════════════════════════════════════');
console.log('NOMES EM ORDEM ALFABÉTICA:');
console.log('═══════════════════════════════════════════════════════════════\n');

const nomesOrdenados = [...nomes].sort();
nomesOrdenados.forEach((nome, index) => {
  console.log(`${index + 1}. ${nome}`);
});

# 📝 Template para Novos Candidatos

## Use este template para adicionar rapidamente novos candidatos aprovados

### Copie e cole este bloco no arquivo `src/data/demographicData.ts`

```typescript
// === SELETIVO 20XX (XX aprovados) ===
{ nome: "", sexo: "Feminino", dataNascimento: "DD/MM/AAAA", anoSeletiva: 20XX, idadeNoAno: XX },
{ nome: "", sexo: "Feminino", dataNascimento: "DD/MM/AAAA", anoSeletiva: 20XX, idadeNoAno: XX },
{ nome: "", sexo: "Masculino", dataNascimento: "DD/MM/AAAA", anoSeletiva: 20XX, idadeNoAno: XX },
```

---

## 🧮 Calculadora de Idade Rápida

Para calcular a `idadeNoAno`:

```
idadeNoAno = anoSeletiva - anoNascimento
```

### Exemplos:

| Data Nascimento | Ano Seletiva | Cálculo | Idade no Ano |
|-----------------|--------------|---------|--------------|
| 15/03/1995 | 2024 | 2024 - 1995 | 29 |
| 22/08/1992 | 2024 | 2024 - 1992 | 32 |
| 10/11/1998 | 2023 | 2023 - 1998 | 25 |
| 05/07/1990 | 2025 | 2025 - 1990 | 35 |

---

## 📋 Template Excel para Organização

Se você está coletando dados de PDFs, organize assim no Excel primeiro:

| Nome Completo | Sexo | Data Nascimento | Ano Seletiva | Idade |
|---------------|------|-----------------|--------------|-------|
| MARIA DA SILVA | Feminino | 15/03/1995 | 2024 | 29 |
| JOÃO SANTOS | Masculino | 22/08/1992 | 2024 | 32 |

Depois, converta cada linha para o formato TypeScript:

```typescript
{ nome: "MARIA DA SILVA", sexo: "Feminino", dataNascimento: "15/03/1995", anoSeletiva: 2024, idadeNoAno: 29 },
{ nome: "JOÃO SANTOS", sexo: "Masculino", dataNascimento: "22/08/1992", anoSeletiva: 2024, idadeNoAno: 32 },
```

---

## 🔄 Converter Rapidamente (VS Code)

1. Organize seus dados no Excel seguindo a tabela acima
2. Copie as linhas do Excel
3. No VS Code, use Find & Replace (Ctrl+H):
   - Habilite **Regex** (Alt+R)
   - Find: `^(.+?)\t(.+?)\t(.+?)\t(.+?)\t(.+?)$`
   - Replace: `{ nome: "$1", sexo: "$2", dataNascimento: "$3", anoSeletiva: $4, idadeNoAno: $5 },`

---

## ✅ Checklist por Candidato

Antes de adicionar, verifique:

- [ ] Nome está em MAIÚSCULAS
- [ ] Sexo é exatamente "Feminino" ou "Masculino"
- [ ] Data no formato DD/MM/AAAA (com barras)
- [ ] Ano da seletiva está correto
- [ ] Idade foi calculada corretamente (ano seletiva - ano nascimento)
- [ ] Tem vírgula no final da linha (exceto a última)

---

## 🚀 Depois de Adicionar

1. Salve o arquivo (Ctrl+S)
2. Teste localmente: `npm run dev`
3. Faça o build: `npm run build`
4. Deploy: `vercel --prod`

---

## 📝 Exemplo Completo

```typescript
// === SELETIVO 2024 (5 aprovados) ===
{ nome: "AMANDA SILVA OLIVEIRA", sexo: "Feminino", dataNascimento: "10/01/1996", anoSeletiva: 2024, idadeNoAno: 28 },
{ nome: "BRUNO COSTA SANTOS", sexo: "Masculino", dataNascimento: "15/05/1994", anoSeletiva: 2024, idadeNoAno: 30 },
{ nome: "CARLA FERREIRA LIMA", sexo: "Feminino", dataNascimento: "22/08/1992", anoSeletiva: 2024, idadeNoAno: 32 },
{ nome: "DANIEL PEREIRA ROCHA", sexo: "Masculino", dataNascimento: "30/11/1995", anoSeletiva: 2024, idadeNoAno: 29 },
{ nome: "EDUARDA SOUZA ALVES", sexo: "Feminino", dataNascimento: "05/03/1998", anoSeletiva: 2024, idadeNoAno: 26 },
```

---

💡 **Dica**: Guarde este template aberto enquanto processa PDFs para copiar e colar rapidamente!

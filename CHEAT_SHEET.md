# ⚡ COMANDOS RÁPIDOS - CHEAT SHEET

## 🚀 DEPLOY NO VERCEL

```bash
# Primeira vez (instalar CLI)
npm install -g vercel

# Login no Vercel
vercel login

# Deploy para teste
vercel

# Deploy para produção
vercel --prod
```

---

## 💻 DESENVOLVIMENTO LOCAL

```bash
# Instalar dependências (primeira vez)
npm install

# Rodar servidor de desenvolvimento
npm run dev
# Acesse: http://localhost:8080

# Fazer build
npm run build

# Preview do build
npm run preview
```

---

## 📊 ADICIONAR DADOS

### 1️⃣ Abrir arquivo:
```
src/data/demographicData.ts
```

### 2️⃣ Adicionar candidato:
```typescript
{ 
  nome: "NOME COMPLETO", 
  sexo: "Feminino",  // ou "Masculino"
  dataNascimento: "DD/MM/AAAA", 
  anoSeletiva: 2024, 
  idadeNoAno: XX  // anoSeletiva - anoNascimento
},
```

### 3️⃣ Calcular idade:
```
idadeNoAno = anoSeletiva - anoNascimento
Exemplo: 2024 - 1995 = 29
```

---

## 🔍 VALIDAÇÃO

```bash
# Validar dados antes de fazer deploy
node validate-data.js
```

---

## 🛠️ SOLUÇÃO DE PROBLEMAS

```bash
# Limpar tudo e reinstalar
rm -rf node_modules dist
npm install

# Atualizar browserslist
npx update-browserslist-db@latest

# Verificar versão do Node
node --version  # Deve ser >= 18

# Limpar cache do npm
npm cache clean --force
```

---

## 📁 ARQUIVOS PRINCIPAIS

| Onde | O que |
|------|-------|
| `src/data/demographicData.ts` | 👈 **ADICIONE DADOS AQUI** |
| `src/components/dashboard/` | Componentes visuais |
| `vercel.json` | Configuração Vercel |

---

## 🔗 LINKS ÚTEIS

- 📖 Guia completo: `DEPLOYMENT.md`
- 📝 Templates: `TEMPLATE.md`
- 🚀 Início rápido: `START_HERE.md`
- 🌐 Vercel Dashboard: https://vercel.com/dashboard

---

## ⚡ WORKFLOW COMPLETO

```bash
# 1. Adicionar dados
# Edite: src/data/demographicData.ts

# 2. Testar localmente
npm run dev

# 3. Validar
node validate-data.js

# 4. Build
npm run build

# 5. Deploy
vercel --prod
```

---

## 🎯 EXEMPLO RÁPIDO

```typescript
// Dados do PDF:
// Nome: MARIA SILVA
// Sexo: Feminino
// Nascimento: 10/05/1996
// Seletiva: 2024

// Calcular: 2024 - 1996 = 28

// Adicionar:
{ nome: "MARIA SILVA", sexo: "Feminino", dataNascimento: "10/05/1996", anoSeletiva: 2024, idadeNoAno: 28 },
```

---

## 🆘 EMERGÊNCIA

### Deploy falhou?
```bash
npm run build
# Se build passar, tente novamente:
vercel --prod
```

### Dados não aparecem?
```bash
# Limpe cache do navegador: Ctrl+Shift+R
# Ou tente em aba anônima
```

### Erro de sintaxe?
```bash
# Verifique vírgulas e aspas em:
src/data/demographicData.ts
```

---

## ✅ CHECKLIST DIÁRIO

Ao adicionar novos dados:

- [ ] Editei `src/data/demographicData.ts`
- [ ] Calculei as idades corretamente
- [ ] Rodei `node validate-data.js`
- [ ] Testei com `npm run dev`
- [ ] Fiz build com `npm run build`
- [ ] Deploy com `vercel --prod`

---

**💾 Salve este arquivo para referência rápida!**

# 🚀 Guia Completo de Deployment e Manutenção

## Deploy no Vercel (Teste Rápido)

### Método 1: Via Vercel CLI (Recomendado)

```bash
# 1. Instale a CLI do Vercel globalmente (apenas uma vez)
npm install -g vercel

# 2. Na raiz do projeto, execute:
vercel

# 3. Siga as instruções:
# - Set up and deploy? Y
# - Which scope? (escolha sua conta)
# - Link to existing project? N
# - What's your project's name? ppgenf-insight-dash
# - In which directory is your code located? ./
# - Want to override the settings? N

# 4. Para deploy em produção (após testar):
vercel --prod
```

### Método 2: Via Dashboard Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe o repositório do GitHub/GitLab/Bitbucket
3. Aguarde a detecção automática das configurações (via `vercel.json`)
4. Clique em **"Deploy"**
5. ✅ Pronto! Seu dashboard estará no ar

---

## 📊 Como Adicionar Novos Dados Demográficos

### Localização do Arquivo
`src/data/demographicData.ts`

### Passo a Passo

1. **Abra o arquivo** `src/data/demographicData.ts`

2. **Localize a seção do ano** correspondente (ex: `SELETIVO 2024`)

3. **Adicione novos candidatos** seguindo este formato exato:

```typescript
// === SELETIVO 2024 (15 aprovados) ===
{ 
  nome: "NOME COMPLETO EM MAIÚSCULAS", 
  sexo: "Feminino",  // ou "Masculino"
  dataNascimento: "15/03/1995",  // formato DD/MM/AAAA
  anoSeletiva: 2024, 
  idadeNoAno: 29  // idade no ano da seletiva
},
```

4. **Calcule a idade**: `idadeNoAno = anoSeletiva - anoNascimento`
   - Exemplo: 2024 - 1995 = 29

5. **Salve o arquivo** (Ctrl+S)

6. **Teste localmente** (opcional):
```bash
npm run dev
```

7. **Faça o deploy**:
```bash
vercel --prod
```

### ⚠️ Atenções Importantes

- ✅ Use **MAIÚSCULAS** nos nomes
- ✅ Sexo deve ser **exatamente** `"Feminino"` ou `"Masculino"`
- ✅ Data de nascimento no formato `"DD/MM/AAAA"`
- ✅ Mantenha a vírgula no final de cada objeto (exceto o último)
- ✅ Atualize o número de aprovados no comentário

### Exemplo Completo

```typescript
// === SELETIVO 2024 (3 aprovados) ===
{ 
  nome: "MARIA DA SILVA SANTOS", 
  sexo: "Feminino", 
  dataNascimento: "10/05/1996", 
  anoSeletiva: 2024, 
  idadeNoAno: 28 
},
{ 
  nome: "JOÃO PEDRO OLIVEIRA", 
  sexo: "Masculino", 
  dataNascimento: "22/08/1992", 
  anoSeletiva: 2024, 
  idadeNoAno: 32 
},
{ 
  nome: "ANA CAROLINA FERREIRA", 
  sexo: "Feminino", 
  dataNascimento: "15/12/1998", 
  anoSeletiva: 2024, 
  idadeNoAno: 26 
},
```

---

## 🔄 Atualização Automática

Após adicionar novos dados, **todos os componentes são atualizados automaticamente**:

- ✅ Cards de resumo (total, média, gênero predominante)
- ✅ Gráfico de pizza (proporção M/F)
- ✅ Histograma de faixas etárias
- ✅ Evolução anual por gênero
- ✅ Filtro por ano (novos anos aparecem automaticamente)

Não é necessário modificar mais nenhum arquivo!

---

## 🛠 Comandos Úteis

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento local
npm run dev

# Fazer build de produção
npm run build

# Preview do build local
npm run preview

# Deploy no Vercel (teste)
vercel

# Deploy no Vercel (produção)
vercel --prod

# Atualizar navegadores suportados
npx update-browserslist-db@latest
```

---

## 📁 Estrutura de Dados

Cada candidato aprovado tem esta estrutura:

```typescript
interface ApprovedCandidate {
  nome: string;               // Nome completo
  sexo: "Masculino" | "Feminino";
  dataNascimento: string;     // DD/MM/YYYY
  anoSeletiva: number;        // Ano da seletiva
  idadeNoAno: number;         // Idade calculada
}
```

---

## 🆘 Problemas Comuns

### Erro: "Unexpected token" ou syntax error
- ✅ Verifique se todas as vírgulas estão corretas
- ✅ Certifique-se de usar aspas duplas `"` nos valores string

### Gráficos não atualizam
- ✅ Limpe o cache do navegador (Ctrl+Shift+R)
- ✅ Verifique se salvou o arquivo corretamente
- ✅ Rode `npm run build` novamente

### Deploy falhou no Vercel
- ✅ Verifique se o build local está funcionando: `npm run build`
- ✅ Veja os logs de erro no dashboard do Vercel
- ✅ Certifique-se de que não há erros de sintaxe

---

## 📞 Suporte

Para dúvidas sobre:
- **Estrutura de dados**: veja exemplos em `src/data/demographicData.ts`
- **Componentes visuais**: veja `src/components/dashboard/`
- **Deploy**: consulte [docs.vercel.com](https://vercel.com/docs)

---

## ✅ Checklist Final

Antes de fazer deploy em produção:

- [ ] Adicionei todos os candidatos do novo ano
- [ ] Verifiquei os cálculos de idade
- [ ] Testei localmente com `npm run dev`
- [ ] O build está passando com `npm run build`
- [ ] Fiz commit das mudanças
- [ ] Executei `vercel --prod`

---

🎉 **Pronto! Seu dashboard está atualizado e no ar!**

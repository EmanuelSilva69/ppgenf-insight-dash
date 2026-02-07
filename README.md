# 🏥 Portal do Mestrado em Enfermagem

Este repositório contém o código-fonte do portal web informativo para os discentes do Programa de Mestrado em Enfermagem.

O objetivo do sistema é centralizar comunicações, cronogramas, editais e informações gerais do curso em uma interface moderna e acessível.

## 🛠 Tecnologias Utilizadas

O projeto é uma **SPA (Single Page Application)** estática, construída com foco em performance e facilidade de hospedagem.

* **Framework:** React + Vite
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS + Shadcn-ui
* **Infraestrutura:** Docker + Nginx (Alpine)

---

## 🚀 Guia de Instalação e Deploy (Para o TI/Servidor)

A aplicação está containerizada para facilitar o deploy em qualquer infraestrutura institucional. O container utiliza um **Multi-stage build** que resulta em uma imagem leve (Alpine) servindo arquivos estáticos via Nginx.

### Pré-requisitos
* Docker instalado.

### Passo 1: Construir a Imagem
Na raiz do projeto, execute:

```bash
docker build -t portal-enfermagem .
```
Passo 2: Rodar o Container
Para iniciar o servidor web na porta 80 (ou outra porta de preferência):

Exemplo rodando na porta 80 do host
docker run -d -p 80:80 --name mestrado-web portal-enfermagem

Nota sobre Rotas: O container já possui um arquivo nginx.conf configurado internamente para lidar com o roteamento de SPA (redirecionando rotas desconhecidas para o index.html), evitando erros 404 ao atualizar a página.

## Guia de Desenvolvimento (Para Edição)
Caso seja necessário realizar alterações no código (texto, layouts, novas páginas):

Pré-requisitos
Node.js (versão 18 ou superior)

npm

Instalação
Clone o repositório.

Instale as dependências:
```
npm install
```
### Rodar Localmente
Para abrir o modo de desenvolvimento com hot-reload:
```
npm run dev
```
O projeto estará disponível em http://localhost:8080 (ou a porta indicada no terminal).

### Gerar Build Manualmente

Se não for usar Docker e quiser apenas os arquivos estáticos para servir em Apache/Nginx padrão:
```
npm run build
```
Os arquivos finais otimizados estarão na pasta /dist.

## ☁️ Deploy Rápido no Vercel

Para fazer deploy rápido para testes:

### Opção 1: Via CLI
```bash
# Instalar Vercel CLI (se ainda não tiver)
npm i -g vercel

# Na raiz do projeto
vercel

# Para deploy em produção
vercel --prod
```

### Opção 2: Via Dashboard Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Importe o repositório do GitHub/GitLab
3. As configurações do `vercel.json` serão detectadas automaticamente
4. Clique em "Deploy"

O projeto já está configurado com `vercel.json` otimizado para SPAs React.

---

## 📂 Estrutura de Pastas
src/: Todo o código fonte, páginas e componentes.

public/: Imagens e assets estáticos.

Dockerfile: Configuração da imagem do container.

nginx.conf: Configuração do servidor web para produção.

vercel.json: Configuração para deploy no Vercel.

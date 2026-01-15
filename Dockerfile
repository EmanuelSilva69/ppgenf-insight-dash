# Estágio 1: Build (Construção)
FROM node:20-alpine as build

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Gera o build de produção (cria a pasta dist)
RUN npm run build

# Estágio 2: Servidor (Produção)
FROM nginx:alpine

# Copia a configuração customizada do Nginx (veja passo 2)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados no estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]

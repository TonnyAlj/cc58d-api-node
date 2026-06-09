# Imagem oficial do Node.js
FROM node:24-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala apenas as dependências de produção
RUN npm install --omit=dev

# Copia o restante da aplicação
COPY . .

# Porta utilizada pelo Express
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
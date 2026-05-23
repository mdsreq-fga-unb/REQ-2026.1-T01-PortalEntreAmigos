# 1. Usa o Linux com o Node.js
FROM node:20-alpine

# 2. Define a pasta de trabalho
WORKDIR /app

# 3. Copia APENAS os arquivos de pacotes primeiro (deixa o Docker muito mais rápido)
COPY package*.json ./

# 4. Instala as dependências do React
RUN npm install

# 5. Copia o resto do código
COPY . .

# 6. Expõe a porta do Vite
EXPOSE 5173

# 7. Liga o servidor do Vite (o --host avisa para aceitar conexões fora do contêiner)
CMD ["npm", "run", "dev", "--", "--host"]
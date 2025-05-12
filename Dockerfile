FROM node:15

WORKDIR /usr/src/app
COPY . .

RUN apt-get update && apt-get install -y wget

RUN wget https://github.com/jwilder/dockerize/releases/download/v0.9.3/dockerize-alpine-linux-amd64-v0.9.3.tar.gz\
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.9.3.tar.gz \
    && rm dockerize-alpine-linux-amd64-v0.9.3.tar.gz 

# Copiar os arquivos da aplicação e instalar dependências

RUN npm install
EXPOSE 3000

# Comando de inicialização usando o dockerize
CMD ["dockerize", "-wait", "tcp://db:3306", "-timeout", "30s", "npm", "start"]

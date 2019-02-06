FROM bitnami/rabbitmq:latest
EXPOSE 5672:5762 15672:15762

FROM node:9.0.0
WORKDIR /src
COPY . /src
RUN npm install
RUN ls ./src
RUN node ./src/rabbot.js

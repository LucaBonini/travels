FROM node:lts-alpine
RUN apk add g++ make python3

WORKDIR /

COPY ./package.json ./
RUN npm install

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]
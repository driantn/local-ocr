FROM node:lts-alpine3.10

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp git python make g++ \
    && npm install \
    && apk del .gyp git

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
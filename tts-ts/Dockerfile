FROM node:18 AS builder

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz


WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

FROM node:18

COPY --from=builder /usr/local/bin/dockerize /usr/local/bin/dockerize
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts.sh ./scripts.sh
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/front /dist/front



EXPOSE 3331
EXPOSE 3333


CMD dockerize -wait tcp://db:3306 -timeout 100s sh scripts.sh

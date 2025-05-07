FROM node:lts-alpine3.19 AS builder
WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:lts-alpine3.19

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3300
CMD [ "npm", "run", "start:prod" ]

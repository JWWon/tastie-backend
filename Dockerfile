FROM node:12.14.1-alpine AS builder
WORKDIR /app

COPY src /app/src
COPY package.json tsconfig.json tsconfig.build.json /app/

RUN npm install --save-dev
RUN npm run build

# production stage
FROM node:12.14.1-alpine
WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY package.json /app/

RUN npm install --production

ENTRYPOINT [ "npm", "run", "start:prod" ]

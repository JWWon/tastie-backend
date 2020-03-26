FROM node:12.14.1-alpine AS builder
WORKDIR /app

COPY src /app/src
COPY package*.json tsconfig.json tsconfig.build.json /app/

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm ci && \
    npm run build

# production stage
FROM node:12.14.1-alpine
WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY package*.json /app/

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm ci --only=production

ENV NODE_ENV=production

ENTRYPOINT [ "npm", "run", "start:prod" ]

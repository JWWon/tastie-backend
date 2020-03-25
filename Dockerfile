# syntax = docker/dockerfile:experimental
FROM node:12.14.1-alpine AS builder
WORKDIR /app

COPY src /app/src
COPY package*.json tsconfig.json tsconfig.build.json /app/

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm ci && \
    npm run build
# RUN --mount=type=cache,target=/app/node_modules npm ci --only=production
# RUN cp -R node_modules prod_node_modules

# RUN npm run build

# production stage
FROM node:12.14.1-alpine
WORKDIR /app

COPY --from=builder /app/dist /app/dist
# COPY --from=builder /app/prod_node_modules /app/node_modules
COPY package*.json /app/

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm ci --only=production

ENV NODE_ENV=production

ENTRYPOINT [ "npm", "run", "start:prod" ]

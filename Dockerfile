FROM node:12.14.1-alpine AS builder
WORKDIR /app

COPY src /app/src
COPY package.json tsconfig.json tsconfig.build.json /app/

RUN npm set progress=false && npm config set depth 0
RUN npm install --production
RUN cp -R node_modules prod_node_modules
RUN npm install
RUN npm run build

# production stage
FROM node:12.14.1-alpine
WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/prod_node_modules /app/node_modules
COPY package.json /app/

# RUN npm set progress=false && \
#     npm config set depth 0 && \
#     npm install --production && \
#     npm cache clean

ENTRYPOINT [ "npm", "run", "start:prod" ]

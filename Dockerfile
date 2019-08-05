FROM node:10.16.0-alpine AS build
COPY . /src
WORKDIR /src
RUN yarn install
RUN yarn run build
RUN yarn install --production

FROM node:10.16.0-alpine
EXPOSE 4000

WORKDIR /app
COPY --from=build ./src/node_modules node_modules
COPY --from=build /src/dist dist
COPY .env.example .
RUN apk add --no-cache curl bash
HEALTHCHECK CMD curl --fail http://localhost:4000/.well-known/apollo/server-health || exit 1
CMD ["node", "dist/index.js"]
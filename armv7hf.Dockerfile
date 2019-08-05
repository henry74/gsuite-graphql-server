FROM balenalib/armv7hf-alpine-node AS build
COPY . /src
WORKDIR /src
RUN [ "cross-build-start" ]
RUN yarn install
RUN yarn run build
RUN yarn install --production
RUN [ "cross-build-end" ]

FROM balenalib/armv7hf-alpine-node
EXPOSE 4000

WORKDIR /app
COPY --from=build ./src/node_modules node_modules
COPY --from=build /src/dist dist
COPY .env.example .
RUN [ "cross-build-start" ]
RUN install_packages bash curl
RUN [ "cross-build-end" ]
HEALTHCHECK CMD curl --fail http://localhost:4000/.well-known/apollo/server-health || exit 1
CMD ["node", "dist/index.js"]
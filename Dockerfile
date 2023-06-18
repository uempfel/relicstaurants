FROM node:20-alpine3.17
COPY build /workdir/build
COPY server /workdir/server
COPY node_modules /workdir/node_modules
CMD node /workdir/server/start.js

FROM node:20-alpine3.17
COPY package.json /workdir/package.json
COPY package-lock.json /workdir/package-lock.json
COPY build /workdir/build
COPY server /workdir/server
WORKDIR /workdir
RUN npm install
CMD node /workdir/server/start.js

FROM node:12

WORKDIR /usr/src/app

COPY api/package*.json ./

RUN npm install --only=prod

COPY api .

RUN chmod +x bin/wait-for-it.sh

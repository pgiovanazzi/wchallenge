FROM node:12

WORKDIR /usr/src/app

COPY api/package*.json .

RUN npm install --only=prod

COPY api .

EXPOSE 3000

CMD ["node", "app.js"]

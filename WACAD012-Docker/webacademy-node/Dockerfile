FROM node:18.16-slim

WORKDIR /home/app

ARG PORT=8000

ENV APP_PORT=${PORT}

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]

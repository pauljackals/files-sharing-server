FROM node:16.15-alpine3.15

ARG NODE_ENV=${NODE_ENV}
WORKDIR /opt/server
COPY . .
RUN yarn
CMD ["yarn", "prod"]

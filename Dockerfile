FROM node:lts AS builder
WORKDIR /home/app
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn
COPY .prettierrc .prettierrc
COPY src src
CMD ["yarn", "start:dev"]

FROM builder AS final
WORKDIR /home/app
# RUN yarn build
CMD ["yarn", "start:prod"]

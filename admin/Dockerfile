FROM node:18-alpine as build

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1

WORKDIR /opt/

COPY ./package.json ./yarn.lock ./

ENV PATH /opt/node_modules/.bin:$PATH

RUN yarn config set network-timeout 600000 -g && yarn install --frozen-lockfile && yarn cache clean

WORKDIR /opt/app

COPY ./ .

RUN yarn build

# Application image
FROM node:18-alpine

RUN apk add --no-cache vips-dev postgresql-client

WORKDIR /opt/app

COPY --from=build /opt/package.json /opt/yarn.lock ./

ENV PATH /opt/app/node_modules/.bin:$PATH

RUN yarn install --production --frozen-lockfile && yarn cache clean

COPY --from=build /opt/app ./

EXPOSE 1337

RUN mkdir -p /opt/app/public/uploads && chown -R node:node /opt/app/public

USER node

CMD ["strapi", "start"]

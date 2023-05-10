FROM node:18-alpine as build

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY admin/package.json admin/yarn.lock admin/
RUN cd admin && yarn install --frozen-lockfile && yarn cache clean

COPY frontend/package.json frontend/yarn.lock frontend/
RUN cd frontend && yarn install --frozen-lockfile && yarn cache clean

COPY admin admin
RUN cd admin && yarn generate-types

COPY frontend frontend
RUN cd frontend && yarn build

FROM node:18-alpine

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY --from=build /app/frontend/.next .next
COPY --from=build /app/frontend/public ./public

USER node

CMD ["./node_modules/.bin/next", "start"]
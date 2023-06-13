FROM node:18-alpine as build

ARG NEXT_PUBLIC_ADMIN_API_URL
ENV NEXT_PUBLIC_ADMIN_API_URL=$NEXT_PUBLIC_ADMIN_API_URL

ARG NEXT_PUBLIC_YM_ID
ENV NEXT_PUBLIC_YM_ID=$NEXT_PUBLIC_YM_ID

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY admin/package.json admin/yarn.lock admin/
RUN cd admin && yarn install --frozen-lockfile && yarn cache clean

COPY frontend/package.json frontend/yarn.lock frontend/
RUN cd frontend && yarn install --frozen-lockfile && yarn cache clean

COPY admin admin

COPY frontend frontend
RUN cd frontend && yarn build

FROM node:18-alpine

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_ADMIN_API_URL
ENV NEXT_PUBLIC_ADMIN_API_URL=$NEXT_PUBLIC_ADMIN_API_URL

COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY --from=build /app/frontend/.next .next
COPY --from=build /app/frontend/public ./public
COPY --from=build /app/frontend/next.config.js ./

USER node

CMD ["./node_modules/.bin/next", "start"]
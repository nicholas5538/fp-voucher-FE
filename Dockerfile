FROM node:current-alpine3.18 AS base
LABEL authors="nicholas5538"
LABEL version="1.0"

COPY . /app
WORKDIR /app

# Install pnpm
RUN yarn global add pnpm

# Install dependencies
FROM base AS dev-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile

FROM base as prod-deps
RUN npm pkg delete scripts.prepare
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --prod --frozen-lockfile

FROM base as build
COPY --from=prod-deps ./app/node_modules ./node_modules
ENV NODE_ENV "production"
RUN pnpm run build

FROM base AS dev
COPY --from=dev-deps ./app/node_modules ./node_modules

EXPOSE 5173
ENV HOST "0.0.0.0"
ENV PORT 5173

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]

FROM nginx:stable-alpine-slim
COPY --from=build ./app/dist /usr/share/nginx/html
COPY --from=build ./app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
FROM node:20-slim AS base
RUN apt-get update -y && apt-get install -y openssl
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base as backend
COPY ./packages/backend /app
WORKDIR /app
RUN pnpm install --frozen-lockfile
EXPOSE 3000
CMD ["pnpm", "prod"]

FROM base as frontend-build
COPY ./packages/frontend /app
WORKDIR /app
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx as frontend
COPY --from=frontend-build /app/dist /usr/share/nginx/html/

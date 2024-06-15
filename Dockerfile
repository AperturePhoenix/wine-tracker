FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build 
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile
RUN pnpm deploy --filter=wine-tracker-server /prod/backend

FROM base as backend 
COPY --from=build /prod/backend /app
WORKDIR /app
EXPOSE 3000
CMD [ "pnpm", "start" ]
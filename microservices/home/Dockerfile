FROM oven/bun:alpine AS base
WORKDIR /home

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM base AS predevelopment
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=development
RUN bun run build

FROM base AS development
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=predevelopment /home/package.json .

USER bun
EXPOSE 8081/tcp

# Desenvolver apenas no MF
# ENTRYPOINT [ "bun", "run", "dev" ]

# Rodar o MF para o container
ENTRYPOINT [ "bun", "run", "preview" ]
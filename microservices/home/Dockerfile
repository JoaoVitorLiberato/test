# Development stage
FROM oven/bun:alpine
WORKDIR /app

COPY bun.lock package.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.json ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build -- --base=/mf-home/

EXPOSE 8081
CMD ["bun", "run", "preview", "--host", "0.0.0.0", "--port", "8081"]
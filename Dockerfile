# Development stage
FROM oven/bun:alpine
WORKDIR /app

COPY bun.lock package.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.json ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

EXPOSE 9000
CMD ["bun", "dev", "dev", "--host", "0.0.0.0"]
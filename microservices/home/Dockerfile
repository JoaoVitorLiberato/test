# Development stage
FROM oven/bun:alpine
WORKDIR /app

COPY bun.lock package.json ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

EXPOSE 8081
CMD ["bun", "dev", "preview", "--host", "0.0.0.0"]
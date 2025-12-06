FROM oven/bun:alpine AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bunx --bun vite build --base=/core/


FROM alpine:3.18 AS export-dist
WORKDIR /dist
COPY --from=builder /app/dist ./

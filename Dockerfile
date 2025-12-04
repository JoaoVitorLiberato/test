# Dockerfile (na raiz do projeto — VERSÃO FINAL)
FROM oven/bun:alpine AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .

# Força o build com bunx (funciona 100%)
RUN bunx --bun vite build --base=/

FROM nginx:1.28.0-alpine-slim

# Remove tudo que vem por padrão
RUN rm -rf /etc/nginx/conf.d/*

# Seu config perfeito
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Só copia o shell (mf-home vem do volume!)
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
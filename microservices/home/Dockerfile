# # Development stage
# FROM oven/bun:alpine AS builder
# WORKDIR /app

# COPY bun.lock package.json ./
# COPY tsconfig.json ./
# COPY tsconfig.app.json ./
# COPY tsconfig.node.json ./

# RUN bun install --frozen-lockfile

# COPY . .

# RUN bun run build -- --base=/mf-home/

# COPY --from=builder /app/dist /usr/share/nginx/html/mf-home.

# EXPOSE 8081
# CMD ["bun", "run", "preview", "--host", "0.0.0.0", "--port", "8081"]

FROM oven/bun:alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build -- --base=/mf-home/

# Final stage = só os arquivos estáticos (não roda nada)
FROM alpine
WORKDIR /dist
COPY --from=builder /app/dist .
# Não tem CMD nem EXPOSE → esse container nunca vai "rodar"
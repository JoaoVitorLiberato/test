# Development stage
# FROM oven/bun:alpine AS builder
# WORKDIR /app

# COPY bun.lock package.json ./
# COPY tsconfig.json ./
# COPY tsconfig.app.json ./
# COPY tsconfig.node.json ./

# RUN bun install --frozen-lockfile
# COPY . .

# RUN bun run build

# FROM nginx:1.28.0-alpine-slim
# RUN rm -rf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d

# # EXPOSE 9000
# # CMD ["bun", "run", "preview", "--host", "0.0.0.0", "--port", "9000"]

# EXPOSE 80 

# # Comando padrão para rodar o Nginx em foreground (necessário para o Docker)
# CMD ["nginx", "-g", "daemon off;"]

FROM oven/bun:alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build -- --base=/

FROM nginx:1.28.0-alpine-slim
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

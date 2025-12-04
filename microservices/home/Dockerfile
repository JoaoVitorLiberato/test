FROM oven/bun:alpine
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bunx --bun vite build --base=/mf-home/
CMD ["echo", "mf-home built!"]
FROM oven/bun:alpine

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bunx --bun vite build --base=/core/
RUN rm -rf /tmp/dist && mv dist /tmp/dist

CMD ["sh", "-c", "rm -rf /app/dist/* && cp -R /tmp/dist/. /app/dist"]
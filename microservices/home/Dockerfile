FROM oven/bun:alpine
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# Build artifacts and stash them in /tmp/dist (outside the later bind mount)
RUN bunx --bun vite build --base=/mf-home/ \
  && rm -rf /tmp/dist \
  && mv dist /tmp/dist

# When the container runs (with /app/dist mounted as a named volume), copy the prebuilt files into it
CMD ["sh", "-c", "rm -rf /app/dist/* && cp -R /tmp/dist/. /app/dist && echo 'mf-home assets copied to volume'"]
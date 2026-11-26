FROM node:24-slim AS builder
WORKDIR /build
RUN apt-get update && apt-get install -y --no-install-recommends \
    git python3 build-essential \
    && rm -rf /var/lib/apt/lists/*
COPY upstream/server/ .
RUN npm ci --production

FROM node:24-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    firefox-esr pngcrush ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /build .
COPY docker/entrypoint.sh /entrypoint.sh
COPY docker/updater-loop.sh /app/updater-loop.sh
RUN chmod +x /entrypoint.sh /app/updater-loop.sh
EXPOSE 3030
ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "start"]

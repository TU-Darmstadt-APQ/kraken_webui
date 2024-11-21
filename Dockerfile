FROM node:18-alpine AS base

FROM node:18-alpine AS deps
# Set the working directory
WORKDIR /app

COPY kraken-webui-app/package.json kraken-webui-app/package-lock.json* ./

RUN apk --no-cache upgrade \
  && npm ci


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY kraken-webui-app/ .

RUN apk --no-cache upgrade \
  && npm run build

FROM base AS runner

ARG WORKER_USER_ID=5556

# Create a non-root user
RUN addgroup -g ${WORKER_USER_ID} worker && \
    adduser -D -u ${WORKER_USER_ID} -G worker worker

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./

EXPOSE 3000

USER worker

CMD ["node", "index.js"]

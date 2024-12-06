FROM node:22.12-alpine3.20 AS base


FROM base AS deps
WORKDIR /app

COPY kraken-webui-app/package.json kraken-webui-app/package-lock.json* ./

RUN apk --no-cache upgrade \
  && npm ci


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY kraken-webui-app/ .

# Disable Next telemetry, see https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk --no-cache upgrade \
  && npm run build


FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable Next telemetry, see https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

ARG WORKER_USER_ID=1001

# Create a non-root user
RUN apk --no-cache upgrade \
  && addgroup -g ${WORKER_USER_ID} nodejs \
  && adduser -D -u ${WORKER_USER_ID} -G nodejs worker

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=worker:nodejs /app/.next/standalone ./
COPY --from=builder --chown=worker:nodejs /app/.next/static ./.next/static

EXPOSE 3000

USER worker

CMD ["node", "server.js"]

FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

COPY kraken-webui-app/ /app

RUN apk --no-cache upgrade \
  && npm ci
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

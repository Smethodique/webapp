# ---------- build stage ----------
FROM node:22-alpine AS build
RUN (corepack enable && corepack prepare pnpm@10.24.0 --activate) \
    || npm install -g pnpm@10.24.0 --no-audit --no-fund
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile \
    || (sleep 5 && pnpm install --frozen-lockfile)
COPY . .
RUN pnpm build

# ---------- runtime stage ----------
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
COPY --from=build /app/node_modules ./node_modules
COPY server ./server
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["node", "server/index.js"]
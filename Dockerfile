# ---------- build stage ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund --no-progress \
    || npm install --no-audit --no-fund --no-progress \
    || (sleep 5 && npm ci --no-audit --no-fund --no-progress)
COPY . .
RUN npm run build

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
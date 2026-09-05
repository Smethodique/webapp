# ---------- build stage ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g npm@10.9.2 --no-audit --no-fund && \
    (npm ci --no-audit --no-fund --fetch-retries=5 \
      --fetch-retry-mintimeout=1000 --fetch-retry-maxtimeout=60000 || \
     npm ci --no-audit --no-fund)
COPY . .
ENV NODE_ENV=production
RUN npm run build

# ---------- runtime stage ----------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
COPY package.json package-lock.json ./
RUN npm install -g npm@10.9.2 --no-audit --no-fund && \
    (npm ci --omit=dev --no-audit --no-fund --fetch-retries=5 \
      --fetch-retry-mintimeout=1000 --fetch-retry-maxtimeout=60000 || \
     npm ci --omit=dev --no-audit --no-fund)
COPY server ./server
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["node", "server/index.js"]

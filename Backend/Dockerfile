# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# copy dependencies
COPY package*.json ./
RUN npm install

# copy source
COPY . .

# build TypeScript
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

# only copy built files + production deps
COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]

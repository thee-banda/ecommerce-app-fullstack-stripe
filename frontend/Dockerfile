# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Nginx Runner
FROM nginx:alpine

# copy build output ไปยัง nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# custom nginx config (optional ถ้าใช้ react-router-dom)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
